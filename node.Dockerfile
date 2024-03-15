FROM node:21.7.1-alpine3.19

WORKDIR /app

COPY app/package.json app/pnpm-lock.yaml ./

ENV NOD_ENV=development

RUN npm install -g pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

ENV NUXT_PORT=3000
ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0
ENV NUXT_HOST=0.0.0.0

CMD pnpm run dev
