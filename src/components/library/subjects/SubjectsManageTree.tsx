"use client"

import { ChevronRight, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Subject } from "@/types/SubjectType"
import type { Topic } from "@/types/TopicType"
import type { Subtopic } from "@/types/SubtopicType"

export type ManageTarget =
  | { type: "subject";  item: Subject }
  | { type: "topic";    item: Topic }
  | { type: "subtopic"; item: Subtopic }

type Props = {
  subjects:         Subject[]
  topicsBySubject:  Record<string, Topic[]>
  subtopicsByTopic: Record<string, Subtopic[]>
  expanded:         Record<string, boolean>
  onToggle:         (id: string) => void
  onEdit:           (t: ManageTarget) => void
  onDelete:         (t: ManageTarget) => void
}

function Row({ label, color, expanded, onToggle, onEdit, onDelete }: {
  label: string; color?: string; expanded?: boolean
  onToggle?: () => void; onEdit: () => void; onDelete: () => void
}) {
  return (
    <div className="flex items-center justify-between group hover:bg-muted/20 pl-3 pr-3 py-1.5">
      <Button variant="ghost" onClick={onToggle} className="flex items-center justify-start gap-2 flex-1 min-w-0 text-left focus-visible:ring-0">
        {onToggle && <ChevronRight className={cn("size-3 text-muted-foreground transition-transform shrink-0", expanded && "rotate-90")} />}
        {color && <span className={cn("size-2 rounded-full shrink-0", color)} />}
        <span className="text-sm truncate">{label}</span>
      </Button>
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon-sm" onClick={onEdit}><Pencil className="size-3" /></Button>
        <Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive" onClick={onDelete}><Trash2 className="size-3" /></Button>
      </div>
    </div>
  )
}

export function SubjectsManageTree({ subjects, topicsBySubject, subtopicsByTopic, expanded, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-y-auto flex-1 py-2">
      {subjects.map((subject) => (
        <div key={subject.id}>
          <Row label={subject.name} color={subject.color} expanded={!!expanded[subject.id]}
            onToggle={() => onToggle(subject.id)}
            onEdit={() => onEdit({ type: "subject", item: subject })}
            onDelete={() => onDelete({ type: "subject", item: subject })}
          />
          {!!expanded[subject.id] && (
            <div className="ml-8 border-l-2 border-border">
              {(topicsBySubject[subject.id] ?? []).map((topic) => (
                <div key={topic.id}>
                  <Row label={topic.name} expanded={!!expanded[topic.id]}
                    onToggle={() => onToggle(topic.id)}
                    onEdit={() => onEdit({ type: "topic", item: topic })}
                    onDelete={() => onDelete({ type: "topic", item: topic })}
                  />
                  {!!expanded[topic.id] && (
                    <div className="ml-6 border-l-2 border-border">
                      {(subtopicsByTopic[topic.id] ?? []).map((subtopic) => (
                        <Row key={subtopic.id} label={subtopic.name}
                          onEdit={() => onEdit({ type: "subtopic", item: subtopic })}
                          onDelete={() => onDelete({ type: "subtopic", item: subtopic })}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
