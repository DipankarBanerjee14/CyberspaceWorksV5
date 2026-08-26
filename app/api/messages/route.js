import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import Conversation from "@/lib/models/Conversation";
import Message from "@/lib/models/Message";
import { emitToUsers } from "@/lib/socket/server";
import notificationService from "@/lib/notifications/notification-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { receiverId, text } = await req.json();

  if (!receiverId || !text?.trim()) {
    return Response.json({ error: "receiverId and text are required" }, { status: 400 });
  }

  await connectToDatabase();

  const sender = await User.findById(session.user.id);
  const receiver = await User.findById(receiverId);

  if (!sender || !receiver) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  // Block role combinations that should not chat directly.
  // Client ↔ Employee is allowed only for Manager / Customer Agent (per requirement:
  // client can msg to admin, manager, customer agent)
  const isClientEmployeePair =
    (sender.role === "client" && receiver.role === "employee") ||
    (sender.role === "employee" && receiver.role === "client");

  if (isClientEmployeePair) {
    const employee = sender.role === "employee" ? sender : receiver;
    if (!["Manager", "Customer Agent"].includes(employee.employeeRole)) {
      return Response.json({ error: "Not allowed" }, { status: 403 });
    }
  } else if (
    (sender.role === "vendor" && !["admin", "vendor"].includes(receiver.role)) ||
    (receiver.role === "vendor" && !["admin", "vendor"].includes(sender.role))
  ) {
    return Response.json({ error: "Not allowed" }, { status: 403 });
  }

  let convo = await Conversation.findOne({
    participants: { $all: [sender._id, receiver._id] },
  });

  if (!convo) {
    convo = await Conversation.create({
      participants: [sender._id, receiver._id],
    });
  }

 
  const message = await Message.create({
    conversationId: convo._id,
    sender: sender._id,
    receiver: receiver._id,
    text: text.trim(),
  });

  // Single emit - lib/socket/server's emitToUsers already handles HTTP fallback
  // when no in-process io exists (serverless). Do not duplicate emit here.
  emitToUsers([receiver._id], "receive-message", message);
  await notificationService.createAndEmitNotification({
    userIds: [receiver._id],
    type: "chat",
    title: "New message",
    message: "New message",
    text: "New message",
    source: "chat",
  });

  return Response.json({ message });
}