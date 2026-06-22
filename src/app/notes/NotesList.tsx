import Link from 'next/link'
import { listNotes } from './actions'

export default async function NotesList() {
  const notes = await listNotes()

  if (notes.length === 0) {
    return <p className="text-sm text-zinc-400">No notes yet.</p>
  }

  return (
    <ul className="space-y-3">
      {notes.map(note => (
        <li key={note.id}>
          <Link
            href={`/notes/${note.id}`}
            className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <p className="truncate font-medium text-foreground">{note.title}</p>
            <p className="mt-1 text-xs text-zinc-400">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
