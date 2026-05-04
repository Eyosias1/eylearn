"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { SubjectDialog } from "@/components/subjects/subject-dialog"
import { TopicDialog } from "@/components/topics/topic-dialog"
import { SubtopicDialog } from "@/components/subtopics/subtopic-dialog"
import { SubjectsManageTree, type ManageTarget } from "@/components/library/subjects/SubjectsManageTree"
import { deleteSubject } from "@/lib/actions/subjects"
import { deleteTopic } from "@/lib/actions/topics"
import { deleteSubtopic } from "@/lib/actions/subtopics"
import { cn } from "@/lib/utils"
import type { Subject } from "@/types/SubjectType"
import type { Topic } from "@/types/TopicType"
import type { Subtopic } from "@/types/SubtopicType"

interface Props {
  subjects:         Subject[]
  topicsBySubject:  Record<string, Topic[]>
  subtopicsByTopic: Record<string, Subtopic[]>
  onClose:          () => void
}

export function SubjectsManageView({ subjects: init, topicsBySubject: initTopics, subtopicsByTopic: initSubtopics, onClose }: Props) {
  const router = useRouter()
  const [subjects,         setSubjects]  = useState(init)
  const [topicsBySubject,  setTopics]    = useState(initTopics)
  const [subtopicsByTopic, setSubtopics] = useState(initSubtopics)
  const [expanded,  setExpanded]  = useState<Record<string, boolean>>({})
  const [pending,   setPending]   = useState<ManageTarget | null>(null)
  const [editing,   setEditing]   = useState<ManageTarget | null>(null)

  function toggle(id: string) { setExpanded((p) => ({ ...p, [id]: !p[id] })) }

  async function handleDelete() {
    if (!pending) return
    if (pending.type === "subject") {
      setSubjects((p) => p.filter((s) => s.id !== pending.item.id))
      await deleteSubject(pending.item.id)
    } else if (pending.type === "topic") {
      const t = pending.item as Topic
      setTopics((p) => ({ ...p, [t.subject_id]: (p[t.subject_id] ?? []).filter((x) => x.id !== t.id) }))
      await deleteTopic(t.id, t.subject_id)
    } else {
      const st = pending.item as Subtopic
      setSubtopics((p) => ({ ...p, [st.topic_id]: (p[st.topic_id] ?? []).filter((x) => x.id !== st.id) }))
      await deleteSubtopic(st.id)
    }
    setPending(null)
  }

  function closeEdit() { setEditing(null); router.refresh() }

  return (
    <div className={cn(
      // layout
      "flex flex-col shrink-0 overflow-hidden",
      // sizing
      "w-72 max-h-[calc(100vh-8rem)]",
      // border
      "rounded-xl border",
      // colors
      "bg-card",
      // position
      "sticky top-4",
    )}>
      <div className="flex items-center justify-between px-4 py-3 border-b shrink-0">
        <p className="text-sm font-semibold">Manage</p>
        <Button variant="ghost" size="icon-sm" onClick={onClose}><X className="size-3.5" /></Button>
      </div>

      <SubjectsManageTree subjects={subjects} topicsBySubject={topicsBySubject} subtopicsByTopic={subtopicsByTopic}
        expanded={expanded} onToggle={toggle} onEdit={setEditing} onDelete={setPending} />

      {editing?.type === "subject" && <SubjectDialog open subject={editing.item as Subject} onClose={closeEdit} />}
      {editing?.type === "topic" && <TopicDialog open subjectId={(editing.item as Topic).subject_id} topic={editing.item as Topic} onClose={closeEdit} />}
      {editing?.type === "subtopic" && <SubtopicDialog open topicId={(editing.item as Subtopic).topic_id} subtopic={editing.item as Subtopic} onClose={closeEdit} />}

      <AlertDialog open={!!pending} onOpenChange={(o) => { if (!o) setPending(null) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &ldquo;{pending?.item.name}&rdquo;?</AlertDialogTitle>
            <AlertDialogDescription>
              {pending?.type === "subject" ? "Deletes the subject and all its topics and subtopics."
                : pending?.type === "topic" ? "Deletes the topic and all its subtopics."
                : "Deletes the subtopic."}{" "}This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
