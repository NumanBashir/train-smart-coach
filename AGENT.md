## Role & Expertise

You are an expert in **Next.js**, **TypeScript**, **React**, **Tailwind CSS (with custom tokens)**, **shadcn/ui**, **API routes**, **server actions**, **middleware**, **authentication**, and **frontend performance optimization**.

You work inside a modern Next.js codebase with:

- An `/app` directory using the App Router.
- Reusable UI, utilities, and business logic inside `/src`.
- A design system powered by Tailwind + custom CSS variables.
- Server-side logic with API Routes or server actions when appropriate.

Your primary goals:

- Keep the codebase modular, scalable, and production-ready.
- Maintain clean, typed, maintainable TypeScript.
- Write predictable UI using consistent design tokens.
- Follow Next.js best practices for layouts, routing, and data fetching.
- Keep UI and business logic clearly separated.

---

## 🏗️ Architecture Overview

### App Router Structure

- Pages & routes live in `/app`.
- Layouts managed through `(root)/layout.tsx`, nested as needed.
- Loading and error UI handled via `loading.tsx` and `error.tsx`.

`app/
  (marketing)/ → Public pages  (dashboard)/ → Authenticated pages
  api/ → Serverless routes
  layout.tsx
  page.tsx`

### Core App Logic (under `/src`)

`src/
  components/  → Reusable UI components (client or  server)
  ui/          → shadcn/ui components (design system)
  lib/         → Utilities, helpers, config
  hooks/       → Client-side hooks (useDebounce, useMediaQuery)
  services/    → Business logic (API clients, DB helpers) server/      → Server actions, DB access  types/       → Global TypeScript types styles/      → Global styles and design tokens`

### Public Assets

- `/public/images`
- `/public/icons`
- `/public/fonts`

---

## 🎨 Code Style & Structure

### General Rules

- Use TypeScript everywhere.
- Prefer **server components** unless client components are required.
- Keep pages/screens clean by moving logic into server actions, hooks, or services.
- Never mix UI and business logic in the same file.

### Naming Conventions

- Folders → kebab-case
- Components → PascalCase
- Hooks → useSomething.ts
- Utilities → camelCase
- API routes → aligned with endpoint paths
- Page files → lowercase (page.tsx)

### Syntax & Formatting

- Use async/await (no raw `.then` chains).
- Use meaningful TypeScript types (avoid `any`).
- Keep imports sorted & grouped.
- Prettier conventions:

  - 2-space indentation
  - No semicolons if the project uses standard formatting

---

## 🎨 UI & Styling

- Use **Tailwind + shadcn/ui** for all styling.
- Respect and extend custom design tokens:

  - `--background`
  - `--foreground`
  - `--border`
  - `--radius`

- Prefer Tailwind utility classes over inline styles.
- Keep components small & composable.
- Avoid deeply nested Tailwind classes; extract reusable patterns.

### Layout & Responsiveness

- Use responsive Tailwind classes (`md:`, `lg:`).
- Minimize standalone CSS files — Tailwind should handle most cases.

---

## 🔐 Auth & Security

### Authentication

- Use Clerk, Auth.js, or the project’s chosen auth provider.
- Never expose private keys in client components.
- Protect authenticated routes using `middleware.ts`.

### API

- Use server actions or API routes for mutations.
- Validate all input (zod recommended).
- Use error boundaries for robust UX.

---

## ⚡ Performance & Optimization

- Prefer server components for data fetching.
- Use React Server Components wherever possible.
- Use Suspense with `loading.tsx` for async boundaries.
- Optimize images via Next.js `<Image />`.
- Avoid unnecessary client components.
- Memoize (`React.memo`) only when beneficial.

Avoid:

- Fetching on the client when it can be on the server.
- Heavy, unoptimized images.
- Large client-side bundles.

---

## 🔌 API & Data Layer

### Server Actions

Use for:

- Mutations
- Secure DB access
- Form submissions

### API Routes

Use when:

- External systems need endpoints
- Webhooks are required
- Third-party integrations depend on REST endpoints

### Services

`src/services/
  user-service.ts
  ai-service.ts
  billing-service.ts
  analytics-service.ts`

Each service should contain pure, UI-agnostic logic.

---

## 🧭 Behavior Guidelines (for AI Agents)

When generating code:

- Follow the existing folder structure.
- Use the App Router and server actions by default.
- Keep page components clean.
- Follow the Tailwind + shadcn/ui design system.
- Avoid introducing new dependencies unless requested.
- Assume TypeScript strict mode.
- Ensure all code is paste-ready and error-free.

---

## 🚀 Developer Workflow

### Commands

`npm run dev
npm run build
npm run lint
npm run format`

### Required Env Variables (example)

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `DATABASE_URL`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`

### Deployment (Vercel)

- Use edge runtimes where beneficial.
- Store secrets in Vercel env vars.
- Optimize images with Next.js Image Optimization.
- Use static rendering where possible for performance.
