FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY tsconfig.base.json ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/shared/package.json ./packages/shared/package.json
RUN npm install
COPY . .
RUN npm run build --workspace @patchup/api

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 4000
CMD ["npm", "run", "start", "--workspace", "@patchup/api"]
