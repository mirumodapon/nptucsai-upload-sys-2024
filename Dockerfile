FROM node:22-slim AS base
RUN corepack enable

WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

ENV PORT=3000
EXPOSE 3000
ENTRYPOINT pnpm run start
