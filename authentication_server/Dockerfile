FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

RUN npx prisma generate

EXPOSE 5001

CMD [ "yarn", "start"]