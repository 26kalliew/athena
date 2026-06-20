import { notFound } from 'next/navigation'
import { getNote } from '@/app/notes/actions'
import { listForNote } from '@/app/flashcards/actions'
import PracticeMode from './PracticeMode'

export default async function PracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [note, cards] = await Promise.all([getNote(id), listForNote(id)])

  if (!note) notFound()

  return <PracticeMode cards={cards} noteId={id} />
}
