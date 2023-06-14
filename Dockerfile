FROM node:19 AS build
WORKDIR /srv
COPY ./server/package.json .
RUN yarn install
COPY ./server/dist .

FROM node:19-alpine
COPY --from=build /srv .
EXPOSE 4000
CMD ["node", "index.js"]
