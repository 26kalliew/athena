'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { createNote } from '@/app/notes/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function NewNotePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      const note = await createNote({ title: title.trim(), body: body.trim() })
      router.push(`/notes/${note.id}`)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to save note')
      setSaving(false)
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <Link href="/notes" className="text-sm text-zinc-400 hover:text-foreground">
          ← Notes
        </Link>
      </div>

      <h1 className="mb-6 text-2xl font-semibold">New note</h1>

      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={saving}
          maxLength={200}
        />
        <div>
          <Textarea
            placeholder="Paste your notes here…"
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={16}
            disabled={saving}
            maxLength={20000}
          />
          <p className="mt-1 text-right text-xs text-zinc-400">
            {body.length.toLocaleString()} / 20,000
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={!title.trim() || saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </div>
      </div>
    </main>
  )
}
