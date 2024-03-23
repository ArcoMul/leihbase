FROM node:21.7.1-alpine3.19 AS base

ENV NUXT_PORT=3000
ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0
ENV NUXT_HOST=0.0.0.0

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

FROM base AS dependencies
ENV NODE_ENV=development
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM dependencies AS build
ENV NODE_ENV=production
COPY . .
RUN pnpm run build

FROM base AS prod
ENV NODE_ENV=production
COPY --from=build /app/.output /app/.output
CMD node .output/server/index.mjs

FROM dependencies AS dev
CMD pnpm run dev
