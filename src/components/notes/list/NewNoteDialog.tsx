'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import type { NoteRecord } from '@/types/NoteRecordType'

interface NewNoteDialogProps {
  onCreate: (note: NoteRecord) => Promise<void>
}

const today = () => new Date().toISOString().split('T')[0]

export function NewNoteDialog({ onCreate }: NewNoteDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [topic, setTopic] = useState('')
  const [slug, setSlug] = useState('')

  async function handleCreate() {
    await onCreate({
      slug, title, subject, topic, content: '',
      tags: [], status: 'learning', difficulty: 'medium', date: today(),
    })
    setOpen(false)
    setTitle(''); setSubject(''); setTopic(''); setSlug('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button>New note</Button></DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>
          <DialogDescription>Draft a new local note without touching markdown files.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
          <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" />
          <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Topic" />
          <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug" />
        </div>
        <DialogFooter>
          <Button
            onClick={() => void handleCreate()}
            disabled={!title || !subject || !topic || !slug}
          >
            Create note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
