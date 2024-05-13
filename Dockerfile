
FROM node:18

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN npm install -g husky

RUN pnpm install --production

COPY . .

EXPOSE 3333

CMD ["pnpm", "dev"]
