# PatchUp Architecture

## Monorepo

PatchUp uses npm workspaces to keep the mobile app, backend, and shared contracts aligned while still allowing each app to evolve independently.

## Backend layers

- `routes`: route definitions and middleware composition
- `controllers`: HTTP request handling
- `services`: business rules and orchestration
- `repositories`: Mongoose data access helpers
- `models`: MongoDB schemas
- `middleware`: auth, role guards, validation, error handling
- `utils`: shared backend helpers

## Mobile structure

- `app`: root app composition and providers
- `screens`: customer, provider, auth, and shared screen modules
- `navigation`: role-based React Navigation setup
- `components`: reusable React Native UI primitives
- `services`: API client and secure storage helpers
- `store`: Zustand state
- `types`: mobile-local DTOs and navigation types

## Shared package

The shared package centralizes role values, service categories, request statuses, urgency labels, and API DTO shapes to reduce drift between frontend and backend.
