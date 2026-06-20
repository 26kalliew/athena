'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { generateFlashcards, type FlashcardMode } from '@/app/ai/actions'

const MODES: { value: FlashcardMode; label: string }[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'eli5', label: 'ELI5' },
  { value: 'exam', label: 'Exam prep' },
  { value: 'code', label: 'Code-heavy' },
]

export default function GenerateButton({
  noteId,
  hasCards,
}: {
  noteId: string
  hasCards: boolean
}) {
  const router = useRouter()
  const [mode, setMode] = useState<FlashcardMode>('standard')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    setError(null)
    try {
      await generateFlashcards(noteId, mode)
      router.push(`/notes/${noteId}/practice`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate flashcards')
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-3">
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-400">
          {error}
        </p>
      )}
      <div className="flex items-center gap-2">
        <select
          value={mode}
          onChange={e => setMode(e.target.value as FlashcardMode)}
          disabled={generating}
          className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-600"
        >
          {MODES.map(m => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <button
          onClick={generate}
          disabled={generating}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-80 disabled:opacity-40"
        >
          {generating ? 'Generating…' : 'Generate flashcards'}
        </button>
      </div>
    </div>
  )
}
