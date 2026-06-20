'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
  const [open, setOpen] = useState(false)

  async function generate() {
    setGenerating(true)
    setOpen(false)
    try {
      await generateFlashcards(noteId, mode)
      router.push(`/notes/${noteId}/practice`)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to generate flashcards')
      setGenerating(false)
    }
  }

  if (hasCards) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild>
          <Link href={`/notes/${noteId}/practice`}>Practice →</Link>
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" disabled={generating}>
              {generating ? 'Regenerating…' : 'Regenerate'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Regenerate flashcards?</DialogTitle>
              <DialogDescription>
                This will delete your existing flashcards and generate a new set. Choose a mode:
              </DialogDescription>
            </DialogHeader>
            <select
              value={mode}
              onChange={e => setMode(e.target.value as FlashcardMode)}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-600"
            >
              {MODES.map(m => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={generate}>Regenerate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
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
      <Button onClick={generate} disabled={generating}>
        {generating ? 'Generating…' : 'Generate flashcards'}
      </Button>
    </div>
  )
}
