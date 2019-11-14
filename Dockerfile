FROM node:12-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12-alpine
WORKDIR /app
COPY --from=build /app .
RUN ls -lahts
CMD [ "node", "dist/index.js" ]
