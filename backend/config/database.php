<?php

namespace backend\config;


use PDO;
use PDOException;

class Database
{
    private $host = 'localhost';
    private $dbname = 'course_registration_system';
    private $username = 'root';
    private $password = '';

    private $pdo;

    // Connect to the database
    public function connect()
    {
        try {
            $this->pdo = new PDO("mysql:host=$this->host;dbname=$this->dbname;charset=utf8mb4", $this->username, $this->password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            return $this->pdo;
            echo "Connected successfully";
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    // Disconnect from the database
    public function disconnect()
    {
        $this->pdo = null;
        echo "Disconnected successfully";
    }
}