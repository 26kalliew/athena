This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Database (Drizzle + Neon Postgres)

Add your Neon connection string to `.env.local`:

```
DATABASE_URL=postgres://...
```

| Command | What it does |
|---|---|
| `npm run db:generate` | Diff the schema and write a new SQL migration to `./drizzle` |
| `npm run db:migrate` | Apply all pending migrations to the database |
| `npm run db:studio` | Open Drizzle Studio (local DB browser) |

**First-time setup:**
```bash
npm run db:generate   # creates drizzle/0000_*.sql
npm run db:migrate    # applies it to your Neon DB
```

After changing `src/db/schema.ts`, re-run `db:generate` then `db:migrate`.

> `db:migrate` and `db:studio` use `node --env-file=.env.local` to load the connection string. Requires Node 20.6+.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
