import { listForNote } from '@/app/flashcards/actions'
import PracticeMode from './PracticeMode'

export default async function PracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cards = await listForNote(id)

  return <PracticeMode cards={cards} noteId={id} />
}
