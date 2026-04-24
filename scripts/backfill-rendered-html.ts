import { createClient } from '@supabase/supabase-js'
import { renderMarkdown } from '../src/lib/markdown/render-markdown'

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
)

async function backfill() {
  const { data, error } = await db.from('notes').select('slug, content')
  if (error) { console.error(error.message); process.exit(1) }
  if (!data?.length) { console.log('Nothing to backfill'); return }

  console.log(`Backfilling ${data.length} notes…`)
  for (const row of data) {
    const rendered_html = await renderMarkdown(row.content)
    const { error: writeErr } = await db
      .from('notes').update({ rendered_html }).eq('slug', row.slug)
    if (writeErr) { console.error(`  error on ${row.slug}: ${writeErr.message}`); process.exit(1) }
    console.log(`  ✓ ${row.slug}`)
  }
  console.log('Done.')
}

backfill()
