FROM node:latest


WORKDIR /app

RUN apt-get update && apt-get install -y nginx
RUN apt-get upgrade -y


COPY ./package.json /app/package.json
RUN npm install
RUN npm install npm-install-all -g @angular/cli@8.3.26

COPY . /app
RUN npm install
CMD ng serve --host 0.0.0.0 --disable-host-check

EXPOSE 4200