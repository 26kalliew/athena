'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'

export default function ChatPanel({
  noteId,
  initialMessages,
}: {
  noteId: string
  initialMessages: UIMessage[]
}) {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const transport = useMemo(
    () => new DefaultChatTransport({ api: '/api/chat', body: { noteId } }),
    [noteId],
  )

  const { messages, sendMessage, stop, status } = useChat({
    transport,
    messages: initialMessages,
  })

  const isActive = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || isActive) return
    sendMessage({ text })
    setInput('')
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Ask Athena</h2>

      <div className="flex max-h-80 flex-col gap-2 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-sm text-zinc-400">Ask anything about this note.</p>
        )}
        {messages.map(m => {
          const text = m.parts
            .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
            .map(p => p.text)
            .join('')
          if (!text) return null
          return (
            <div
              key={m.id}
              className={
                m.role === 'user'
                  ? 'self-end rounded-lg bg-foreground px-3 py-2 text-sm text-background'
                  : 'self-start rounded-lg bg-zinc-100 px-3 py-2 text-sm dark:bg-zinc-800'
              }
              style={{ maxWidth: '80%' }}
            >
              {text}
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about this note…"
          disabled={isActive}
          className="flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-600"
        />
        {isActive ? (
          <button
            type="button"
            onClick={stop}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-80 disabled:opacity-40"
          >
            Send
          </button>
        )}
      </form>
    </div>
  )
}
