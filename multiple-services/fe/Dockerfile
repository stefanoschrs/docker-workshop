# syntax=docker/dockerfile:1.0.0-experimental

FROM node:14-alpine AS builderFE

ARG API_URL_FOO
ARG API_URL_BAR

ENV NODE_ENV=production
ENV REACT_APP_API_URL_FOO=${API_URL_FOO}
ENV REACT_APP_API_URL_BAR=${API_URL_BAR}

WORKDIR /build

COPY . .

### Install dependencies from private repositories
# RUN apk add --no-cache openssh-client git
# RUN mkdir -p -m 0700 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
# RUN --mount=type=ssh,id=github yarn install --frozen-lockfile --network-timeout 1000000
RUN yarn install --frozen-lockfile --network-timeout 1000000

RUN yarn build

FROM node:14-alpine

WORKDIR /

RUN npm i -g serve

COPY --from=builderFE /build/dist .

EXPOSE 3000

ENTRYPOINT ["serve"]
