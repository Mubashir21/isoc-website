<div align="center">
  <img src="./public/ISoc-logo-white.png" alt="ISOC UNM Logo" width="120" />
  <h1>ISOC UNM Website</h1>
  <p>The official website for the Islamic Society of the University of Nottingham Malaysia.</p>
</div>

<br />

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![PNPM](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Zod](https://img.shields.io/badge/Zod-408AFF?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)

# About

ISOC UNM is a community website for the Islamic Society of the University of Nottingham Malaysia. It shows daily prayer times with live countdowns, community announcements, and upcoming events. During the last 10 nights of Ramadan, the prayer card displays Qiyam ul Layl and the dua for Laylatul Qadr. An admin portal lets committee members manage all content.

# Features

- daily adhan and iqamah times with a live countdown to the next prayer
- Ramadan mode — Qiyam ul Layl (02:30 AM) injected into the countdown for the last 10 nights
- community announcements with a date-grouped timeline (MYT)
- regular and recurring event listings with search, filters, and pagination
- admin portal — create, edit, and delete events and announcements with image uploads
- analytics via PostHog

# Getting Started

```bash
git clone https://github.com/Mubashir21/isoc-website.git
cd isoc-website
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The admin portal is at `/admin`.

# Environment Variables

Create a `.env.local` file in the root:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login

# Postgres (Neon)
DATABASE_URL=
DATABASE_URL_UNPOOLED=
PGHOST=
PGHOST_UNPOOLED=
PGUSER=
PGDATABASE=
PGPASSWORD=
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_URL_NO_SSL=
POSTGRES_PRISMA_URL=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# ImageKit
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

# Want to Contribute?

1. Fork the repository.
2. Create a branch off `dev`.
3. Commit your changes following [conventional commits](https://www.conventionalcommits.org/) — e.g. `feat:`, `fix:`, `refactor:`, `docs:`.
4. Open a pull request to `dev`.

May Allah reward you with good for your contributions.
