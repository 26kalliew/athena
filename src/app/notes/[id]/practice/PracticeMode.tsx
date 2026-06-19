'use client'

import { useState } from 'react'
import Link from 'next/link'
import { recordReview } from '@/app/flashcards/actions'
import type { Flashcard } from '@/app/flashcards/actions'

export default function PracticeMode({
  cards,
  noteId,
}: {
  cards: Flashcard[]
  noteId: string
}) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [results, setResults] = useState<('got' | 'missed')[]>([])

  if (cards.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12">
        <p className="mb-4 text-sm text-zinc-400">No flashcards found.</p>
        <Link href={`/notes/${noteId}`} className="text-sm underline">
          ← Back to note
        </Link>
      </main>
    )
  }

  if (index >= cards.length) {
    const got = results.filter(r => r === 'got').length
    return (
      <main className="mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="mb-3 text-2xl font-semibold">Done!</h1>
        <p className="mb-8 text-zinc-500">
          {got} / {cards.length} correct
        </p>
        <Link
          href={`/notes/${noteId}`}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-80"
        >
          Back to note
        </Link>
      </main>
    )
  }

  const card = cards[index]

  function mark(rating: 'got' | 'missed') {
    recordReview(card.id, rating) // fire-and-forget
    setResults(prev => [...prev, rating])
    setFlipped(false)
    setIndex(prev => prev + 1)
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <Link href={`/notes/${noteId}`} className="text-sm text-zinc-400 hover:text-foreground">
          ← Note
        </Link>
        <span className="text-sm text-zinc-400">{index + 1} / {cards.length}</span>
      </div>

      <div
        onClick={() => !flipped && setFlipped(true)}
        className="flex min-h-48 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900"
      >
        <p className="text-lg">{flipped ? card.back : card.front}</p>
      </div>

      {!flipped && (
        <p className="mt-4 text-center text-sm text-zinc-400">Click card to reveal answer</p>
      )}

      {flipped && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => mark('missed')}
            className="rounded-lg border border-zinc-200 px-6 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Missed
          </button>
          <button
            onClick={() => mark('got')}
            className="rounded-lg bg-foreground px-6 py-2 text-sm font-medium text-background hover:opacity-80"
          >
            Got it
          </button>
        </div>
      )}
    </main>
  )
}
