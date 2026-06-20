import { pgTable, pgEnum, uuid, text, timestamp } from 'drizzle-orm/pg-core'

export const ratingEnum = pgEnum('rating', ['got', 'missed'])
export const chatRoleEnum = pgEnum('chat_role', ['user', 'assistant'])

export const notes = pgTable('notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const flashcards = pgTable('flashcards', {
  id: uuid('id').primaryKey().defaultRandom(),
  noteId: uuid('note_id').notNull().references(() => notes.id, { onDelete: 'cascade' }),
  front: text('front').notNull(),
  back: text('back').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const chatMessages = pgTable('chat_messages', {
  id:        uuid('id').primaryKey().defaultRandom(),
  noteId:    uuid('note_id').notNull().references(() => notes.id, { onDelete: 'cascade' }),
  role:      chatRoleEnum('role').notNull(),
  content:   text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  flashcardId: uuid('flashcard_id').notNull().references(() => flashcards.id, { onDelete: 'cascade' }),
  rating: ratingEnum('rating').notNull(),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }).notNull().defaultNow(),
})
