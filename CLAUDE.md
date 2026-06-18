# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (Turbopack, localhost:3000)
npm run build    # production build (Turbopack)
npm run start    # start production server
npm run lint     # run ESLint
npx next typegen # generate PageProps/LayoutProps/RouteContext type helpers
```

No test runner is configured yet.

## Stack

- **Next.js 16.2.9** — App Router, `src/app/` layout, Turbopack by default
- **React 19.2.4**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **TypeScript** (strict mode, path alias `@/*` → `src/*`)
- **ESLint** flat config (`eslint.config.mjs`, not `.eslintrc`)

## Next.js 16 breaking changes

This is Next.js 16, not 15. APIs differ — always check `node_modules/next/dist/docs/` before writing any code.

**Async-only request APIs** — synchronous access is fully removed. Always `await` these:
- `cookies()`, `headers()`, `draftMode()`
- `params` and `searchParams` in `page.tsx`, `layout.tsx`, `route.ts`, metadata files

```tsx
// Correct in Next.js 16
export default async function Page({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params
  const query = await searchParams
}
```

Use `npx next typegen` to generate `PageProps<'/path/[param]'>` helpers instead of writing param types by hand.

**No `middleware.ts`** — renamed to `proxy.ts`. The export is also renamed from `middleware` to `proxy`. The `edge` runtime is NOT supported; proxy always runs on `nodejs`. If you need `edge`, keep `middleware.ts`.

```ts
// proxy.ts
export function proxy(request: Request) {}
```

**`revalidateTag` requires a second argument** (cacheLife profile):
```ts
revalidateTag('posts', 'max')  // not revalidateTag('posts')
```

**New `updateTag`** (Server Actions only) — expires and immediately refreshes; use when users need to see their own writes instantly.

**Parallel routes** — all `@slot/default.tsx` files are required or builds fail.

**`next/image` local images with query strings** — no longer supported.

**Instant navigation** — `Suspense` alone is not enough. Export `unstable_instant` from routes that should navigate instantly; see `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md`.

**Scroll behavior** — Next.js 16 no longer overrides `scroll-behavior: smooth` during navigation. Add `data-scroll-behavior="smooth"` to `<html>` if the old behavior is needed.
