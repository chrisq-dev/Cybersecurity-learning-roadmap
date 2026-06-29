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

# Copy the standalone server and only the content needed at runtime.
COPY --from=builder --chown=nextjs:nodejs /app/web/.next/standalone /app/web/
COPY --from=builder --chown=nextjs:nodejs /app/web/.next/static /app/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/web/public /app/web/public

COPY --from=builder --chown=nextjs:nodejs /app/INICIO-AQUI.md /app/
COPY --from=builder --chown=nextjs:nodejs /app/ai-security /app/ai-security
COPY --from=builder --chown=nextjs:nodejs /app/api-security /app/api-security
COPY --from=builder --chown=nextjs:nodejs /app/appsec-devsecops /app/appsec-devsecops
COPY --from=builder --chown=nextjs:nodejs /app/blue-team /app/blue-team
COPY --from=builder --chown=nextjs:nodejs /app/business-continuity /app/business-continuity
COPY --from=builder --chown=nextjs:nodejs /app/cloud-security /app/cloud-security
COPY --from=builder --chown=nextjs:nodejs /app/containers-kubernetes /app/containers-kubernetes
COPY --from=builder --chown=nextjs:nodejs /app/cripto /app/cripto
COPY --from=builder --chown=nextjs:nodejs /app/cultura-geek /app/cultura-geek
COPY --from=builder --chown=nextjs:nodejs /app/database-security /app/database-security
COPY --from=builder --chown=nextjs:nodejs /app/email-security /app/email-security
COPY --from=builder --chown=nextjs:nodejs /app/empleabilidad /app/empleabilidad
COPY --from=builder --chown=nextjs:nodejs /app/endpoint-security /app/endpoint-security
COPY --from=builder --chown=nextjs:nodejs /app/forense /app/forense
COPY --from=builder --chown=nextjs:nodejs /app/fundamentos /app/fundamentos
COPY --from=builder --chown=nextjs:nodejs /app/glosario /app/glosario
COPY --from=builder --chown=nextjs:nodejs /app/grc /app/grc
COPY --from=builder --chown=nextjs:nodejs /app/identity-access /app/identity-access
COPY --from=builder --chown=nextjs:nodejs /app/iot-ot-security /app/iot-ot-security
COPY --from=builder --chown=nextjs:nodejs /app/linux /app/linux
COPY --from=builder --chown=nextjs:nodejs /app/malware-basico /app/malware-basico
COPY --from=builder --chown=nextjs:nodejs /app/mobile-security /app/mobile-security
COPY --from=builder --chown=nextjs:nodejs /app/network-security /app/network-security
COPY --from=builder --chown=nextjs:nodejs /app/osint-cti /app/osint-cti
COPY --from=builder --chown=nextjs:nodejs /app/playbooks /app/playbooks
COPY --from=builder --chown=nextjs:nodejs /app/privacy /app/privacy
COPY --from=builder --chown=nextjs:nodejs /app/programacion /app/programacion
COPY --from=builder --chown=nextjs:nodejs /app/recursos /app/recursos
COPY --from=builder --chown=nextjs:nodejs /app/red-team /app/red-team
COPY --from=builder --chown=nextjs:nodejs /app/redes-cisco /app/redes-cisco
COPY --from=builder --chown=nextjs:nodejs /app/security-architecture /app/security-architecture
COPY --from=builder --chown=nextjs:nodejs /app/security-teams /app/security-teams
COPY --from=builder --chown=nextjs:nodejs /app/seguridad-personal /app/seguridad-personal
COPY --from=builder --chown=nextjs:nodejs /app/social-engineering /app/social-engineering
COPY --from=builder --chown=nextjs:nodejs /app/vulnerability-management /app/vulnerability-management
COPY --from=builder --chown=nextjs:nodejs /app/web-owasp /app/web-owasp
COPY --from=builder --chown=nextjs:nodejs /app/windows-ad /app/windows-ad
COPY --from=builder --chown=nextjs:nodejs /app/wireless-security /app/wireless-security

USER nextjs

WORKDIR /app/web

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health | grep -q '"ok":true' || exit 1

# Run the standalone server directly via node, saving memory and avoiding npm overhead
CMD ["node", "server.js"]

