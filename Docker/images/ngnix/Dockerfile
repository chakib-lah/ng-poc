FROM nginx

LABEL maintainer='Chakib LAHNAKI <chakib.lahnaki@gmail.com>'

ADD nginx.conf /etc/nginx/
ADD symfony.conf /etc/nginx/sites-available/


RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

CMD ["nginx"]

EXPOSE 80
EXPOSE 443