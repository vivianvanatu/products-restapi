FROM php:7.4-apache

# Enable Apache modules and restart Apache
RUN a2enmod rewrite
RUN service apache2 restart

# Copy the PHP application files to the container
COPY . /var/www/html/

# Install necessary PHP extensions or dependencies
# For example, if you use MySQL:
RUN docker-php-ext-install mysqli pdo pdo_mysql
