'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { getNote, getFlashcards, saveFlashcards, type Note, type Flashcard } from '@/lib/storage'

function makeHardcodedCards(noteId: string): Flashcard[] {
  return [
    {
      id: crypto.randomUUID(),
      noteId,
      front: 'What is the main topic of this note?',
      back: 'Review your note and summarize the core subject in one sentence.',
    },
    {
      id: crypto.randomUUID(),
      noteId,
      front: 'What is the single most important concept here?',
      back: 'Pick out the one idea you would most want to remember a week from now.',
    },
    {
      id: crypto.randomUUID(),
      noteId,
      front: 'What real-world question does this material answer?',
      back: 'Think about the problem or curiosity that originally motivated this topic.',
    },
  ]
}

export default function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [note, setNote] = useState<Note | null>(null)
  const [hasCards, setHasCards] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setNote(getNote(id))
    setHasCards(getFlashcards(id).length > 0)
    setLoaded(true)
  }, [id])

  function generateCards() {
    saveFlashcards(id, makeHardcodedCards(id))
    setHasCards(true)
  }

  if (!loaded) return null

  if (!note) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12">
        <p className="mb-4 text-sm text-zinc-400">Note not found.</p>
        <Link href="/notes" className="text-sm underline">
          ← Back to notes
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-6">
        <Link href="/notes" className="text-sm text-zinc-400 hover:text-foreground">
          ← Notes
        </Link>
      </div>

      <h1 className="mb-6 text-2xl font-semibold">{note.title}</h1>

      <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {note.body}
      </p>

      <div className="mt-10 border-t border-zinc-100 pt-8 dark:border-zinc-800">
        {hasCards ? (
          <Link
            href={`/notes/${id}/practice`}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-80"
          >
            Practice →
          </Link>
        ) : (
          <button
            onClick={generateCards}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-80"
          >
            Generate flashcards
          </button>
        )}
      </div>
    </main>
  )
}
