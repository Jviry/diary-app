# D/ARY Backend

A love letter app backend built with Express, TypeScript, Prisma, and Supabase.

---

## Tech Stack

- **Runtime** — Node.js 20 (ESM)
- **Framework** — Express
- **Infrastructure** — AWS Lambda (via Serverless Framework)
- **Bundler** — esbuild
- **Language** — TypeScript
- **ORM** — Prisma 7
- **Database** — PostgreSQL (Supabase)
- **Auth** — JWT + Bcrypt

---

## Prerequisites

- Node.js v20+
- npm
- A Supabase account and project
- A Spotify Developer account (for song search)

---

## Environment Variables

Create a `.env` file in the root directory. These are used for local development.

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres
JWT_SECRET=your_super_secret_key_here
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note:** These variables are also mapped in `serverless.yml` for the production environment.

---

## Installation

```bash
# install dependencies
npm install
```

---

## Prisma Setup

### 1. Generate the Prisma Client
Run this whenever you change `schema.prisma`. The client is generated into `src/generated/prisma/`.

```bash
npx prisma generate
```

### 2. Run Migrations
Apply changes to your Supabase database:

```bash
npx prisma migrate dev --name <migration-name>
```

---

## Local Development

```bash
# Start development server (auto-restarts)
npm run dev

# Linting
npm run lint

# Formatting
npm run format
```

The dev server uses `ts-node/esm` to support native ES Modules.

---

## Project Structure & Architecture

The project follows a layered architecture to ensure separation of concerns:

```
src/
├── handlers/         # Lambda entry points (wraps Express app)
├── controller/       # Express Routers and HTTP request handling
├── usecase/          # Core business logic
├── repository/       # Database access (Prisma)
├── models/           # TypeScript types and interfaces
├── config/           # Service initializations (Prisma, Supabase)
├── common/           # Shared middleware and error handling
├── generated/        # Auto-generated Prisma client (ignored by git)
└── utils/            # External API helpers (Spotify)
```

### Flow of a Request:
1. **Handler:** AWS Lambda receives the event and passes it to the Express app via `serverless-http`.
2. **Controller:** Routes the request and calls the appropriate **Usecase**.
3. **Usecase:** Executes business logic and interacts with **Repositories**.
4. **Repository:** Performs database operations using **Prisma**.

---

## Infrastructure Context

- **ESM Support:** The project uses native ES Modules (`"type": "module"` in `package.json`).
- **esbuild:** Used by the CI/CD pipeline to bundle the app. A `require` shim is injected via a `banner` in `serverless.yml` to support legacy CommonJS dependencies in an ESM environment.
- **Native Modules:** `bcrypt` is treated as an external dependency to ensure the correct binary for the Lambda environment (RHEL) is used.
