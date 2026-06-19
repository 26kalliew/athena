import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNote } from '@/app/notes/actions'
import { listForNote } from '@/app/flashcards/actions'
import GenerateButton from './GenerateButton'

export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [note, cards] = await Promise.all([getNote(id), listForNote(id)])

  if (!note) notFound()

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
        <GenerateButton noteId={id} hasCards={cards.length > 0} />
      </div>
    </main>
  )
}
