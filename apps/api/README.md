# PatchUp API

Express + TypeScript backend for PatchUp.

## Run locally

```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

## Environment variables

- `PORT`: API port, defaults to `4000`
- `NODE_ENV`: runtime environment
- `CLIENT_URL`: browser CORS origin for optional web tooling; Expo native apps do not depend on it
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: signing secret for JWTs
- `JWT_EXPIRES_IN`: token lifetime, for example `7d`

## Key modules

- `src/models`: Mongoose schemas
- `src/services`: business logic
- `src/controllers`: HTTP handlers
- `src/routes`: route wiring
- `src/scripts/seed.ts`: sample data loader
