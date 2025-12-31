## Getting Started
### Summary
This is a simple application to allow users to manage product stock, presumably for some kind of store. It consists of a web based UI, a Nodejs API server, and a Postgres DB.

### Prerequisites
- Node v24
- pnpm (_npm should work, but untested_)
- docker (I use docker desktop)
- docker compose (Included in docker desktop)

### Run Procedure
1. Clone repo
2. Cd to /backend
2. Run "docker compose up -d"
3. Run "pnpm run db:dev:migrate"
4. Run "pnpm run seed"
5. Access localhost:3000 in browser

## Functionality
Users can
- Create products
- Browse products
  - Search, filter, sort products
- Edit Products
- Delete Products
- Create categories
- Browse categories
- Edit categories
- Delete categories

via the web UI.

The API server exposes functions for CRUD operations of both products and categories.

## Architecture Overview
- React SPA for UI
- Nodejs (hono) API server
  - This also serves the static react application
- Postgres 18 database
- One dockerfile containing the api server + built application

## Technologies (and commentary)
### Frontend
I've chosen **React + Vite** for the SPA. This is due to two reasons:
- They are industry standard, so no problem onboarding other developers
- They are what I'm familiar with

I have also explicitly chosen not to use any major framework or router. As the UI is a simple CRUD interface, a powerful framework is not needed. We don't need SSR, and we don't really need routing, so it is best to keep things as simple as possible. _If_ the application was expected to grow / take on more functionality, we should consider using a proper router. I would choose Tanstack Router, personally.

For UI Components, I have chosen **Shadcn UI**. This is just personal preference, as I felt it would be quick to iterate on and I find it visually appealing.

For data fetching, I use **Tanstack Query** and the basic **fetch** API. Tanstack Query is a joy to work with, and it is my opinion that it reduces overall project complexity dramatically.

### API
The API server uses **Node + Hono** for serving content. Hono was specified in the requirements (optionally) so I went with it. I had not used it before, but the basics of these Node web frameworks are pretty similar, so no issues. I enjoyed Hono's simplicity actually, and felt it was a good choice.

**Prisma** is my ORM of choice. While one can run into odd issues, overall it is very simple to work with. Since most applications are some form of CRUD at the end of the day, Prisma is great. Prisma also exposes raw query support, so we would have no problem handling any more complex use cases.

**Vitest** for testing the API routes. Vitest is significantly easier to use than Jest or Mocha. I use it on all new projects.

### Other
**Postgres** for the database. I think, generally, Postgres should be the first DB developers reach for. It is powerful, flexible, and shockingly fast. It is even quite good at storing document-style data with its JsonB columns.

There is an argument to be made that postgres is _too_ much for this small application, but I decided it was worth it. Initial setup is not too difficult, and it future-proofs us for a long time to come.

**Arktype** for validation both in frontend and backend. While Zod is industry standard, I feel that Arktype provides a much better developer experience. 

**Biome** for formatting and linting. I do not like ESLint, I have never had a good experience using it.
For formatting, I generally use Prettier, but I wanted to try Biome due to its linter + formatter nature.

This was my first time using Biome, and overall it was quite good. However, the official VS code extension does not work in a monorepo workspace, so I had to install an unofficial one. A bit annoying, but not insurmountable.



