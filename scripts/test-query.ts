import * as dotenv from 'dotenv'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

async function main() {
  const { data, error } = await db
    .from('notes')
    .select('slug, title, subject, subject_slug')
    .order('date', { ascending: false })

  console.log('error:', error)
  console.log('count:', data?.length)
  console.log('rows:', JSON.stringify(data?.slice(0, 3), null, 2))
}

main()
