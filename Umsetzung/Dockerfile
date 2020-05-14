FROM httpd:2.4.43-alpine

RUN apk update
RUN apk upgrade -q

COPY . /usr/local/apache2/htdocs/

EXPOSE 80