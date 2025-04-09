"use client"

import { useState } from "react"
import QuestionBox from "../QuestionBox/QuestionBox"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface QuestionTableProps {
  cardData: Array<{
    _id: string
    content: string
    tags: string[]
    name: string
    postedAt: string
    likes: string[]
    dislikes: string[]
  }>
}

export default function QuestionTable({ cardData }: QuestionTableProps) {
  // const { data: session } = useSession()
  // const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredQuestions = cardData.filter((question) =>
    question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6 text-black">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search questions..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Questions List */}
      <div className="space-y-4 text-black">
        {filteredQuestions.map((question) => (
          <QuestionBox key={question._id} card={question} />
        ))}
      </div>

      {/* No Results Message */}
      {filteredQuestions.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No questions found matching your search.</p>
        </div>
      )}
    </div>
  )
} 