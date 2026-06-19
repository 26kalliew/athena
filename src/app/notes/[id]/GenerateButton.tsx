'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createFlashcards } from '@/app/flashcards/actions'

const HARDCODED_CARDS = [
  {
    front: 'What is the main topic of this note?',
    back: 'Review your note and summarize the core subject in one sentence.',
  },
  {
    front: 'What is the single most important concept here?',
    back: 'Pick out the one idea you would most want to remember a week from now.',
  },
  {
    front: 'What real-world question does this material answer?',
    back: 'Think about the problem or curiosity that originally motivated this topic.',
  },
]

export default function GenerateButton({
  noteId,
  hasCards,
}: {
  noteId: string
  hasCards: boolean
}) {
  const router = useRouter()
  const [generating, setGenerating] = useState(false)

  if (hasCards) {
    return (
      <Link
        href={`/notes/${noteId}/practice`}
        className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-80"
      >
        Practice →
      </Link>
    )
  }

  async function generate() {
    setGenerating(true)
    await createFlashcards(noteId, HARDCODED_CARDS)
    router.push(`/notes/${noteId}/practice`)
  }

  return (
    <button
      onClick={generate}
      disabled={generating}
      className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-80 disabled:opacity-40"
    >
      {generating ? 'Generating…' : 'Generate flashcards'}
    </button>
  )
}
