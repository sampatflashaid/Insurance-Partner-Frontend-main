# build environment
FROM node:20.10.0-alpine as vite-build
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

# server environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 9029
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=vite-build /app/dist /usr/share/nginx/html
EXPOSE 9029
CMD ["nginx", "-g", "daemon off;"]
