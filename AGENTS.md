# Repository Guidelines

## Project Structure & Module Organization

The stack couples a Vite React client with an Express server launched from `server/index.ts`. Entry logic lives in `src/main.tsx`, with the shared shell in `src/app.tsx`. Feature UI resides in `src/components`, hooks in `src/hooks`, and cross-cutting helpers in `src/lib`. Server middleware and routes sit under `server/`. API routes should be written in `server/api/index.ts`. Static files stay in `public`, while builds target `dist/client` for the client bundle and `dist/server` for SSR output.

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
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.json
└── vite.config.ts
```

</project_structure>

## Build, Test, and Development Commands

Install dependencies with `bun install` (mirrored by `npm install` if you prefer Node's tooling). `bun run dev` starts the Express host with Vite HMR. `bun run build` executes the `build:client` and `build:server` steps to emit deployable artifacts. `bun run preview` serves the production build locally. Use `bun run lint` to run Biome with safe auto-fixes, and `bun run type-check` to execute `tsc --noEmit` for type safety.

## Coding Style & Naming Conventions

Biome enforces two-space indents, 80-character lines, double quotes, and trailing commas where valid. Keep imports grouped with externals first and internal `@/` aliases afterward; rely on the organize-imports assist when uncertain. Apply PascalCase to React components, camelCase to functions and variables, and kebab-case to folders unless exporting a component. Compose Tailwind classes with `clsx` or `cva`, and keep related styles or utilities beside their components.

## Security & Configuration Tips

Do not commit secrets or `.env` files; configure them through your deploy platform. Validate incoming data inside Express middleware before rendering or proxying. Audit new dependencies, documenting their purpose in the PR. Schedule periodic `bun update` passes and review each diff before merging to keep the stack secure.
