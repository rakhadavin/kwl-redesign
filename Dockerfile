#FROM node:20-alpine
#WORKDIR /app
#COPY package*.json ./
#RUN npm ci --prefer-offline --no-audit
#COPY . .
#RUN npm run build
#EXPOSE 3000
#CMD [ "npm", "run", "start"] 

# ---- Stage 1: Builder ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --prefer-offline --no-audit

COPY . .

RUN npm run build


# ---- Stage 2: Runner ----
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=192"

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Non-root
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

EXPOSE 3000

CMD ["node", "server.js"]