# Mayday Academy

A learning application for the **Accounting and Month-End Basics** course. Built with the Next.js App Router and powered by static JSON content, rendered primarily with React Server Components so course content is fast, indexable and easy to maintain.

## Features

- **Homepage, course index, section and lesson pages** — server-rendered, statically generated and SEO-indexable.
- **65 lessons across 10 sections** covering accounting basics, month end, management reporting, tax, funding, controls, consolidation and the Mayday product suite.
- **Server-scored quiz** — a 40-question end-of-course quiz whose answer key never reaches the client. Scoring happens in an API route.
- **Local storage progress tracking** — completed lessons and quiz score, as a progressive enhancement.
- **Sitemap + robots** — indexable course pages only; the quiz is excluded and marked `noindex`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build (static generation)
npm run start   # serve the production build
npm run lint    # eslint
```

## Project structure

```
app/
  page.tsx                              Homepage
  course/page.tsx                       Course index
  course/[sectionSlug]/page.tsx         Section page
  course/[sectionSlug]/[lessonSlug]/    Lesson page
  quiz/page.tsx                         Quiz (noindex)
  api/quiz/score/route.ts               Server-side quiz scoring
  sitemap.ts  robots.ts                 SEO
components/
  Navigation.tsx  Footer.tsx  Breadcrumb.tsx
  course/                               Course UI components
  quiz/                                 Quiz client components
data/
  course-content.json                   Course content (client-visible)
  quiz-content.json                     Quiz questions, no answers (client-visible)
  quiz-answers.json                     Answer key + explanations (server-only)
lib/
  types.ts course.ts quiz.ts routes.ts progress.ts
```

## Data model

Three JSON files drive the app:

| File | Purpose | Client visible? |
| --- | --- | --- |
| `data/course-content.json` | Course sections, subsections and lessons | Yes |
| `data/quiz-content.json` | Quiz questions and answer options | Yes |
| `data/quiz-answers.json` | Correct answers and explanations | No — server-only |

`lib/quiz.ts` imports the answer key behind `import "server-only"`, and the only place answers are read is the `POST /api/quiz/score` route. Correct answers are returned only in the scoring response, after the user submits.

## A note on quiz security

This is not secure exam software. A determined user could discover answers by submitting attempts and inspecting the scoring response. That is acceptable for a public educational tool. The goal is to keep the answer key out of the initial page source, static JSON, sitemap and client-side JavaScript bundle — which it is.
