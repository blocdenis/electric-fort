FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./ 

RUN npm install

RUN npm run build

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app . 

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "start"]
