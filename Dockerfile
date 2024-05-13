
FROM node:18

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --production

COPY . .

EXPOSE 3333

CMD ["pnpm", "dev"]
