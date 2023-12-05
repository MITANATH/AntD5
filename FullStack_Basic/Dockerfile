# Stage 1: Build the UI (Frontend)
FROM node:16.7-alpine AS ui-build
WORKDIR /usr/src/app/client
COPY client/ ./
RUN npm install && npm run build

# Stage 2: Build the Server (Backend)
FROM node:16.7-alpine
WORKDIR /usr/src/app/server
COPY --from=ui-build /usr/src/app/client/build ./client/build
COPY server/ ./
RUN npm ci --only=production
EXPOSE 8000
CMD ["node", "index.js"]



