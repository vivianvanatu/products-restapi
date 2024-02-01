<?php
include_once 'config.php';
class Database extends Config
{
    public $conn;
    public function getConnection()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->dbhost . ";dbname=" . $this->dbname, $this->dbuser, $this->dbpass);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception) {
            error_log("Database connection failed: " . $exception->getMessage() . " Host: " . $this->dbhost . ", User: " . $this->dbuser . ", Database: " . $this->dbname, 0);
            // Output a generic error message to the user
            echo "Database could not be connected. Please try again later.";
        }
        return $this->conn;
    }
}
