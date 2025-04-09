"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import BookmarkButton from "@/app/profile/components/BookmarkButton"
import QuestionBoxFooter from "./QuestionBoxFooter/QuestionBoxFooter"
import parse from 'html-react-parser'

interface QuestionBoxProps {
  card: {
    _id: string
    content: string
    tags: string[]
    name: string
    postedAt: string
    likes: string[]
    dislikes: string[]
  }
}

export default function QuestionBox({ card }: QuestionBoxProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleClick = () => {
    if (session) {
      router.push(`/single-qus/${card._id}`)
    } else {
      router.push("/login")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div
            className="prose max-w-none cursor-pointer"
            onClick={handleClick}
          >
            {parse(card.content)}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <BookmarkButton postId={card._id} type="question" />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <span>{card.name}</span>
          <span>•</span>
          <span>{new Date(card.postedAt).toLocaleDateString()}</span>
        </div>
        <QuestionBoxFooter card={card} />
      </div>
    </div>
  )
} 