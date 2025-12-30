# Vynyl Project Overview

## Project Purpose
This is a full-stack POC application demonstrating modern web development practices with a focus on type safety, developer experience, and maintainable architecture. The application serves as a demonstration of CRUD operations for products and categories.

## Project Context for LLMs

### Core Technologies & Stack

#### Frontend (SPA)
- **Framework**: React with Vite for fast development and build times
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Shadcn/ui for accessible, customizable component library
- **Forms**: React Hook Form for performant form handling (optional, to be evaluated)
- **Routing**: No router implemented (intentional for small POC scope)
- **Type Safety**: Full TypeScript implementation with strict type checking

#### Backend (API)
- **Runtime**: Node.js with modern ES modules
- **Framework**: Hono for lightweight, fast API development
- **Database ORM**: Prisma for type-safe database access and migrations
- **Type Validation**: ArkType for runtime type checking and validation
- **Testing**: Vitest for fast, modern testing framework
- **Data Generation**: Faker.js for realistic test data and seeding

#### Database
- **Database**: PostgreSQL 18
- **Schema**: Prisma schema for type-safe database modeling
- **Migrations**: Prisma migrations for database version control

### Project Structure & Conventions

#### File Organization
- `/docs/` - Project documentation and planning
- `/backend/` - Backend API code 
- `/frontend/` - Frontend React application 


#### Development Patterns
- **Type Safety First**: All code written in TypeScript with strict type checking
- **Separation of Concerns**: Clear separation between frontend, backend, and database layers
- **Test-Driven Development**: Tests written alongside implementation


### Implementation Roadmap

#### Phase 1: Backend Foundation
1. **Database Setup**
   - Initialize PostgreSQL database
   - Create Prisma schema for products and categories
   - Set up database migrations

2. **API Development**
   - Create Hono application structure
   - Implement separate route modules for products and categories
   - Add CRUD operations (Create, Read, Update, Delete)
   - Integrate ArkType for request/response validation

3. **Testing Infrastructure**
   - Set up Vitest configuration
   - Write comprehensive tests for all CRUD endpoints
   - Create test database setup/teardown scripts
   - Implement integration tests

4. **Development Tools**
   - Create test script for local PostgreSQL instance
   - Set up database seeding with Faker.js
   - Configure development environment

#### Phase 2: Frontend Implementation
1. **Application Setup**
   - Initialize React + Vite project
   - Configure TypeScript and ESLint
   - Set up project structure and routing (if needed)

2. **UI Development**
   - Integrate Shadcn/ui component library
   - Implement TanStack Query for data fetching
   - Create responsive, accessible user interface

3. **Feature Implementation**
   - Product dashboard with list view
   - Product creation form
   - Product editing functionality
   - Product deletion with confirmation
   - Category management (if applicable)

4. **Integration & Polish**
   - Connect frontend to backend API
   - Implement error handling and loading states
   - Add form validation and user feedback
   - Performance optimization

### Key Considerations for LLMs

#### Type Safety Requirements
- All API endpoints must have proper TypeScript types
- Database models defined in Prisma schema
- Runtime validation using ArkType for all inputs/outputs
- Frontend components typed with TypeScript interfaces

#### Performance Considerations
- TanStack Query for efficient data fetching and caching
- Vite for fast development and build times
- PostgreSQL optimized queries through Prisma
- Minimal bundle size for frontend

#### Testing Strategy
- Unit tests for individual functions and components (time permitting)
- Integration tests for API endpoints
- Test data generation with Faker.js

#### Development Workflow
- Git-based version control with meaningful commits
- Prisma migrations for database changes
- Hot reload development with Vite
- Fast test execution with Vitest

### Success Criteria
- Complete CRUD functionality for products and categories
- Type-safe implementation throughout stack
- Comprehensive test coverage
- Responsive, accessible user interface
- Fast development and build times
- Clean, maintainable codebase following modern best practices
