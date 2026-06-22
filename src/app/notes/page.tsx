import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import NotesList from './NotesList'

function NotesListSkeleton() {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i}>
          <div className="rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <Skeleton className="mb-2 h-4 w-3/4" />
            <Skeleton className="h-3 w-20" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function NotesPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <Button asChild>
          <Link href="/notes/new">New note</Link>
        </Button>
      </div>

      <Suspense fallback={<NotesListSkeleton />}>
        <NotesList />
      </Suspense>
    </main>
  )
}
