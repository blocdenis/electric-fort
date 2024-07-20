FROM node

WORKDIR /frontend

COPY ./package.json ./package-lock.json /frontend/ 

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
