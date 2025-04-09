"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"
import { Session } from "next-auth"

interface QuestionBoxFooterProps {
  card: {
    _id: string
    likes: string[]
    dislikes: string[]
  }
}

interface ExtendedSession extends Session {
  user?: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function QuestionBoxFooter({ card }: QuestionBoxFooterProps) {
  const { data: session } = useSession() as { data: ExtendedSession | null }
  const [likes, setLikes] = useState(card.likes)
  const [dislikes, setDislikes] = useState(card.dislikes)

  const handleLike = async () => {
    if (!session?.user?.id) return

    try {
      const response = await fetch(`/api/questions/${card._id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.id }),
      })

      if (response.ok) {
        const data = await response.json()
        setLikes(data.likes)
        setDislikes(data.dislikes)
      }
    } catch (error) {
      console.error("Error liking question:", error)
    }
  }

  const handleDislike = async () => {
    if (!session?.user?.id) return

    try {
      const response = await fetch(`/api/questions/${card._id}/dislike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.id }),
      })

      if (response.ok) {
        const data = await response.json()
        setLikes(data.likes)
        setDislikes(data.dislikes)
      }
    } catch (error) {
      console.error("Error disliking question:", error)
    }
  }

  const isLiked = session?.user?.id ? likes.includes(session.user.id) : false
  const isDisliked = session?.user?.id ? dislikes.includes(session.user.id) : false

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleLike}
        className={`flex items-center space-x-1 ${
          isLiked ? "text-blue-500" : "text-gray-500"
        }`}
      >
        <FaThumbsUp />
        <span>{likes.length}</span>
      </button>
      <button
        onClick={handleDislike}
        className={`flex items-center space-x-1 ${
          isDisliked ? "text-red-500" : "text-gray-500"
        }`}
      >
        <FaThumbsDown />
        <span>{dislikes.length}</span>
      </button>
    </div>
  )
} 