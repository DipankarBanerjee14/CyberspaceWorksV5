"use client"

import { createContext, useContext, useState, useMemo } from "react"

const ChatUnreadContext = createContext({ totalUnread: 0, setTotalUnread: (/** @type {number} */ _n) => {} })

export function ChatUnreadProvider({ children }) {
  const [totalUnread, setTotalUnread] = useState(0)

  const value = useMemo(function () { return { totalUnread, setTotalUnread } }, [totalUnread])

  return (
    <ChatUnreadContext.Provider value={value}>
      {children}
    </ChatUnreadContext.Provider>
  )
}

export function useChatUnread() {
  return useContext(ChatUnreadContext)
}
