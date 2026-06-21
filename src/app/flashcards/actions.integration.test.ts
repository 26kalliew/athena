import { describe, it, expect, afterEach } from 'vitest'
import { createNote, deleteNote } from '@/app/notes/actions'
import { createFlashcards, listForNote } from '@/app/flashcards/actions'

const CARDS = [
  { front: 'What is a closure?', back: 'A function that captures its surrounding scope.' },
]

const THREE_CARDS = [
  { front: 'Q1', back: 'A1' },
  { front: 'Q2', back: 'A2' },
  { front: 'Q3', back: 'A3' },
]

describe('createFlashcards', () => {
  let createdNoteId: string | undefined

  afterEach(async () => {
    if (createdNoteId) {
      await deleteNote(createdNoteId)
      createdNoteId = undefined
    }
  })

  it('returns a row with the correct shape and values', async () => {
    const note = await createNote({ title: 'Shape test', body: 'body' })
    createdNoteId = note.id

    const [card] = await createFlashcards(note.id, CARDS)

    expect(card.id).toBeTypeOf('string')
    expect(card.noteId).toBe(note.id)
    expect(card.front).toBe(CARDS[0].front)
    expect(card.back).toBe(CARDS[0].back)
    expect(card.createdAt).toBeInstanceOf(Date)
  })

  it('inserts multiple cards in one call, all with the same noteId', async () => {
    const note = await createNote({ title: 'Multi-card test', body: 'body' })
    createdNoteId = note.id

    const cards = await createFlashcards(note.id, THREE_CARDS)

    expect(cards).toHaveLength(3)
    for (const card of cards) {
      expect(card.noteId).toBe(note.id)
    }
  })

  it('listForNote round-trips the rows written by createFlashcards', async () => {
    const note = await createNote({ title: 'Round-trip test', body: 'body' })
    createdNoteId = note.id

    const created = await createFlashcards(note.id, CARDS)
    const listed = await listForNote(note.id)

    const createdIds = created.map(c => c.id).sort()
    const listedIds = listed.map(c => c.id).sort()
    expect(listedIds).toEqual(createdIds)
  })

  it('throws a FK violation when noteId does not exist', async () => {
    const fakeNoteId = '00000000-0000-0000-0000-000000000000'
    await expect(createFlashcards(fakeNoteId, CARDS)).rejects.toThrow()
  })
})
