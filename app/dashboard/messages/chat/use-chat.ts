"use client"

import { type ReactNode, createContext, createElement, useCallback, useContext, useMemo, useState } from "react"

export type MessageType = "text" | "image" | "file"

export interface Reaction {
  emoji: string
  count: number
}

export interface Message {
  id: string
  content: string
  timestamp: string
  senderId: string
  type: MessageType
  isEdited: boolean
  reactions: Reaction[]
  replyTo: string | null
}

export interface LastMessage {
  content: string
  timestamp: string
}

export interface Conversation {
  id: string
  name: string
  avatar: string
  type: "direct" | "group"
  participants: string[]
  isPinned: boolean
  isMuted: boolean
  unreadCount: number
  lastMessage: LastMessage
}

export interface User {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "offline"
  email: string
  lastSeen: string
  role: string
  employeeRole?: string | null
  department: string
}

interface ChatContextValue {
  selectedConversation: string | null
  setSelectedConversation: (conversationId: string | null) => void
  currentConversations: Conversation[]
  currentMessagesByConversation: Record<string, Message[]>
  currentUsers: User[]
  searchQuery: string
  setSearchQuery: (value: string) => void
  messageSearchQuery: string
  setMessageSearchQuery: (value: string) => void
  addMessage: (conversationId: string, message: Message) => void
  markConversationRead: (conversationId: string) => void
  totalUnread: number
  toggleMute: (conversationId: string) => void
  togglePin: (conversationId: string) => void
  removeConversation: (conversationId: string) => void
  ensureConversation: (userId: string) => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

interface ChatProviderProps {
  children: ReactNode
  initialConversations: Conversation[]
  initialMessages: Record<string, Message[]>
  initialUsers: User[]
  currentUserId?: string
}

export function ChatProvider({
  children,
  initialConversations,
  initialMessages,
  initialUsers,
  currentUserId,
}: ChatProviderProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    initialConversations[0]?.id ?? null
  )
  const [currentConversations, setCurrentConversations] = useState<Conversation[]>(initialConversations)
  const [currentMessagesByConversation, setCurrentMessagesByConversation] =
    useState<Record<string, Message[]>>(initialMessages)
  const [currentUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [messageSearchQuery, setMessageSearchQuery] = useState("")

  const addMessage = useCallback((conversationId: string, message: Message) => {
    setCurrentMessagesByConversation((prev) => {
      const existing = prev[conversationId] || []
      // dedup: ignore if message id already exists (prevents double from HTTP + socket echo)
      if (existing.some((m) => m.id === message.id)) return prev
      // also dedup rapid duplicate sends with same content/sender within 1.5s (double-click / double POST)
      if (existing.length > 0) {
        const last = existing[existing.length - 1]
        const sameContent = last.content === message.content && last.senderId === message.senderId
        const timeDiff = Math.abs(new Date(message.timestamp).getTime() - new Date(last.timestamp).getTime())
        if (sameContent && timeDiff < 1500) return prev
      }
      return {
        ...prev,
        [conversationId]: [...existing, message],
      }
    })

    setCurrentConversations((prev) => {
      const exists = prev.find((c) => c.id === conversationId)
      const isFromOther = message.senderId !== currentUserId
      const isSelected = conversationId === selectedConversation

      if (exists) {
        // dedup matching messages dedup above - prevents double lastMessage bump
        const timeDiff = Math.abs(new Date(exists.lastMessage.timestamp).getTime() - new Date(message.timestamp).getTime())
        if (exists.lastMessage.content === message.content && timeDiff < 1500) {
          return prev
        }
        return prev.map((conversation) => {
          if (conversation.id !== conversationId) return conversation
          return {
            ...conversation,
            lastMessage: {
              content: message.content,
              timestamp: message.timestamp,
            },
            unreadCount: isFromOther && !isSelected
              ? conversation.unreadCount + 1
              : conversation.unreadCount,
          }
        })
      }

      // Incoming message from a user who had no prior visible thread — create the thread
      // instead of silently dropping it. This is needed now that the initial list is
      // filtered to only users with history.
      const user = currentUsers.find((u) => u.id === conversationId)
      const newConversation: Conversation = {
        id: conversationId,
        name: user?.name || "Unknown User",
        avatar: user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=0D8ABC&color=fff`,
        type: "direct",
        participants: [conversationId],
        isPinned: false,
        isMuted: false,
        unreadCount: isFromOther && !isSelected ? 1 : 0,
        lastMessage: {
          content: message.content,
          timestamp: message.timestamp,
        },
      }
      return [...prev, newConversation]
    })
  }, [currentUserId, selectedConversation, currentUsers])

  const markConversationRead = useCallback((conversationId: string) => {
    setCurrentConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, unreadCount: 0 }
          : conversation
      )
    )
  }, [])

  const totalUnread = useMemo(
    () => currentConversations.reduce((sum, c) => sum + c.unreadCount, 0),
    [currentConversations]
  )

  const toggleMute = (conversationId: string) => {
    setCurrentConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, isMuted: !conversation.isMuted }
          : conversation
      )
    )
  }

  const togglePin = (conversationId: string) => {
    setCurrentConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, isPinned: !conversation.isPinned }
          : conversation
      )
    )
  }

  const removeConversation = useCallback((conversationId: string) => {
    setCurrentConversations((prev) => prev.filter((conversation) => conversation.id !== conversationId))
    setCurrentMessagesByConversation((prev) => {
      const next = { ...prev }
      delete next[conversationId]
      return next
    })

    setSelectedConversation((current) => {
      if (current !== conversationId) {
        return current
      }

      const nextConversation = currentConversations.find((conversation) => conversation.id !== conversationId)
      return nextConversation?.id ?? null
    })
  }, [currentConversations])

  const ensureConversation = useCallback((userId: string) => {
    const user = currentUsers.find((u) => u.id === userId)
    if (!user) return

    let didCreate = false
    setCurrentConversations((prev) => {
      if (prev.find((c) => c.id === userId)) return prev
      didCreate = true
      const newConversation: Conversation = {
        id: userId,
        name: user.name,
        avatar: user.avatar,
        type: "direct",
        participants: [userId],
        isPinned: false,
        isMuted: false,
        unreadCount: 0,
        lastMessage: {
          content: "",
          timestamp: new Date().toISOString(),
        },
      }
      return [...prev, newConversation]
    })

    setCurrentMessagesByConversation((prev) => {
      if (prev[userId]) return prev
      return { ...prev, [userId]: [] }
    })

    setSelectedConversation(userId)
  }, [currentUsers])

  const value = useMemo(
    () => ({
      selectedConversation,
      setSelectedConversation,
      currentConversations,
      currentMessagesByConversation,
      currentUsers,
      searchQuery,
      setSearchQuery,
      messageSearchQuery,
      setMessageSearchQuery,
      addMessage,
      markConversationRead,
      totalUnread,
      toggleMute,
      togglePin,
      removeConversation,
      ensureConversation,
    }),
    [
      selectedConversation,
      currentConversations,
      currentMessagesByConversation,
      currentUsers,
      searchQuery,
      messageSearchQuery,
      removeConversation,
      ensureConversation,
      addMessage,
      markConversationRead,
      totalUnread,
    ]
  )

  return createElement(ChatContext.Provider, { value }, children)
}

export function useChat() {
  const context = useContext(ChatContext)

  if (!context) {
    throw new Error("useChat must be used within ChatProvider")
  }

  return context
}
