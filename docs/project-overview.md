## Architecture
Three main components

### SPA
- react
- vite
- tanstack query
- shadcn ui
- react hook form (maybe)
- no router, because small POC app.

### API
- node
- hono
- prisma
- arktype
- vitest
- fakerjs for seed data

### Postgres
- postgres 18

## Rough Plan of action
- First, establish the backend
  - Establish db schema and setup prisma
  - Create basic hono node application with separate route files to handle the "product" and "category" crud operations
  - Write tests for CRUD routes
  - Create test script that runs postgres instance and runs tests locally
- Move onto frontend
  - create basic react + vite application
  - add tanstack query and shadcn ui
  - develop dashboard for viewing, editing, adding, deleting products

