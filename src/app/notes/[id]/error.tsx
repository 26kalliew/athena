'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NoteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(JSON.stringify({
      level: 'error',
      message: error.message,
      context: { route: '/notes/[id]', stack: error.stack, digest: error.digest },
      timestamp: new Date().toISOString(),
    }))
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-2 text-2xl font-semibold">Something went wrong</h1>
      <p className="mb-8 text-sm text-zinc-500">
        This note couldn&apos;t be loaded. Try again or return to your notes.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/notes">Back to notes</Link>
        </Button>
      </div>
    </main>
  )
}
