# PatchUp

PatchUp is a production-structured MVP monorepo for connecting customers with local providers who can help with minor household, tech, and car repair needs.
new line
## Workspace layout

- `apps/mobile`: Expo React Native mobile app for iOS and Android
- `apps/web-archive`: archived Next.js frontend
- `apps/api`: Express + MongoDB backend
- `packages/shared`: shared TypeScript types, enums, and constants
- `docs`: supporting project notes

## Quick start

1. Install dependencies from the repo root:

```bash
npm install
```

2. Copy environment templates:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/mobile/.env.example apps/mobile/.env
```

3. Start MongoDB locally or with Docker:

```bash
docker compose up -d mongodb
```

4. Seed sample data:

```bash
npm run seed
```

5. Start both apps:

```bash
npm run dev
npm run mobile
```

Backend: `http://localhost:4000/api`
Expo mobile app: open the QR code in Expo Go or launch an iOS/Android simulator

## Sample accounts

After seeding:

- Customer: `sarah.customer@patchup.dev` / `Password123!`
- Provider: `mike.provider@patchup.dev` / `Password123!`
- Admin: `admin@patchup.dev` / `Password123!`

## Scripts

- `npm run dev`: run shared package watch + API
- `npm run mobile`: start Expo development server
- `npm run ios`: open the app in iOS simulator
- `npm run android`: open the app in Android emulator
- `npm run build`: build shared + API and export the mobile app bundles
- `npm run lint`: lint all workspaces
- `npm run format`: format the repo
- `npm run seed`: load sample users, profiles, and service requests

The `ios` and `android` scripts require a local simulator or emulator setup, or a connected device via Expo tooling.

## Documentation

- [Architecture](./docs/architecture.md)
- [API Overview](./docs/api-overview.md)

## MVP scope

Implemented:

- JWT auth for customer/provider/admin roles
- Customer and provider profile management
- Service request creation and provider job flow
- Mobile-first dashboard flows for both user roles
- Messaging data foundation and placeholder UI
- Shared types/constants package

Planned next:

- Real-time messaging
- Payments and payouts
- file uploads
- provider verification and reviews
- full admin console

## Mobile API URL note

When running on a physical device, `localhost` will point to the device itself, not your computer. Set `EXPO_PUBLIC_API_URL` in `apps/mobile/.env` to your computer's LAN IP, for example:

```bash
EXPO_PUBLIC_API_URL=http://192.168.1.24:4000/api
```

## Environment variables

Backend in [apps/api/.env.example](/Users/gergeswahba/Desktop/github/patch_up/apps/api/.env.example):

- `PORT`
- `NODE_ENV`
- `CLIENT_URL`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

Mobile in [apps/mobile/.env.example](/Users/gergeswahba/Desktop/github/patch_up/apps/mobile/.env.example):

- `EXPO_PUBLIC_API_URL`
