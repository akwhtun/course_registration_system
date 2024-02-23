<?php

namespace backend\controllers;

use backend\config\Database;
use PDO;

class CourseController
{
    private $conn;
    public function __construct(Database $db)
    {
        $this->conn = $db->connect();
    }
    public function get_courses_list()
    {
        try {
            $query = "SELECT * FROM courses";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
            http_response_code(200);
            echo json_encode($courses);
        } catch (\Exception $e) {
            return json_encode(['error' => $e->getMessage()]);
        }
    }

    public function create_course()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $requiredFileds = ['course_code', 'course_name', 'course_year', 'semester'];
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
            $query = "INSERT INTO courses (course_name, course_code, course_year, semester ) VALUES (:course_name, :course_code, :course_year, :semester)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':course_name', $data['course_name']);
            $stmt->bindValue(':course_code', $data['course_code']);
            $stmt->bindValue(':course_year', $data['course_year']);
            $stmt->bindValue(':semester', $data['semester']);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'course registered successfully']);
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


    public function get_course($id)
    {
        try {
            $query = "SELECT * FROM courses WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':id', $id);
            $stmt->execute();

            $course = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($course) {
                http_response_code(200);
                echo json_encode($course);
            } else {
                echo json_encode(['error' => 'Course not found']);
            }
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function update_course($id)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $requiredFileds = ['course_code', 'course_name', 'course_year', 'semester'];
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
        $course_code = $data['course_code'];
        $course_name = $data['course_name'];
        $course_year = $data['course_year'];
        $semester = $data['semester'];

        try {
            $query = "UPDATE courses SET course_code = :course_code ,course_name = :course_name, course_year =:course_year, semester=:semester WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':course_code', $course_code);
            $stmt->bindValue(':course_name', $course_name);
            $stmt->bindValue(':course_year', $course_year);
            $stmt->bindValue(':semester', $semester);
            $stmt->bindValue(':id', $id);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Course updated successfully']);
            } else {
                http_response_code(202);
                echo json_encode(['error' => 'No changes were made']);
            }
        } catch (\Exception $e) {
            http_response_code(202);
            echo json_encode(['error' => 'Update Fail,Try with another unique value!']);
        }
    }


    public function delete_course($id)
    {
        try {
            $query = "DELETE FROM courses WHERE id = :id";
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
