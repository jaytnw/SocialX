FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

RUN npm run build

RUN npx prisma generate

# RUN npx prisma migrate dev -n init

EXPOSE 3000
EXPOSE 5432

CMD [ "npm", "run" , "start"]