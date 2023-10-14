FROM node:16.16.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve the Angular app using Nginx
FROM nginx:1.21-alpine
COPY --from=build /app/dist/dynamic-forms /usr/share/nginx/html
