<?php

namespace backend\controllers;

use backend\config\Database;
use PDO;

class StudentGradeController
{
    private $conn;

    public function __construct(Database $db)
    {
        $this->conn = $db->connect();
    }

    //check grade
    function checkGrade($marks)
    {
        $letter_grade = null;
        $grade_score = null;
        $remark = null;

        if ($marks >= 90 && $marks <= 100) {
            $letter_grade = "A+";
            $grade_score = 4.0;
            $remark = "Pass";
        } else if ($marks >= 80 && $marks <= 89) {
            $letter_grade = "A";
            $grade_score = 4.0;
            $remark = "Pass";
        } else if ($marks >= 75 && $marks <= 79) {
            $letter_grade = "A-";
            $grade_score = 3.67;
            $remark = "Pass";
        } else if ($marks >= 70 && $marks <= 74) {
            $letter_grade = "B+";
            $grade_score = 3.33;
            $remark = "Pass";
        } else if ($marks >= 65 && $marks <= 69) {
            $letter_grade = "B";
            $grade_score = 3.0;
            $remark = "Pass";
        } else if ($marks >= 60 && $marks <= 64) {
            $letter_grade = "B-";
            $grade_score = 2.67;
            $remark = "Pass";
        } else if ($marks >= 55 && $marks <= 59) {
            $letter_grade = "C+";
            $grade_score = 2.33;
            $remark = "Pass";
        } else if ($marks >= 50 && $marks <= 54) {
            $letter_grade = "C";
            $grade_score = 2.0;
            $remark = "Pass";
        } else if ($marks >= 40 && $marks <= 49) {
            $letter_grade = "D";
            $grade_score = 1.0;
            $remark = "Fail";
        } else if ($marks < 40) {
            $letter_grade = "F/Abs/l";
            $grade_score = 0.0;
            $remark = "Fail";
        }
        return ['letter_grade' => $letter_grade, 'grade_score' => $grade_score, 'remark' => $remark];
    }
    public function get_student_data($id, $year)
    {
        try {

            $query = "SELECT courses.*,users.id as user_id,users.name as user_name,students.student_year FROM courses,users,students WHERE students.id = :id and users.id = students.user_id and courses.course_year = :course_year";

            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':id', $id);
            $stmt->bindValue(':course_year', $year);
            $stmt->execute();

            $student = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($student) {
                http_response_code(200);
                echo json_encode($student);
            } else {
                echo json_encode(['error' => 'No records found for the course']);
            }
        } catch (\Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    //register student grade
    public function register_student_grade($id)
    {
        // Decode JSON data into an associative array
        $data = json_decode(file_get_contents('php://input'), true);


        $requiredFields = ['course_id', 'marks'];
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
        if ($data["marks"] < 0 ||  $data["marks"] > 100) {
            $errorMessage = "Mark is not valid!";
            http_response_code(202);
            echo json_encode(['error' => $errorMessage]);
            exit;
        }


        $marks = $data["marks"];

        $gradesData = $this->checkGrade($marks);
        $letter_grade = $gradesData['letter_grade'];
        $grade_score = $gradesData['grade_score'];
        $remark = $gradesData['remark'];

        try {
            $query1 = "INSERT INTO grades ( student_id, course_id, marks, letter_grade, grade_score, remark) 
                    VALUES (:student_id,:course_id, :marks, :letter_grade, :grade_score, :remark)";

            $stmt1 = $this->conn->prepare($query1);

            $stmt1->bindValue(':student_id', $id);
            $stmt1->bindValue(':course_id', intval($data['course_id']));
            $stmt1->bindValue(':marks', $data['marks']);
            $stmt1->bindValue(':letter_grade', $letter_grade);
            $stmt1->bindValue(':grade_score', $grade_score);
            $stmt1->bindValue(':remark', $remark);

            $stmt1->execute();

            if ($stmt1->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Grade registered successfully']);
            } else {
                http_response_code(202);
                echo json_encode(['error' => 'Failed to register student grade']);
            }
        } catch (\Exception $e) {
            http_response_code(202);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    //get student grade with id
    public function student_grades_list($id)
    {
        try {
            $query = "SELECT users.id as user_id,users.name as user_name, students.major, students.student_year, students.id as student_id, courses.course_name,courses.id as course_id, courses.course_code, grades.*  
          FROM users, students, courses, grades 
          WHERE users.id = :id 
          AND students.user_id = users.id 
          AND students.id = grades.student_id  
          AND courses.id = grades.course_id";

            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':id', $id);
            $stmt->execute();

            $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($students) {
                http_response_code(200);
                echo json_encode($students);
            } else {
                http_response_code(202);
                echo json_encode(['error' => 'No records found for the student ID']);
            }
        } catch (\Exception $e) {
            http_response_code(202);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    //update grade
    public function update_grade($id)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        // Check if required fields are present
        $requiredFields = ['marks'];
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

        if ($data["marks"] < 0 ||  $data["marks"] > 100) {
            $errorMessage = "Mark is not valid!";
            http_response_code(202);
            echo json_encode(['error' => $errorMessage]);
            exit;
        }
        try {
            // Update grade data
            $query = "UPDATE grades SET 
course_id = :course_id,
    marks = :marks,
    letter_grade = :letter_grade,
    grade_score = :grade_score,
    remark = :remark,
    updated_date = NOW()
    WHERE
    id = :id";
            $gradesData = $this->checkGrade($data['marks']);

            $letter_grade = $gradesData['letter_grade'];
            $grade_score = $gradesData['grade_score'];
            $remark = $gradesData['remark'];

            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':course_id', $data['course_id']);
            $stmt->bindValue(':marks', $data['marks']);
            $stmt->bindValue(':letter_grade', $letter_grade);
            $stmt->bindValue(':grade_score', $grade_score);
            $stmt->bindValue(':remark', $remark);
            $stmt->bindValue(':id', $id);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Grade updated successfully']);
            } else {
                http_response_code(202);
                echo json_encode(['error' => 'No changes were made']);
            }
        } catch (\Exception $e) {
            http_response_code(202);
            echo json_encode(['error' => 'Update Fail,Try with another unique value!']);
        }
    }

    //delete grade
    public function delete_grade($id)
    {
        try {
            $query = "DELETE FROM grades WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':id', $id);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Grade deleted successfully']);
            } else {
                http_response_code(202);
                echo json_encode(['error' => 'Failed to grade course']);
            }
        } catch (\Exception $e) {
            http_response_code(202);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
}