'use client'

import { useEffect, useState } from 'react'

interface Item {
  id: string
  text: string
  done: boolean
}

const STORAGE_KEY = 'dashboard-todos'

export default function TodoList() {
  const [items, setItems] = useState<Item[]>([])
  const [input, setInput] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, loaded])

  function add() {
    const text = input.trim()
    if (!text) return
    setItems(prev => [...prev, { id: crypto.randomUUID(), text, done: false }])
    setInput('')
  }

  function toggle(id: string) {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, done: !item.done } : item))
    )
  }

  function remove(id: string) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const sorted = [...items].sort((a, b) => Number(a.done) - Number(b.done))

  return (
    <section className="w-full">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        Things to remember
      </h2>

      <form
        onSubmit={e => { e.preventDefault(); add() }}
        className="mb-4 flex gap-2"
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add something…"
          className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-600"
        />
        <button
          type="submit"
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-40"
          disabled={!input.trim()}
        >
          Add
        </button>
      </form>

      {loaded && sorted.length === 0 && (
        <p className="text-sm text-zinc-400 dark:text-zinc-500">Nothing here yet.</p>
      )}

      <ul className="space-y-2">
        {sorted.map(item => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-lg border border-zinc-100 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => toggle(item.id)}
              className="h-4 w-4 cursor-pointer accent-zinc-700 dark:accent-zinc-300"
            />
            <span
              className={`flex-1 text-sm ${item.done ? 'text-zinc-400 line-through dark:text-zinc-600' : 'text-foreground'}`}
            >
              {item.text}
            </span>
            <button
              onClick={() => remove(item.id)}
              aria-label="Delete"
              className="text-zinc-300 transition-colors hover:text-zinc-600 dark:text-zinc-700 dark:hover:text-zinc-400"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
