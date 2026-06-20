import { notFound } from 'next/navigation'
import NoteLoading from '@/app/notes/[id]/loading'

// Dev-only fixture — renders the note detail loading skeleton for Playwright assertions.
export default function NoteLoadingFixture() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <NoteLoading />
}
