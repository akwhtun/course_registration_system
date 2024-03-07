<?php

namespace backend\controllers;

use backend\config\Database;
use PDO;

class CourseRegistrationController
{
    private $conn;
    public function __construct(Database $db)
    {
        $this->conn = $db->connect();
    }
    public function get_student_data($id, $semester)
    {
        try {
            $query = "SELECT users.id,users.name,users.email,users.phone, students.semester,students.student_year, students.major, courses.course_name,courses.course_code,grades.grade_score,grades.remark, prequisites.prequisite_course, prequisites.course 
            FROM users 
            JOIN students ON users.id = students.user_id 
            JOIN courses ON courses.major LIKE CONCAT('%', students.major, '%') AND students.semester = courses.semester 
            LEFT JOIN prequisites ON prequisites.course = courses.course_name 
            LEFT JOIN grades ON grades.student_id = students.id AND grades.course_id = courses.id WHERE users.id = :user_id";

            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':user_id', $id);
            $stmt->execute();
            $registrationData = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $semesterMapping = array(
                'Semester 0' => 'Semester I',
                'Semester I' => 'Semester II',
                'Semester II' => 'Semester III',
                'Semester III' => 'Semester IV',
                'Semester IV' => 'Semester V',
                'Semester V' => 'Semester VI',
                'Semester VI' => 'Semester VII',
                'Semester VII' => 'Semester VIII',
                'Semester VIII' => 'Semester IX',
                'Semester IX' => 'Semester X',
            );

            $currentSemester = 'Semester 0';

            foreach ($registrationData as $data) {
                $currentSemester = $data['semester'];
                break;
            }

            $nextSemester = isset($semesterMapping[$currentSemester]) ? $semesterMapping[$currentSemester] : null;


            $query1 = "SELECT users.id,users.name,users.email,users.phone,students.semester, students.major,students.student_year, courses.course_name, courses.course_code,grades.grade_score, grades.remark, prequisites.prequisite_course, prequisites.course 
            FROM users 
            JOIN students ON users.id = students.user_id 
            JOIN courses ON courses.major LIKE CONCAT('%', students.major, '%') AND courses.semester = :semester 
            LEFT JOIN prequisites ON prequisites.course = courses.course_name 
            LEFT JOIN grades ON grades.student_id = students.id AND grades.course_id = courses.id 
            WHERE users.id = :user_id";

            $stmt1 = $this->conn->prepare($query1);
            $stmt1->bindValue(':user_id', $id);
            $stmt1->bindValue(':semester', $nextSemester);

            $stmt1->execute();
            $registrationData1 = $stmt1->fetchAll(PDO::FETCH_ASSOC);

            $query3 = "SELECT * FROM registrations WHERE user_id = :id and semester = :semester";
            $stmt3 = $this->conn->prepare($query3);
            $stmt3->bindValue(':id', $id);
            $stmt3->bindValue(':semester', $semester);
            $stmt3->execute();

            $historyData = $stmt3->fetchAll(PDO::FETCH_ASSOC);


            $combinedData = array(
                'historyData' => $historyData,
                'registrationData' => $registrationData,
                'registrationData1' => $registrationData1
            );

            http_response_code(200);
            echo json_encode($combinedData);
        } catch (\Exception $e) {
            return json_encode(['error' => $e->getMessage()]);
        }
    }

    public function register_course($id, $name, $academic, $year, $semester, $major)
    {
        $data = json_decode(file_get_contents('php://input'), true);


        $randomCode = $this->generateUniqueRandomCode();



        try {
            $query1 = "DELETE FROM registrations WHERE user_id = :id and semester = :semester";
            $stmt1 = $this->conn->prepare($query1);
            $stmt1->bindValue(':id', $id);
            $stmt1->bindValue(':semester', $semester);
            $stmt1->execute();
            if ($stmt1->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Course deleted successfully']);
            } else {
                echo json_encode(['error' => 'Failed to delete course']);
            }

            foreach ($data as $course) {
                $query = "INSERT INTO registrations (cr_code,user_id, student_name,email, phone,course_code, course_name,major, student_year, semester,academic_year, status ) VALUES (:cr_code,:user_id, :student_name,:email,:phone,:course_code, :course_name,:major,:student_year, :semester, :academic_year,:checked_status)";
                $stmt = $this->conn->prepare($query);
                $stmt->bindValue(':cr_code', $randomCode);
                $stmt->bindValue(':user_id', $id);
                $stmt->bindValue(':student_name', $name);
                $stmt->bindValue(':email', $course['email']);
                $stmt->bindValue(':phone', $course['phone']);
                $stmt->bindValue(':course_code', $course['course_code']);
                $stmt->bindValue(':course_name', $course['course_name']);
                $stmt->bindValue(':major', $major);
                $stmt->bindValue(':student_year', $year);
                $stmt->bindValue(':semester', $semester);
                $stmt->bindValue(':academic_year', $academic);
                $stmt->bindValue(':checked_status', 0);
                $stmt->execute();
                if ($stmt->rowCount() > 0) {
                    http_response_code(200);
                    echo json_encode(['message' => 'course registered successfully']);
                } else {
                    http_response_code(202);
                    echo json_encode(['error' => 'Failed to register course']);
                }
            }
        } catch (\Exception $e) {
            http_response_code(202);

            return json_encode(['error' => $e->getMessage()]);
        }
    }

    public function get_registrations_list()
    {
        try {
            $query = "SELECT * FROM registrations GROUP BY cr_code ORDER BY created_date DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $registrations = $stmt->fetchAll(PDO::FETCH_ASSOC);
            http_response_code(200);
            echo json_encode($registrations);
        } catch (\Exception $e) {
            return json_encode(['error' => $e->getMessage()]);
        }
    }

    public function get_student_registration($id)
    {
        try {
            $query = "SELECT * FROM registrations WHERE cr_code = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':id', $id);
            $stmt->execute();

            $registrationData = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($registrationData) {
                http_response_code(200);
                echo json_encode($registrationData);
            } else {
                echo json_encode(['error' => 'registration data not found']);
            }
        } catch (\Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    public function get_registration_history($id, $semester)
    {
        try {
            $query = "SELECT * FROM registrations WHERE user_id = :id and semester = :semester";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':id', $id);
            $stmt->bindValue(':semester', $semester);
            $stmt->execute();

            $historyData = $stmt->fetchAll(PDO::FETCH_ASSOC);


            $query1 = "SELECT users.id,users.name,users.email,users.phone, students.semester,students.student_year, students.major, courses.course_name,courses.course_code,grades.grade_score,grades.remark, prequisites.prequisite_course, prequisites.course 
            FROM users 
            JOIN students ON users.id = students.user_id 
            JOIN courses ON courses.major LIKE CONCAT('%', students.major, '%') AND students.semester = courses.semester 
            LEFT JOIN prequisites ON prequisites.course = courses.course_name 
            LEFT JOIN grades ON grades.student_id = students.id AND grades.course_id = courses.id WHERE users.id = :user_id";

            $stmt1 = $this->conn->prepare($query1);
            $stmt1->bindValue(':user_id', $id);
            $stmt1->execute();
            $registrationData = $stmt1->fetchAll(PDO::FETCH_ASSOC);

            $semesterMapping = array(
                'Semester 0' => 'Semester I',
                'Semester I' => 'Semester II',
                'Semester II' => 'Semester III',
                'Semester III' => 'Semester IV',
                'Semester IV' => 'Semester V',
                'Semester V' => 'Semester VI',
                'Semester VI' => 'Semester VII',
                'Semester VII' => 'Semester VIII',
                'Semester VIII' => 'Semester IX',
                'Semester IX' => 'Semester X',
            );

            $currentSemester = 'Semester 0';


            foreach ($registrationData as $data) {
                $currentSemester = $data['semester'];
                break;
            }

            $nextSemester = isset($semesterMapping[$currentSemester]) ? $semesterMapping[$currentSemester] : null;


            $query2 = "SELECT users.id,users.name,users.email,users.phone,students.semester, students.major,students.student_year, courses.course_name, courses.course_code,grades.grade_score, grades.remark, prequisites.prequisite_course, prequisites.course 
            FROM users 
            JOIN students ON users.id = students.user_id 
            JOIN courses ON courses.major LIKE CONCAT('%', students.major, '%') AND courses.semester = :semester 
            LEFT JOIN prequisites ON prequisites.course = courses.course_name 
            LEFT JOIN grades ON grades.student_id = students.id AND grades.course_id = courses.id 
            WHERE users.id = :user_id";

            $stmt2 = $this->conn->prepare($query2);
            $stmt2->bindValue(':user_id', $id);
            $stmt2->bindValue(':semester', $nextSemester);

            $stmt2->execute();
            $registrationData1 = $stmt2->fetchAll(PDO::FETCH_ASSOC);

            $combinedData = array(
                'historyData' => $historyData,
                'registrationData' => $registrationData,
                'registrationData1' => $registrationData1
            );



            if ($combinedData) {
                http_response_code(200);
                echo json_encode($combinedData);
            } else {
                echo json_encode(['error' => 'registration data not found']);
            }
        } catch (\Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function change_registration_status($id, $status, $semester, $userId)
    {
        try {
            $query = "UPDATE registrations SET status = :status ,updated_date = NOW() WHERE cr_code = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':status', $status);
            $stmt->bindValue(':id', $id);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                http_response_code(200);
                echo json_encode(['message' => 'Registration updated successfully']);
            } else {
                http_response_code(202);
                echo json_encode(['error' => 'No changes were made']);
            }

            if ($status == 1) {
                $nextSemester = null;
                $semesterNum = null;
                $nextYear = null;
                switch ($semester) {
                    case "Semester 0":
                        $semesterNum = 0;
                        $nextSemester = 'Semester I';
                        break;
                    case "Semester I":
                        $semesterNum = 1;
                        $nextSemester = 'Semester II';
                        break;
                    case "Semester II":
                        $semesterNum = 2;
                        $nextSemester = 'Semester III';
                        break;
                    case "Semester III":
                        $semesterNum = 3;
                        $nextSemester = 'Semester IV';
                        break;
                    case "Semester IV":
                        $semesterNum = 4;
                        $nextSemester = 'Semester V';
                        break;
                    case "Semester V":
                        $semesterNum = 5;
                        $nextSemester = 'Semester VI';
                        break;
                    case "Semester VI":
                        $semesterNum = 6;
                        $nextSemester = 'Semester VII';
                        break;
                    case "Semester VII":
                        $semesterNum = 7;
                        $nextSemester = 'Semester VIII';
                        break;
                    case "Semester VIII":
                        $semesterNum = 8;
                        $nextSemester = 'Semester XI';
                        break;
                    case "Semester IX":
                        $semesterNum = 9;
                        $nextSemester = 'Semester X';
                        break;
                    case "Semester X":
                        $semesterNum = 10;
                        break;

                    default:
                        # code...
                        break;
                }
                $currentSemester = $semesterNum;


                // Determine the next semester and year
                $nextSemesterNum = $currentSemester + 1;

                switch ($nextSemesterNum) {
                    case 1:
                        $nextYear = "First Year";
                        break;
                    case 2:
                        $nextYear = "First Year";
                        break;
                    case 2:
                        $nextYear = "First Year";
                        break;
                    case 3:
                        $nextYear = "Second Year";
                        break;
                    case 4:
                        $nextYear = "Second Year";
                        break;
                    case 5:
                        $nextYear = "Third Year";
                        break;
                    case 6:
                        $nextYear = "Third Year";
                        break;
                    case 7:
                        $nextYear = "Fourth Year";
                        break;
                    case 8:
                        $nextYear = "Fourth Year";
                        break;
                    case 9:
                        $nextYear = "Fifth Year";
                        break;
                    case 10:
                        $nextYear = "Fifth Year";
                        break;

                    default:
                        # code...
                        break;
                }
                try {
                    $query = "UPDATE students SET student_year = :student_year, semester = :semester, updated_date = NOW() WHERE user_id = :user_id";
                    $stmt2 = $this->conn->prepare($query);
                    $stmt2->bindValue(':student_year', $nextYear);
                    $stmt2->bindValue(':semester', $nextSemester);
                    $stmt2->bindValue(':user_id', $userId);
                    $stmt2->execute();

                    if ($stmt2->rowCount() > 0) {
                        http_response_code(200);
                        echo json_encode(['message' => 'Student updated successfully']);
                    } else {
                        http_response_code(202);
                        echo json_encode(['error' => 'No changes were made']);
                    }
                } catch (\Exception $e) {
                    http_response_code(202);
                    echo json_encode(['error' => 'Update Fail']);
                }
            }
        } catch (\Exception $e) {
            http_response_code(202);
            echo json_encode(['error' => 'Update Fail!']);
        }
    }



    // Generate a unique random code
    function generateUniqueRandomCode($prefix = 'Reg-', $length = 10)
    {
        // Generate a unique ID
        $uniqueId = uniqid();

        // Generate a random string
        $randomString = bin2hex(random_bytes($length));

        // Concatenate the prefix, unique ID, and random string
        return $prefix . $uniqueId . '-' . $randomString;
    }
}
