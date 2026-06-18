'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { saveNote } from '@/lib/storage'

export default function NewNotePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  function handleSave() {
    const note = {
      id: crypto.randomUUID(),
      title: title.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveNote(note)
    router.push(`/notes/${note.id}`)
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <Link href="/notes" className="text-sm text-zinc-400 hover:text-foreground">
          ← Notes
        </Link>
      </div>

      <h1 className="mb-6 text-2xl font-semibold">New note</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-600"
        />
        <textarea
          placeholder="Paste your notes here…"
          value={body}
          onChange={e => setBody(e.target.value)}
          rows={16}
          className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-600"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-80 disabled:opacity-40"
          >
            Save
          </button>
        </div>
      </div>
    </main>
  )
}
