# Repository Guidelines

## Project Structure & Module Organization

The stack couples a Vite React client with an Express server launched from `server/index.ts`. Entry logic lives in `src/entry-client.tsx`, with the shared shell in `src/app.tsx`. Feature UI resides in `src/components`, hooks in `src/hooks`, and cross-cutting helpers in `src/lib`. Server middleware and routes sit under `server/`. API routes should be written in `server/api/index.ts`. Static files stay in `public`, while builds target `dist/client` for the client bundle and `dist/server` for SSR output.

<project_structure>

```
.
├── AGENTS.md
├── README.md
├── biome.json
├── bun.lock
├── components.json
├── index.html
├── package.json
├── public
│   └── vite.svg
├── server
│   ├── api
│   │   └── index.ts
│   ├── entry-server.tsx
│   └── index.ts
├── src
│   ├── app.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   └── ui
│   ├── entry-client.tsx
│   ├── hooks
│   │   └── use-mobile.ts
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── routes
│   │   ├── health.tsx
│   │   └── home.tsx
│   └── vite-env.d.ts
├── tsconfig.json
└── vite.config.ts
```

</project_structure>

## Build, Test, and Development Commands

Install dependencies with `bun install` (mirrored by `npm install` if you prefer Node's tooling). `bun run dev` starts the Express host with Vite HMR. `bun run build` executes the `build:client` and `build:server` steps to emit deployable artifacts. `bun run preview` serves the production build locally. Use `bun run lint` to run Biome with safe auto-fixes, and `bun run type-check` to execute `tsc --noEmit` for type safety.

## Coding Style & Naming Conventions

Biome enforces two-space indents, 80-character lines, double quotes, and trailing commas where valid. Keep imports grouped with externals first and internal `@/` aliases afterward; rely on the organize-imports assist when uncertain. Apply PascalCase to React components, camelCase to functions and variables, and kebab-case to folders unless exporting a component. Compose Tailwind classes with `clsx` or `cva`, and keep related styles or utilities beside their components.

## Routing with Wouter

- Place route-level screens in `src/routes`; keep names lowercase and export the route component as default.
- Register each screen in `src/app.tsx` using wouter's `<Switch>` and `<Route>` components so navigation stays centralized.
- Use wouter's `<Link>` for client navigation. Pass a function to `className` when you need active styles or set `asChild` to integrate design-system primitives like `Button`.
- When adding a new page, import it into the switch and provide a matching link entry if it should appear in the header navigation.

```tsx
// src/app.tsx
import ReportsRoute from "@/routes/reports";

<Switch>
  <Route path="/reports">
    <ReportsRoute />
  </Route>
</Switch>;
```

### Component API quick reference

- `Route` renders its children when the current path matches the `path` pattern; wrap screens or inline render-prop functions for dynamic params.
- `Switch` ensures only the first matching `Route` renders, which is ideal for 404 fallbacks at the bottom of the list.
- `Link` mounts an anchor that performs client-side navigation and accepts `href`/`to`, the `className` render-prop for active state, and `asChild` for composition with design-system components.
- `Redirect` triggers navigation in an effect; pass `replace` or `state` for history management when guarding routes.
- `Router` is optional but lets you provide a custom location hook, base path, or SSR hints when the app grows.

### Hooks API quick reference

- `useLocation()` returns `[path, navigate]`, mirroring `useState`; use it to trigger navigation or read the scoped location inside nested routes.
- `useRoute(pattern)` returns a tuple with a match flag and params, handy for building custom wrappers or transitions around specific routes.
- `useParams()` exposes the params captured by the closest parent `Route`, removing the need for prop drilling in deeply nested trees.
- `useSearch()` and `useSearchParams()` read and mutate the query string; prefer the setter returned by `useSearchParams` when you need to update filters without constructing URLs manually.
- `useRouter()` gives access to the shared router object when you need to inspect the active hook or base path.

## Security & Configuration Tips

Do not commit secrets or `.env` files; configure them through your deploy platform. Validate incoming data inside Express middleware before rendering or proxying. Audit new dependencies, documenting their purpose in the PR. Schedule periodic `bun update` passes and review each diff before merging to keep the stack secure.
