'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getNotes, type Note } from '@/lib/storage'

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setNotes(getNotes())
    setLoaded(true)
  }, [])

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <Link
          href="/notes/new"
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-80"
        >
          New note
        </Link>
      </div>

      {loaded && notes.length === 0 && (
        <p className="text-sm text-zinc-400">No notes yet.</p>
      )}

      <ul className="space-y-3">
        {notes.map(note => (
          <li key={note.id}>
            <Link
              href={`/notes/${note.id}`}
              className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <p className="font-medium text-foreground">{note.title}</p>
              <p className="mt-1 text-xs text-zinc-400">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
