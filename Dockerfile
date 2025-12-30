FROM node:24-alpine AS base
WORKDIR /app/backend

# Copy package.json and package-lock.json (if available)
COPY ./backend/package.json ./backend/pnpm-lock.yaml* ./

# Install dependencies
RUN corepack enable
RUN pnpm install --frozen-lockfile

COPY ./backend  ./

RUN pnpm build

# Production image, copy all the files and run next
FROM node:24-alpine
WORKDIR /app

ENV NODE_ENV production

COPY --from=base /app/backend/dist ./dist
COPY --from=base /app/backend/node_modules ./node_modules
COPY --from=base /app/backend/package.json ./package.json

EXPOSE 3000

ENV PORT 3000

CMD ["node", "dist/src/index.js"]
