"use client"

import { useState } from "react"
import type { StudyMode, SessionLength, SessionConfig } from "@/types/StudySessionType"

const DEFAULT: SessionConfig = {
  mode: "active-recall",
  subjectIds: [],
  subtopicId: null,
  questionCount: 10,
  interleave: true,
  elaborativeInterrogation: false,
  requeue: false,
  length: 20,
  customMinutes: 45,
}

export function useSessionConfig() {
  const [config, setConfig] = useState<SessionConfig>(DEFAULT)

  function setMode(mode: StudyMode) {
    setConfig((prev) => ({ ...prev, mode, subtopicId: null, subjectIds: [] }))
  }

  function toggleSubject(id: string) {
    setConfig((prev) => ({
      ...prev,
      subjectIds: prev.subjectIds.includes(id)
        ? prev.subjectIds.filter((s) => s !== id)
        : [...prev.subjectIds, id],
    }))
  }

  function setSubtopicId(id: string | null) {
    setConfig((prev) => ({ ...prev, subtopicId: id }))
  }

  function setQuestionCount(count: number) {
    setConfig((prev) => ({ ...prev, questionCount: count }))
  }

  function setInterleave(val: boolean) {
    setConfig((prev) => ({ ...prev, interleave: val }))
  }

  function setElaborativeInterrogation(val: boolean) {
    setConfig((prev) => ({ ...prev, elaborativeInterrogation: val }))
  }

  function setRequeue(val: boolean) {
    setConfig((prev) => ({ ...prev, requeue: val }))
  }

  function setLength(length: SessionLength) {
    setConfig((prev) => ({ ...prev, length }))
  }

  function setCustomMinutes(minutes: number) {
    setConfig((prev) => ({ ...prev, customMinutes: minutes }))
  }

  return { config, setMode, toggleSubject, setSubtopicId, setQuestionCount, setInterleave, setElaborativeInterrogation, setRequeue, setLength, setCustomMinutes }
}
