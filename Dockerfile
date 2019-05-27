FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY ./build /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d

EXPOSE 80
