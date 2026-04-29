"use client"

import { useState, useEffect } from "react"
import { getSubjects } from "@/lib/actions/subjects"
import { getTopics } from "@/lib/actions/topics"
import { getSubtopicsByTopic } from "@/lib/actions/studyplan-actions"
import type { Subject } from "@/types/SubjectType"
import type { Topic } from "@/types/TopicType"

interface Init {
  subjectId:   string | null
  topicId:     string | null
  subtopicId:  string | null
  subjectName: string
  topicName:   string
  subtopicName: string
}

const EMPTY_SUBJECT: Subject = { id: "", name: "", color: "", user_id: "", created_at: "" }
const EMPTY_TOPIC:   Topic   = { id: "", name: "", subject_id: "", created_at: "" }

function seedSubjects(id: string | null, name: string): Subject[] {
  return id ? [{ ...EMPTY_SUBJECT, id, name }] : []
}
function seedTopics(id: string | null, name: string): Topic[] {
  return id ? [{ ...EMPTY_TOPIC, id, name }] : []
}
function seedSubtopics(id: string | null, name: string) {
  return id ? [{ id, name }] : []
}

export function useSubjectTopicChain(init: Init) {
  const [subjects,   setSubjects]   = useState<Subject[]>(() => seedSubjects(init.subjectId, init.subjectName))
  const [topics,     setTopics]     = useState<Topic[]>(() => seedTopics(init.topicId, init.topicName))
  const [subtopics,  setSubtopics]  = useState<{ id: string; name: string }[]>(() => seedSubtopics(init.subtopicId, init.subtopicName))
  const [subjectId,  setSubjectId]  = useState(init.subjectId ?? "")
  const [topicId,    setTopicId]    = useState(init.topicId ?? "")
  const [subtopicId, setSubtopicId] = useState(init.subtopicId ?? "")

  useEffect(() => { getSubjects().then(setSubjects) }, [])

  useEffect(() => {
    if (!subjectId) { setTopics([]); return }
    getTopics(subjectId).then(setTopics)
  }, [subjectId])

  useEffect(() => {
    if (!topicId) { setSubtopics([]); return }
    getSubtopicsByTopic(topicId).then(setSubtopics)
  }, [topicId])

  function selectSubject(id: string) {
    setSubjectId(id)
    setTopicId("")
    setSubtopicId("")
  }

  function selectTopic(id: string) {
    setTopicId(id)
    setSubtopicId("")
  }

  return {
    subjects, topics, subtopics,
    subjectId, topicId, subtopicId,
    selectSubject, selectTopic, setSubtopicId,
  }
}
