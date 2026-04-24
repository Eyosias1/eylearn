import { getTopics, getSubjectById } from "@/lib/mock/mock-data"
import type { GraphNode, GraphEdge, SubjectCluster } from "@/types/graph"

export function getGraphNodes(): GraphNode[] {
  return getTopics().map((t) => ({
    id: t.id,
    label: t.name,
    subjectId: t.subjectId,
    subjectName: getSubjectById(t.subjectId)?.name ?? "",
    health: t.health,
    retentionScore: t.retentionScore,
    lastReviewedAt: t.lastReviewedAt,
    dueDate: t.dueDate,
  }))
}

export const graphEdges: GraphEdge[] = [
  // Biology
  { source: "t1",  target: "t2",  weight: 2 },
  { source: "t1",  target: "t7",  weight: 2 },
  { source: "t2",  target: "t10", weight: 2 },
  { source: "t7",  target: "t9",  weight: 1 },
  { source: "t9",  target: "t10", weight: 1 },
  // Chemistry
  { source: "t3",  target: "t4",  weight: 1 },
  { source: "t3",  target: "t8",  weight: 2 },
  { source: "t4",  target: "t11", weight: 2 },
  { source: "t8",  target: "t12", weight: 1 },
  { source: "t11", target: "t12", weight: 1 },
  // Mathematics
  { source: "t5",  target: "t6",  weight: 2 },
  { source: "t5",  target: "t15", weight: 2 },
  { source: "t6",  target: "t13", weight: 1 },
  { source: "t13", target: "t14", weight: 1 },
  { source: "t14", target: "t15", weight: 1 },
  // Physics
  { source: "t16", target: "t17", weight: 2 },
  { source: "t16", target: "t20", weight: 1 },
  { source: "t17", target: "t19", weight: 1 },
  { source: "t18", target: "t20", weight: 2 },
  { source: "t19", target: "t18", weight: 1 },
  // Computer Science
  { source: "t21", target: "t22", weight: 2 },
  { source: "t21", target: "t25", weight: 1 },
  { source: "t22", target: "t23", weight: 1 },
  { source: "t23", target: "t24", weight: 2 },
  { source: "t24", target: "t25", weight: 1 },
  // History
  { source: "t26", target: "t28", weight: 2 },
  { source: "t27", target: "t28", weight: 1 },
  { source: "t28", target: "t29", weight: 1 },
  { source: "t29", target: "t30", weight: 1 },
  { source: "t26", target: "t27", weight: 1 },
  // Cross-cluster
  { source: "t2",  target: "t3",  weight: 1 },
  { source: "t8",  target: "t16", weight: 1 },
  { source: "t5",  target: "t16", weight: 1 },
  { source: "t15", target: "t18", weight: 1 },
  { source: "t21", target: "t13", weight: 1 },
  { source: "t25", target: "t14", weight: 1 },
  { source: "t7",  target: "t21", weight: 1 },
]

export const subjectClusters: SubjectCluster[] = [
  { id: "s1", name: "Biology",          cx: 0.18, cy: 0.28 },
  { id: "s2", name: "Chemistry",        cx: 0.50, cy: 0.18 },
  { id: "s3", name: "Mathematics",      cx: 0.82, cy: 0.28 },
  { id: "s4", name: "Physics",          cx: 0.82, cy: 0.72 },
  { id: "s5", name: "Computer Science", cx: 0.50, cy: 0.82 },
  { id: "s6", name: "History",          cx: 0.18, cy: 0.72 },
]
