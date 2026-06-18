export interface Note {
  id: string
  title: string
  body: string
  createdAt: string
}

export interface Flashcard {
  id: string
  noteId: string
  front: string
  back: string
}

const NOTES_KEY = 'athena-notes'

function flashcardsKey(noteId: string) {
  return `athena-flashcards-${noteId}`
}

export function getNotes(): Note[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(NOTES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function getNote(id: string): Note | null {
  return getNotes().find(n => n.id === id) ?? null
}

export function saveNote(note: Note): void {
  const notes = getNotes().filter(n => n.id !== note.id)
  localStorage.setItem(NOTES_KEY, JSON.stringify([note, ...notes]))
}

export function deleteNote(id: string): void {
  localStorage.setItem(NOTES_KEY, JSON.stringify(getNotes().filter(n => n.id !== id)))
}

export function getFlashcards(noteId: string): Flashcard[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(flashcardsKey(noteId))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveFlashcards(noteId: string, cards: Flashcard[]): void {
  localStorage.setItem(flashcardsKey(noteId), JSON.stringify(cards))
}
