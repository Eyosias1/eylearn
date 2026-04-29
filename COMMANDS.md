# Commands

Repeated project commands and workflows.

## Development Server

Run the Next.js dev server with a capped Node heap:

```bash
bun run dev
```

This uses `NODE_OPTIONS=--max-old-space-size=4096` to keep large dev-only module caches, especially Excalidraw and related dependencies, from growing the Next.js process without bound during long sessions.

## Supabase Types

Use this when the Supabase schema changes and `src/types/database.types.ts` needs updating.

1. Log in to Supabase:

```bash
bunx supabase login
```

2. Confirm the project is visible to your account:

```bash
bunx supabase projects list
```

3. Generate database types:

```bash
bun run db:types
```

This runs:

```bash
bunx supabase gen types typescript --project-id cirfgirgmxktrkleqwtb --schema public > src/types/database.types.ts
```

If this fails with an access-control error, the logged-in Supabase account does not have enough permissions for the project.
