# API Overview

Base URL: `http://localhost:4000/api`

## Authentication

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

## Users

- `GET /users/profile`
- `PATCH /users/profile`

## Service requests

- `POST /requests`
- `GET /requests/mine`
- `GET /requests/provider/feed`
- `GET /requests/:id`
- `PATCH /requests/:id/respond`
- `PATCH /requests/:id/status`

## Conversations

- `GET /conversations`
- `POST /conversations`
- `GET /conversations/:id/messages`
- `POST /conversations/:id/messages`

## Health

- `GET /health`
