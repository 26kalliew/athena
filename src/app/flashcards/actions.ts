'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { flashcards, reviews } from '@/db/schema'

export type Flashcard = typeof flashcards.$inferSelect

export async function createFlashcards(
  noteId: string,
  cards: { front: string; back: string }[]
): Promise<Flashcard[]> {
  return db
    .insert(flashcards)
    .values(cards.map(c => ({ ...c, noteId })))
    .returning()
}

export async function listForNote(noteId: string): Promise<Flashcard[]> {
  return db.select().from(flashcards).where(eq(flashcards.noteId, noteId))
}

export async function recordReview(
  flashcardId: string,
  rating: 'got' | 'missed'
): Promise<void> {
  await db.insert(reviews).values({ flashcardId, rating })
}
