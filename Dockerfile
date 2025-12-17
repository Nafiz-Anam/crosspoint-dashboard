FROM node:20.16.0-alpine

# Install pnpm and timezone data
RUN npm install -g pnpm
RUN apk add --no-cache tzdata

# Set timezone to Italian timezone
ENV TZ=Europe/Rome
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
ENV CI=true
RUN pnpm install

# Copy source code
COPY . .

# Copy environment file if it exists (for local development)
# Next.js will automatically load .env.production during build
# If .env.production doesn't exist, environment variables can be passed via docker-compose

# Generate the missing icon CSS files
RUN pnpm run build:icons

# Build the app (Next.js will use .env.production if available)
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]