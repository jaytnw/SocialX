FROM node:22

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

RUN npx prisma generate

EXPOSE 5002


CMD [ "yarn", "start"]