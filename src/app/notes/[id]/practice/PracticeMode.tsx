'use client'

import { useState } from 'react'
import Link from 'next/link'
import { recordReview } from '@/app/flashcards/actions'
import type { Flashcard } from '@/app/flashcards/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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
        <Button asChild>
          <Link href={`/notes/${noteId}`}>Back to note</Link>
        </Button>
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

      <Card
        onClick={() => !flipped && setFlipped(true)}
        className="min-h-48 cursor-pointer justify-center"
      >
        <CardContent className="text-center">
          <p className="text-lg">{flipped ? card.back : card.front}</p>
        </CardContent>
      </Card>

      {!flipped && (
        <p className="mt-4 text-center text-sm text-zinc-400">Click card to reveal answer</p>
      )}

      {flipped && (
        <div className="mt-6 flex justify-center gap-4">
          <Button variant="outline" onClick={() => mark('missed')}>
            Missed
          </Button>
          <Button onClick={() => mark('got')}>
            Got it
          </Button>
        </div>
      )}
    </main>
  )
}
