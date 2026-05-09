"use client"

import { ImmediateReviewSummary } from "@/components/session/summary/ImmediateReviewSummary"
import type { ImmediateReviewSession } from "@/types/ImmediateReviewType"

const MOCK_SESSION: ImmediateReviewSession = {
  subtopicId:        "mock-id",
  scheduledDuration: 20,
  stage:             "summary",
  round:             1,
  activeQuestions:   [],
  questions:         [],
  round2Questions:   [],
  currentIndex:      0,
  currentQuestion:   null,
  studentAnswer:     "",
  isRevealed:        false,
  elapsedSeconds:    847,
  remainingSeconds:  0,
  timeProgress:      0,
  results: [
    { questionId: "q1", questionBody: "What is mitosis?",                   correctAnswer: "Cell division producing two identical daughter cells", studentAnswer: "When a cell splits in two",           confidence: "high",   selfRating: "partial"  },
    { questionId: "q2", questionBody: "What is the powerhouse of the cell?", correctAnswer: "Mitochondria",                                          studentAnswer: "Mitochondria",                       confidence: "high",   selfRating: "correct"  },
    { questionId: "q3", questionBody: "What is DNA?",                        correctAnswer: "Deoxyribonucleic acid — carries genetic information",    studentAnswer: "I forgot",                           confidence: "low",    selfRating: "missed"   },
    { questionId: "q4", questionBody: "What is the cell membrane made of?",  correctAnswer: "A phospholipid bilayer",                                 studentAnswer: "Lipids and proteins, a double layer", confidence: "medium", selfRating: "partial"  },
  ],
  round2Results: [
    { questionId: "q1", questionBody: "What is mitosis?", correctAnswer: "Cell division producing two identical daughter cells", studentAnswer: "Cell division into two identical daughter cells", confidence: "medium", selfRating: "correct" },
    { questionId: "q3", questionBody: "What is DNA?",     correctAnswer: "Deoxyribonucleic acid — carries genetic information", studentAnswer: "Still not sure",                                  confidence: "low",    selfRating: "missed"  },
  ],
  elaborativeInterrogation: false,
  selectedConfidence: null,
  selectedRating:     null,
  setStudentAnswer:   () => {},
  selectConfidence:   () => {},
  revealAnswer:       () => {},
  selectRating:       () => {},
  advanceQuestion:    () => {},
  skipQuestion:       () => {},
  startRound2:        () => {},
  finishSession:      () => {},
}

export default function ImmediateReviewPreviewPage() {
  return <ImmediateReviewSummary session={MOCK_SESSION} />
}
