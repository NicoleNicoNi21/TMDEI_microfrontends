FROM node:16.16.0 as build-stage

WORKDIR /app
COPY package*.json .
RUN npm install

COPY . .
COPY docker/mf.manifest.json projects/shell/src/assets
RUN npm run build:shell

FROM nginx:alpine

COPY --from=build-stage /app/dist/shell /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]