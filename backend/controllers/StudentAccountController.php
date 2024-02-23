<?php

namespace backend\controllers;

use backend\config\Database;
use PDO;

class StudentAccountController
{
    private $conn;

    public function __construct(Database $db)
    {
        $this->conn = $db->connect();
    }

    // get students account list
    public function get_accounts_list()
    {
        try {
            $query = "SELECT users.*,students.major,students.student_year FROM users,students WHERE users.id=students.user_id";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
            http_response_code(200);
            echo json_encode($students);
        } catch (\Exception $e) {
            // http_response_code(500); // Internal Server Error
            return json_encode(['error' => $e->getMessage()]);
        }
    }

    //register student account
    public function register_student_account()
    {
        // Decode JSON data into an associative array
        $data = json_decode(file_get_contents('php://input'), true);


        $requiredFields = ['id', 'name', 'email', 'phone', 'gender', 'major', 'year'];
        $missingFields = [];

        foreach ($requiredFields as $field) {
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
            $query1 = "INSERT INTO users (id, role_id, name, email, password, phone, gender, profile, status, suspended) 
                    VALUES (:id,:role_id, :name, :email, :password, :phone,:gender, :profile, :status, :suspended)";

            $stmt1 = $this->conn->prepare($query1);

            $stmt1->bindValue(':id', $data['id']);
            $stmt1->bindValue(':role_id', 3);
            $stmt1->bindValue(':name', $data['name']);
            $stmt1->bindValue(':email', $data['email']);
            $stmt1->bindValue(':password', '123');
            $stmt1->bindValue(':phone', $data['phone']);
            $stmt1->bindValue(':gender', $data['gender']);
            $stmt1->bindValue(':profile', 'null');
            $stmt1->bindValue(':status', 0);
            $stmt1->bindValue(':suspended', 0);

            $stmt1->execute();

            $query2 = "INSERT INTO students (user_id, major, student_year) VALUES (:user_id, :major, :student_year)";

            $stmt2 = $this->conn->prepare($query2);
            $stmt2->bindValue(':user_id', $data['id']);
            $stmt2->bindValue(':major', $data['major']);
            $stmt2->bindValue(':student_year', $data['year']);

            $stmt2->execute();

            if ($stmt1->rowCount() > 0 && $stmt2->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Student registered successfully']);
            } else {
                echo json_encode(['error' => 'Failed to register student']);
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

    //get student with id
    public function get_student($id)
    {
        try {
            $query = "SELECT users.*,students.major,students.student_year FROM users,students WHERE users.id = :id and students.user_id = users.id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':id', $id);
            $stmt->execute();

            $student = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($student) {
                http_response_code(200);
                echo json_encode($student);
            } else {
                echo json_encode(['error' => 'Student not found']);
            }
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    //update student
    public function update_student($id)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        // Check if required fields are present
        $requiredFields = ['name', 'email', 'phone', 'gender', 'major', 'student_year'];
        $missingFields = [];

        foreach ($requiredFields as $field) {
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

        // Assign data to variables
        $id = $data['id'];
        $name = $data['name'];
        $email = $data['email'];
        $phone = $data['phone'];
        $gender = $data['gender'];
        $major = $data['major'];
        $student_year = $data['student_year'];

        try {
            // Update user data
            $query1 = "UPDATE users SET 
    name = :name,
    email = :email,
    phone = :phone,
    gender = :gender
    WHERE
    id = :id";
            $stmt1 = $this->conn->prepare($query1);
            $stmt1->bindValue(':id', $id);
            $stmt1->bindValue(':name', $name);
            $stmt1->bindValue(':email', $email);
            $stmt1->bindValue(':phone', $phone);
            $stmt1->bindValue(':gender', $gender);
            $stmt1->execute();

            // Check if any changes were made to user data
            $userChanges = $stmt1->rowCount() > 0;

            // Update student data
            $query2 = "UPDATE students
    SET major = :major,
    student_year = :student_year
    WHERE user_id = :id";
            $stmt2 = $this->conn->prepare($query2);
            $stmt2->bindValue(':major', $major);
            $stmt2->bindValue(':student_year', $student_year);
            $stmt2->bindValue(':id', $id);
            $stmt2->execute();

            // Check if any changes were made to student data
            $studentChanges = $stmt2->rowCount() > 0;

            // Check if both queries resulted in changes
            if ($userChanges || $studentChanges) {
                http_response_code(200);
                echo json_encode(['message' => 'Student updated successfully']);
            } else {
                http_response_code(202);
                echo json_encode(['error' => 'No changes were made']);
            }
        } catch (\Exception $e) {
            http_response_code(202);
            echo json_encode(['error' => 'Update Fail,Try with another unique value!']);
        }
    }
}
