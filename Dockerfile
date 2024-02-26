# =================== Start of BUILD ====================
FROM node:13-alpine as build
# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

RUN apk add --no-cache git

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN yarn add puppeteer@1.17.0

RUN npm install
# Copy everything from build context directory except .dockerignore files/directories
COPY . /app
# Compile
RUN npm run build
# =================== End of BUILD ====================


# =================== Start of DEPS ====================
FROM node:10.15.3-alpine as deps

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

RUN apk add --no-cache git
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN yarn add puppeteer@1.19.0

# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./

# Install only runtime packages (This will ensure minimal docker image size)
RUN npm install --production
# =================== End of DEPS ====================


# =================== Start of MAIN ====================
FROM node:10.15.3-alpine

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

RUN apk add --no-cache git
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV NODE_ENV=production
RUN yarn add puppeteer@1.19.0

# Create app directory
RUN npm config set unsafe-perm true
RUN npm install --production --global pm2@latest
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules/
COPY --from=build /app/dist ./dist/
EXPOSE 80
# Start process with PM2 for better process management 
CMD pm2 start ./dist/server.js -i 0 --max-memory-restart 1G --no-daemon --kill-timeout 10000
# =================== End of MAIN ====================