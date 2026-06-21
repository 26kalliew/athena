import { notFound, redirect } from 'next/navigation'
import { createNote } from '@/app/notes/actions'
import { createFlashcards } from '@/app/flashcards/actions'

// Dev-only fixture — seeds a note with two flashcards and redirects to practice.
export default async function PracticeSessionFixture() {
  if (process.env.NODE_ENV === 'production') notFound()

  const note = await createNote({
    title: 'E2E Practice Fixture',
    body: 'Fixture note for Playwright practice-session spec.',
  })

  await createFlashcards(note.id, [
    { front: 'What is JSX?', back: 'JavaScript XML syntax extension.' },
    { front: 'What is a hook?', back: 'A function that uses React state.' },
  ])

  redirect(`/notes/${note.id}/practice`)
}
