import { notFound } from 'next/navigation'
import GenerateButton from '@/app/notes/[id]/GenerateButton'

// Dev-only fixture — renders GenerateButton with hasCards=true for Playwright assertions.
export default function RegenerateButtonFixture() {
  if (process.env.NODE_ENV === 'production') notFound()
  return (
    <main className="p-8">
      <GenerateButton noteId="00000000-0000-0000-0000-000000000000" hasCards={true} />
    </main>
  )
}
