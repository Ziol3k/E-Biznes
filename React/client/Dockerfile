FROM node:22.14.0-slim
WORKDIR /app
COPY . .
RUN npm install && \
    npm run build && \
    npm install -g serve
CMD ["serve", "-s", "build"]
EXPOSE 3000
