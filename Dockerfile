FROM node:22-alpine AS deps

WORKDIR /app/web

COPY web/package.json web/package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder

WORKDIR /app

COPY . .
COPY --from=deps /app/web/node_modules ./web/node_modules

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app/web
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy everything from builder to keep all markdown folders
COPY --from=builder --chown=nextjs:nodejs /app /app

# Clean up source files and non-production node_modules to optimize size
RUN rm -rf /app/web/node_modules /app/web/app /app/web/components /app/web/lib /app/web/.next

# Copy standalone build back
COPY --from=builder --chown=nextjs:nodejs /app/web/.next/standalone /app/web/
COPY --from=builder --chown=nextjs:nodejs /app/web/.next/static /app/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/web/public /app/web/public

USER nextjs

WORKDIR /app/web

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health | grep -q '"ok":true' || exit 1

# Run the standalone server directly via node, saving memory and avoiding npm overhead
CMD ["node", "server.js"]


