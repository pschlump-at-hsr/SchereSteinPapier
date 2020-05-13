FROM node:latest


WORKDIR /app

RUN apt-get update && apt-get install -y nginx
RUN apt-get upgrade -y


COPY ./package.json /app/package.json
RUN npm install

COPY . /app
EXPOSE 8080
ENTRYPOINT npm start
