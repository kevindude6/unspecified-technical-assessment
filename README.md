**THIS IS A TECHNICAL ASSESSMENT, NOT A REAL APPLICATION**

## Summary
This is a simple application to allow users to manage product stock, presumably for some kind of store. It consists of a web-based UI, a Node.js API server, and a PostgreSQL database.

## Getting Started
### Prerequisites
- Node v24
- pnpm (_npm should work, but untested_)
- Docker (I use Docker Desktop)
- Docker Compose (included in Docker Desktop)

### Run Procedure
This procedure will build the Docker image and run it locally, along with a PostgreSQL instance.

1. Clone repo
2. Navigate to `/backend`
3. Create a `.env.dev` file with the following content:
   ```
   DATABASE_URL="postgresql://app_user:app_password@localhost:5432/app_dev?schema=public"
   NODE_ENV="dev"
   ```
   _In a real application, this would be secret, so I have excluded it from the repo_

4. Run `docker compose up -d`
5. Run `pnpm run db:dev:migrate`
6. Run `pnpm run seed`
7. Access `localhost:3000` in browser

### Testing
Testing requires a local PostgreSQL instance to work with, so we must spin that up.

1. Navigate to `/backend`
2. Run `pnpm run db:test:up`
3. Run `pnpm run db:test:migrate`
4. Run `pnpm run test`

This isn't great DX, but it is acceptable given time constraints.

## Functionality

Users can:
- Create products
- Browse products
  - Search, filter, sort products
- Edit products
- Delete products
- Create categories
- Browse categories
- Edit categories
- Delete categories

via the web UI.

The API server exposes functions for CRUD operations of both products and categories.

## Architecture Overview
- React SPA for UI
- Node.js (Hono) API server
  - This also serves the static React application
- PostgreSQL 18 database
- One Dockerfile containing the API server + built application

## Technologies (and Commentary)

### Frontend
I've chosen **React + Vite** for the SPA. This is due to two reasons:
- They are industry standard, so no problem onboarding other developers
- They are what I'm familiar with

I have also explicitly chosen not to use any major framework or router. As the UI is a simple CRUD interface, a powerful framework is not needed. We don't need SSR, and we don't really need routing, so it is best to keep things as simple as possible. _If_ the application was expected to grow / take on more functionality, we should consider using a proper router. I would choose TanStack Router, personally.

For UI components, I have chosen **Shadcn UI**. This is just personal preference, as I felt it would be quick to iterate on and I find it visually appealing.

For data fetching, I use **TanStack Query** and the basic **fetch** API. TanStack Query is a joy to work with, and it is my opinion that it reduces overall project complexity dramatically.

### API
The API server uses **Node + Hono** for serving content. Hono was specified in the requirements (optionally) so I went with it. I had not used it before, but the basics of these Node web frameworks are pretty similar, so no issues. I enjoyed Hono's simplicity actually, and felt it was a good choice.

**Prisma** is my ORM of choice. While one can run into odd issues, overall it is very simple to work with. Since most applications are some form of CRUD at the end of the day, Prisma is great. Prisma also exposes raw query support, so we would have no problem handling any more complex use cases.

**Vitest** for testing the API routes. Vitest is significantly easier to use than Jest or Mocha. I use it on all new projects.

### Other
**PostgreSQL** for the database. I think, generally, PostgreSQL should be the first DB developers reach for. It is powerful, flexible, and shockingly fast. It is even quite good at storing document-style data with its JSONB columns.

There is an argument to be made that PostgreSQL is _too_ much for this small application, but I decided it was worth it. Initial setup is not too difficult, and it future-proofs us for a long time to come.

**Arktype** for validation both in frontend and backend. While Zod is industry standard, I feel that Arktype provides a much better developer experience. 

**Biome** for formatting and linting. I do not like ESLint, I have never had a good experience using it. For formatting, I generally use Prettier, but I wanted to try Biome due to its linter + formatter nature.

This was my first time using Biome, and overall it was quite good. However, the official VS Code extension does not work in a monorepo workspace, so I had to install an unofficial one. A bit annoying, but not insurmountable.

## Missing Features / Controversial Choices

### Authentication
There is no authentication / login, this is surely needed if it were a real product. Assuming no specific requirements, I would use betterauth. Authentication is not something most people should implement on their own, as there are many pitfalls to avoid. Using an established package is a lot safer.

### Testing
There are no UI tests. This is mainly due to time constraints. UI tests tend to be quite time-consuming to create and maintain, and this is a short technical assessment. So I have chosen to exclude them and focus on functionality.

The API-side tests are essentially integration tests. There is basically no special business logic going on, so in my opinion, in this specific case, there is no point in unit tests.

### API Structure
All logic is in the route files, and that isn't _the best_ practice. Larger applications should generally implement some separation of concerns to keep the code maintainable (and testable) but this is a small and fast project without any special logic. In this specific case, I opted for a faster workflow.

### API Responses
I like to wrap my responses in objects. 
```json
{
  "success": boolean,
  "data": {},
  "error"?: string,
  "message"?: string
  }
```
However, this is technically redundant. We already have http status codes, so we don't need the success boolean. I just like to do it because I think it makes the frontend a little simpler.

Further, and likely more controversial, I prefer to always return collections. Never single data. Even if the method only returns one element, wrap it in a list. Really, I just like working that way. It has pros and cons depending on use case, but nothing deal-breaking. 

## Miscellaneous Pointers
- `docker-compose down -v` will wipe the volumes
- Current docker-compose dev file is persisted in a volume, but without a specific path. This would need to be changed in a real scenario

## Additional Feature
The assessment requests an additional feature. I added i18n translation, so you can toggle between English and Japanese (machine translated) 

I thought it would be neat and it wasn't too hard.

## Meta Commentary
This was a tough assessment. Not that the functionality is difficult, but the "plan to spend 60-90 minutes" confuses me. While there are "no extra points" for being faster or slower, the assessment also suggests treating it like a real project that will be onboarding other developers. That means, to me, laying a strong foundation and choosing the right tools for the job. I don't think that can be done in 90 minutes.

I know there is a heavy AI emphasis, but even with A LOT of AI use it still took me at least four hours. I wouldn't feel comfortable submitting a 90-minute project, as it would have too many cut corners for my liking. 

That's not to say this is perfect, _(by no means is this perfect)_ but I think I found a good balance of quality to time pressure.

Anyway, this was good practice and a good full-stack refresher, so I didn't mind spending the time on it. I think it is easy to get locked into whatever technologies your day job uses, so it is nice to read up and try new things now and then.

Also, I cut off the screen recording around four hours in, because I had to cook dinner. 