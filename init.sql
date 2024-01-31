-- Create a user and set password
CREATE USER 'productsrestapi'@'%' IDENTIFIED BY 'KBk9CuNj4vK4bPUULlqemF';

-- Grant privileges to the user for the specified database
GRANT ALL PRIVILEGES ON productsrestapi.* TO 'productsrestapi'@'%';

-- Flush privileges to apply the changes
FLUSH PRIVILEGES;

-- Create the database and switch to it
CREATE DATABASE IF NOT EXISTS productsrestapi;
USE productsrestapi;

-- Load data from products.sql
source /docker-entrypoint-initdb.d/products.sql;