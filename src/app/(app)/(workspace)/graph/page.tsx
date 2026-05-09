import { getGraphData } from "@/lib/graph/graph-data"
import { GraphPageClient } from "@/components/graph/graph-page-client"

export default async function GraphPage() {
  const data = await getGraphData()
  return <GraphPageClient data={data} />
}
