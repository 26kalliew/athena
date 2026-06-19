'use server'

import { eq, desc } from 'drizzle-orm'
import { db } from '@/db'
import { notes } from '@/db/schema'

export type Note = typeof notes.$inferSelect

export async function listNotes(): Promise<Note[]> {
  return db.select().from(notes).orderBy(desc(notes.createdAt))
}

export async function getNote(id: string): Promise<Note | null> {
  const rows = await db.select().from(notes).where(eq(notes.id, id))
  return rows[0] ?? null
}

export async function createNote(data: { title: string; body: string }): Promise<Note> {
  const rows = await db.insert(notes).values(data).returning()
  return rows[0]
}

export async function deleteNote(id: string): Promise<void> {
  await db.delete(notes).where(eq(notes.id, id))
}
