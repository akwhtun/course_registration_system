<?php

namespace backend\controllers;

use backend\config\Database;
use PDO;

class DateController
{
    private $conn;
    public function __construct(Database $db)
    {
        $this->conn = $db->connect();
    }
    public function get_allow_date()
    {
        try {
            $query = "SELECT * FROM dates;
            ";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $date = $stmt->fetch(PDO::FETCH_ASSOC);
            http_response_code(200);
            echo json_encode($date);
        } catch (\Exception $e) {
            return json_encode(['error' => $e->getMessage()]);
        }
    }

    public function update_date()
    {

    
        $data = json_decode(file_get_contents('php://input'), true);

        $start_date = $data['start_date'];
        $end_date = $data['end_date'];
       

      
        try {
            $query = "UPDATE dates SET start_date = :start_date ,end_date = :end_date WHERE id = 1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':start_date', $start_date);
            $stmt->bindValue(':end_date', $end_date);
            $stmt->execute();

         
                http_response_code(200);
                echo json_encode(['message' => 'Date updated successfully']);
           
        } catch (\Exception $e) {
            http_response_code(202);
            echo json_encode(['error' => 'Update Fail,Try with another unique value!']);
        }
    }


  
}
