FROM node:22-alpine AS builder
WORKDIR /app
COPY tsconfig.base.json ./tsconfig.base.json
COPY packages/shared ./packages/shared
COPY apps/web-archive ./apps/web-archive
WORKDIR /app/apps/web-archive
RUN npm install
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app /app
WORKDIR /app/apps/web-archive
EXPOSE 3000
CMD ["npm", "run", "start"]
