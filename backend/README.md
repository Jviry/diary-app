# D/ARY Backend

A love letter app backend built with Express, TypeScript, Prisma, and Supabase.

---

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express
- **Language** — TypeScript
- **ORM** — Prisma 7
- **Database** — PostgreSQL (Supabase)
- **Storage** — Supabase Storage
- **Auth** — JWT + Bcrypt
- **File Uploads** — Multer

---

## Prerequisites

- Node.js v18+
- npm
- A Supabase account and project
- A Spotify Developer account (for song search)

---

## Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres
JWT_SECRET=your_super_secret_key_here
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

### Where to get these

| Variable | Where to find it |
|---|---|
| `DATABASE_URL` | Supabase → Project Settings → Database → Connection String (URI) |
| `SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon public key |
| `SPOTIFY_CLIENT_ID` | Spotify Developer Dashboard → Your App |
| `SPOTIFY_CLIENT_SECRET` | Spotify Developer Dashboard → Your App |

---

## Installation

```bash
# go into backend folder
cd backend

# install dependencies
npm install
```

---

## Prisma Setup

### 1. Generate the Prisma Client

Run this whenever you change `schema.prisma`:

```bash
npx prisma generate
```

This generates TypeScript types and the Prisma client into `src/generated/prisma/`.

### 2. Run Migrations

Run this to create/update tables in your Supabase database:

```bash
npx prisma migrate dev --name <migration-name>
```

Example:

```bash
npx prisma migrate dev --name init
npx prisma migrate dev --name add-ping-table
```

### 3. View your database (optional)

Opens Prisma Studio — a visual DB browser:

```bash
npx prisma studio
```

---

## Running the Server

```bash
# development (auto-restarts on save)
npm run dev

# build for production
npm run build

# run production build
node dist/app.js
```

---

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma         # database schema
│   └── migrations/           # migration history
├── src/
│   ├── config/
│   ├── common/
│   │   ├── error/
│   │   └── middleware/
│   ├── models/
│   ├── repository/
│   ├── usecase/
│   ├── controllers/
│   └── app.ts                # entry point
├── package.json
├── tsconfig.json
└── prisma.config.ts          # prisma config
```

---

## API Endpoints

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Login and get JWT token |

### Letters

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/letters` | Yes | Send a new letter |
| GET | `/letters/sent` | Yes | Get all sent letters |
| GET | `/letters/received` | Yes | Get all received letters |
| GET | `/letters/:id` | Yes | Get a specific letter |
| PATCH | `/letters/:id/read` | Yes | Mark a letter as read |
| DELETE | `/letters/:id` | Yes | Delete a letter |

### Auth Header

For protected routes, include the JWT token in the request header:

```
Authorization: Bearer <your_token>
```

---

## Common Prisma Commands

```bash
# generate client after schema changes
npx prisma generate

# create and apply a new migration
npx prisma migrate dev --name <name>

# apply migrations in production (no prompt)
npx prisma migrate deploy

# reset database (drops all data)
npx prisma migrate reset

# open prisma studio
npx prisma studio
```
