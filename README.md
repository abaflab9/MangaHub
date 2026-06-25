This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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


# MangaHub

MangaHub is a personal manga, manhwa, and webtoon tracking application built with Next.js, TypeScript, Supabase, and the MangaUpdates API.

The goal is to provide a modern, mobile-friendly tracking experience inspired by MangaUpdates, AniList, and MyAnimeList while integrating MangaUpdates metadata and search functionality.

## Features

### Authentication

* User signup and login with Supabase Authentication
* Persistent login sessions

### Library Management

* Add series from MangaUpdates search results
* Reading, Completed, On Hold, Dropped, and Plan to Read statuses
* Chapter progress tracking
* Prevent duplicate series entries

### MangaUpdates Integration

* Search MangaUpdates directly from the app
* Import series metadata
* Import cover images

### Reading Page

* View currently reading series
* Increment and decrement chapter progress
* Update chapter progress directly
* Update reading status

### Library Page

* Browse tracked series by status

## Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS v4

### Backend / Database

* Supabase

  * Authentication
  * PostgreSQL Database
  * Row Level Security

### External APIs

* MangaUpdates API

## Database Schema

### user_series

| Column          | Type    |
| --------------- | ------- |
| id              | uuid    |
| user_id         | uuid    |
| title           | text    |
| chapter         | integer |
| schedule        | text    |
| status          | text    |
| mangaupdates_id | bigint  |
| cover_url       | text    |

### Constraints

Unique index:

(user_id, mangaupdates_id)

Prevents duplicate additions of the same series.

## Local Development

Install dependencies:

npm install

Start development server:

npm run dev

Open:

http://localhost:3000

## Environment Variables

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

## Project Structure

app/
├── page.tsx
├── search/
├── library/
├── settings/
├── login/
├── signup/
├── api/
└── series/

components/
├── ReadingCard.tsx
├── BottomNav.tsx
├── FloatingAddButton.tsx

lib/
└── supabase.ts

## Current Roadmap

### Near Term

* Series detail pages
* Better search result cards
* Library search
* Cover image optimization with next/image

### Future

* Schedule tracking
* Import/export
* MangaUpdates account linking
* Automatic chapter update checking
* Reading statistics
* Custom lists

## Notes

MangaHub uses MangaUpdates as the primary metadata source.

The application is designed mobile-first and should remain usable on desktop and mobile browsers.
