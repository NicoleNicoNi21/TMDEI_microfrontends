FROM node:16.16.0 as build-stage
ARG MICROFRONTEND

WORKDIR /app
COPY package*.json .
RUN npm install

COPY . .
RUN npm run build:${MICROFRONTEND}

FROM nginx:alpine
ARG MICROFRONTEND

COPY --from=build-stage /app/dist/${MICROFRONTEND} /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]