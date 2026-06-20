import { notFound } from 'next/navigation'

// Dev-only fixture — throws to exercise the global error boundary.
export default function ErrorBoundaryFixture() {
  if (process.env.NODE_ENV === 'production') notFound()
  throw new Error('Test error from fixture')
}
