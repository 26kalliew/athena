import { Skeleton } from '@/components/ui/skeleton'

export default function NoteLoading() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <Skeleton className="mb-6 h-4 w-16" />
      <Skeleton className="mb-6 h-8 w-2/3" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="mt-10 border-t border-zinc-100 pt-8 dark:border-zinc-800">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-800">
        <Skeleton className="mb-3 h-3 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
    </main>
  )
}
