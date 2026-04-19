<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Package Manager
Always use `bun` for installing packages, not `npm` or `yarn`.
- Install: `bun add <package>`
- Dev dependency: `bun add -d <package>`
- Run scripts: `bun run <script>`

# Code Structure & Separation of Concerns

## File Length
- **No file should exceed 100 lines.** If it does, split it.

## Component Rules
- One component per file.
- Split large components into smaller focused sub-components.
- Keep pages thin — pages only compose components, they contain no logic.

## Folder Structure
```
src/
  app/                  # Pages only — no logic, no inline components
  components/
    ui/                 # shadcn primitives only
    layout/             # Navbar, Sidebar, Shell
    [feature]/          # Feature-specific components (dashboard, session, etc.)
  hooks/                # Custom React hooks
  lib/                  # Utilities, helpers, constants
  types/                # TypeScript types and interfaces
```

## Naming Conventions
- Components: `PascalCase` — `TopicCard.tsx`
- Hooks: `camelCase` prefixed with `use` — `useStudySession.ts`
- Utilities: `camelCase` — `formatRetention.ts`
- Types: `PascalCase` suffixed with type — `StudySessionType.ts`

## Logic Separation
- Data fetching → inside hooks (`hooks/`)
- Business logic → inside hooks or `lib/`
- UI rendering → inside components
- Never fetch data or write business logic directly inside a component

# Git Commits

Never add `Co-Authored-By` lines to commit messages.

# shadcn/ui Components

Do **not** add custom CSS or override styles on shadcn components unless explicitly asked. shadcn components are already styled — adding CSS on top creates conflicts and redundancy. Only pass className overrides when the user specifically requests a visual change.

# Tailwind CSS Conventions

## Always use `cn()` from `@/lib/utils`
Never concatenate class strings manually. Always use `cn()`.

```tsx
// ✅ correct
className={cn("base-class", isActive && "active-class")}

// ❌ wrong
className={`base-class ${isActive ? "active-class" : ""}`}
```

## Organize classes by category — one group per line
Split classes into logical groups with a comment for each:

```tsx
className={cn(
  // layout
  "flex flex-col items-center",
  // sizing
  "w-full max-w-md h-screen",
  // spacing
  "p-4 gap-3",
  // typography
  "text-sm font-medium",
  // colors
  "bg-background text-foreground",
  // border
  "border border-border rounded-lg",
  // animation
  "transition-all duration-200 ease-in-out",
  // hover
  "hover:bg-accent hover:text-accent-foreground",
  // mobile
  "sm:flex-row sm:p-6",
  // desktop
  "lg:max-w-xl lg:gap-6",
  // conditional
  isActive && "bg-primary text-primary-foreground",
)}
```

## Category Order
Always write classes in this order:
1. `layout` — display, position, flex, grid
2. `sizing` — width, height, max/min
3. `spacing` — padding, margin, gap
4. `typography` — font, text
5. `colors` — background, text color, border color
6. `border` — border, radius, outline
7. `animation` — transition, duration, ease, animate
8. `hover / focus / active` — interactive states
9. `mobile` — sm: breakpoints
10. `desktop` — lg: xl: breakpoints
11. `conditional` — dynamic classes last
