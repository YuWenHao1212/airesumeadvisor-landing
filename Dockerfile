FROM node:22-alpine AS build
WORKDIR /app
# package-lock resolves @emmetio/css-parser via git+ssh; rewrite to anonymous https
RUN apk add --no-cache git \
    && git config --global url."https://github.com/".insteadOf "ssh://git@github.com/" \
    && git config --global url."https://github.com/".insteadOf "git@github.com:"
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx astro build

FROM node:22-alpine
WORKDIR /app
RUN npm i -g serve@14
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["serve", "dist", "-l", "8080"]
