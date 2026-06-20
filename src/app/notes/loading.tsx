import { Skeleton } from '@/components/ui/skeleton'

export default function NotesLoading() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
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
    </main>
  )
}
