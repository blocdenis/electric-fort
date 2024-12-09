FROM node

WORKDIR /frontend

COPY ./package.json ./package-lock.json /frontend/ 

RUN npm install

RUN npm run build

COPY . .

CMD [ "npm", "run", "dev" ]
