import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import SoftwareClient, { type ISoftwareClient } from "../../../../lib/models/SoftwareClient";
import type { Model } from "mongoose";


export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const { id } = await params;
    const softwareClientModel = SoftwareClient as Model<ISoftwareClient>;

    const client =
      await softwareClientModel.findByIdAndUpdate(
        id,
        {
          name: body.name,
          email: body.email,
          password: body.password,
          phone: body.phone,
          contractStartDate:
            body.contractStartDate,
          contractEndDate:
            body.contractEndDate,
          softwareName:
            body.softwareName,
          plan: body.plan,
          tenure: body.tenure,
          source: body.source,
          description:
            body.description,
        },
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      client,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}