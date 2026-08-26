"use client"

import { ChatUnreadProvider } from "@/context/ChatUnreadContext"

export function DashboardProviders({ children }) {
  return <ChatUnreadProvider>{children}</ChatUnreadProvider>
}
