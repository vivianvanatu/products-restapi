-- Create a user and set password
CREATE USER 'products-restapi'@'%' IDENTIFIED BY 'KBk9CuNj4vK4bPUULlqemF';

-- Grant privileges to the user for the specified database
GRANT ALL PRIVILEGES ON products-restapi.* TO 'products-restapi'@'%';

-- Flush privileges to apply the changes
FLUSH PRIVILEGES;

-- Create the database and switch to it
CREATE DATABASE IF NOT EXISTS products-restapi;
USE products-restapi;

-- Load data from products.sql
source /docker-entrypoint-initdb.d/products.sql;