# Stage 1: Build
FROM node:22-bullseye-slim AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# Copy source
COPY . .

# Build the app (standalone output)
RUN npm run build

# Stage 2: Production
FROM node:22-bullseye-slim AS runner
WORKDIR /app

# Copy standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 80

# Start the app
CMD ["node", "server.js"]
