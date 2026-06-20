import { notFound } from 'next/navigation'
import NotesLoading from '@/app/notes/loading'

// Dev-only fixture — renders the notes loading skeleton for Playwright assertions.
// Returns 404 in production so it is never user-reachable.
export default function NotesLoadingFixture() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <NotesLoading />
}
