FROM node:18.19.1-alpine

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./
# COPY node_modules ./  
RUN npm ci

COPY --chown=node:node . .
CMD npx prisma generate \
    && npm run build \
    && node dist/main
