FROM node:20.16.0-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
ENV CI=true
RUN pnpm install

# Copy source code (including .env.docker)
COPY . .

# Build the app
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]