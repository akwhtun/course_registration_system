<?php

namespace backend\controllers;

use backend\config\Database;
use PDO;

class PrequisiteController
{
    private $conn;
    public function __construct(Database $db)
    {
        $this->conn = $db->connect();
    }
    public function get_prequisites_list()
    {
        try {
            $query = "SELECT * FROM prequisites";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
            http_response_code(200);
            echo json_encode($courses);
        } catch (\Exception $e) {
            return json_encode(['error' => $e->getMessage()]);
        }
    }

    public function get_prequisite($id)
    {
        try {
            $query = "SELECT * FROM prequisites WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':id', $id);
            $stmt->execute();

            $course = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($course) {
                http_response_code(200);
                echo json_encode($course);
            } else {
                echo json_encode(['error' => 'Prequisite Course not found']);
            }
        } catch (\Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    public function create_prequisite()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $requiredFileds = ['course', 'prequisite_course'];
        $missingFields = [];

        foreach ($requiredFileds as $field) {
            if (empty($data[$field])) {
                $missingFields[] = ucfirst($field);
            }
        }

        if (!empty($missingFields)) {
            $errorMessage = implode(' and ', $missingFields) . ' field' . (count($missingFields) > 1 ? 's' : '') . ' ' . (count($missingFields) > 1 ? 'are' : 'is') . ' required';
            http_response_code(202);
            echo json_encode(['error' => $errorMessage]);
            exit;
        }

        try {
            $query = "INSERT INTO prequisites (course, prequisite_course ) VALUES (:course, :prequisite_course)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':course', $data['course']);
            $stmt->bindValue(':prequisite_course', $data['prequisite_course']);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Prequisite course registered successfully']);
            } else {
                echo json_encode(['error' => 'Failed to register course']);
            }
        } catch (\PDOException $e) {
            $errorMessage = '';

            switch ($e->errorInfo[1]) {
                case 1062: // Duplicate entry error code
                    $uniqueField = $this->getUniqueField($e->getMessage()); // Get the unique field from the error message
                    if ($uniqueField) {
                        $errorMessage = ucfirst($uniqueField) . ' "' . $data[$uniqueField] . '" ' . ' already taken, try with another ' . $uniqueField;
                    } else {
                        $errorMessage = 'Unique field already taken, try with another value';
                    }
                    break;
                default:
                    $errorMessage = $e->getMessage();
                    break;
            }

            http_response_code(208);

            echo json_encode(['error' => $errorMessage]);
        }
    }

    private function getUniqueField($errorMessage)
    {
        if (strpos($errorMessage, 'PRIMARY') !== false) {
            return 'id';
        } else {
            preg_match("/for key '(.+?)'/", $errorMessage, $matches);
            return isset($matches[1]) ? $matches[1] : null;
        }
    }


    public function update_prequisite($id)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $requiredFileds = ['course','prequisite_course'];
        $missingFields = [];

        foreach ($requiredFileds as $field) {
            if (empty($data[$field])) {
                $missingFields[] = ucfirst($field);
            }
        }

        if (!empty($missingFields)) {
            $errorMessage = implode(' and ', $missingFields) . ' field' . (count($missingFields) > 1 ? 's' : '') . ' ' . (count($missingFields) > 1 ? 'are' : 'is') . ' required';
            http_response_code(202);
            echo json_encode(['error' => $errorMessage]);
            exit;
        }
        $id = $id;
        $course = $data['course'];
        $prequisite_course = $data['prequisite_course'];

        try {
            $query = "UPDATE prequisites SET course = :course ,prequisite_course = :prequisite_course WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':course', $course);
            $stmt->bindValue(':prequisite_course', $prequisite_course);
            $stmt->bindValue(':id', $id);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Prequisite updated successfully']);
            } else {
                http_response_code(202);
                echo json_encode(['error' => 'No changes were made']);
            }
        } catch (\Exception $e) {
            http_response_code(202);
            echo json_encode(['error' => 'Update Fail,Try with another unique value!']);
        }
    }


    public function delete_prequisite($id)
    {
        try {
            $query = "DELETE FROM prequisites WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':id', $id);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Course deleted successfully']);
            } else {
                echo json_encode(['error' => 'Failed to delete course']);
            }
        } catch (\Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}
