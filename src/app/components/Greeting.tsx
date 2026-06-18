'use client'

import { useEffect, useState } from 'react'

function getGreeting(hours: number): string {
  if (hours < 12) return 'Good morning'
  if (hours < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Greeting() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()))
  }, [])

  if (!greeting) return null

  return (
    <h1 className="text-3xl font-semibold tracking-tight text-foreground">
      {greeting}, Kallie.
    </h1>
  )
}
