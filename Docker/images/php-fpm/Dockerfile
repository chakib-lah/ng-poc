FROM php:8.1-fpm

LABEL maintainer='Chakib LAHNAKI <chakib.lahnaki@gmail.com>'

RUN apt-get update && apt-get install -y \
    curl \
    openssl \
    unzip \
    make \
    mod_ssl \
    openssl \
    procps \
    sudo \
    unzip \
    vim \
    yum-utils \
    zlib \
    libpng \
    libpng-devel \
    zip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg && \
        docker-php-ext-install gd \
    && docker-php-ext-configure opcache --enable-opcache &&\
        docker-php-ext-install opcache

# install xdebug
RUN pecl install xdebug \
        && docker-php-ext-enable xdebug

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
&& composer --version


WORKDIR /var/www/html/

EXPOSE 9003