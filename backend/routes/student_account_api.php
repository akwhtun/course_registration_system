<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include("../../vendor/autoload.php");

use backend\config\Database;
use backend\controllers\StudentAccountController;

$account = new StudentAccountController(new Database());

// Handle requests based on HTTP method
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'students_account_list') {
            $account->get_accounts_list();
        } elseif ($endpoint === 'get_student') {
            $id = $_GET['id'] ?? null;
            if ($id !== null) {
                $account->get_student($id);
            } else {
                echo json_encode(['error' => 'Fail to fetch']);
            }
        } else {
            // http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;

    case 'POST':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'student_register_account') {
            $account->register_student_account();
        } else {
            // http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    case 'PUT':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'update_student') {
            $id = $_GET['id'] ?? null;
            $account->update_student($id);
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    default:
        // http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}


// Handle POST request to create a new course
// if ($method === 'POST' && $endpoint === 'courses') {
//     // Get data from the request body
//     $data = json_decode(file_get_contents('php://input'), true);

//     // Validate data
//     if (!isset($data['course_name']) || !isset($data['course_code'])) {
//         http_response_code(400);
//         echo json_encode(['error' => 'Missing required fields']);
//         exit;
//     }

//     // Insert new course into the database
//     $query = "INSERT INTO courses (course_name, course_code) VALUES (:course_name, :course_code)";
//     $stmt = $conn->prepare($query);
//     $stmt->bindParam(':course_name', $data['course_name']);
//     $stmt->bindParam(':course_code', $data['course_code']);

//     if ($stmt->execute()) {
//         http_response_code(201);
//         echo json_encode(['message' => 'Course created successfully']);
//         exit;
//     } else {
//         http_response_code(500);
//         echo json_encode(['error' => 'Failed to create course']);
//         exit;
//     }
// }

// // Handle PUT request to update a course
// if ($method === 'PUT' && $endpoint === 'courses') {
//     // Get data from the request body
//     $data = json_decode(file_get_contents('php://input'), true);

//     // Validate data
//     if (!isset($data['id']) || !isset($data['course_name']) || !isset($data['course_code'])) {
//         http_response_code(400);
//         echo json_encode(['error' => 'Missing required fields']);
//         exit;
//     }

//     // Update course in the database
//     $query = "UPDATE courses SET course_name = :course_name, course_code = :course_code WHERE id = :id";
//     $stmt = $conn->prepare($query);
//     $stmt->bindParam(':course_name', $data['course_name']);
//     $stmt->bindParam(':course_code', $data['course_code']);
//     $stmt->bindParam(':id', $data['id']);

//     if ($stmt->execute()) {
//         http_response_code(200);
//         echo json_encode(['message' => 'Course updated successfully']);
//         exit;
//     } else {
//         http_response_code(500);
//         echo json_encode(['error' => 'Failed to update course']);
//         exit;
//     }
// }

// // Handle DELETE request to delete a course
// if ($method === 'DELETE' && $endpoint === 'courses') {
//     // Get course ID from request parameters
//     $course_id = $_GET['id'] ?? null;

//     if (!$course_id) {
//         http_response_code(400);
//         echo json_encode(['error' => 'Missing course ID']);
//         exit;
//     }

//     // Delete course from the database
//     $query = "DELETE FROM courses WHERE id = :id";
//     $stmt = $conn->prepare($query);
//     $stmt->bindParam(':id', $course_id);

//     if ($stmt->execute()) {
//         http_response_code(200);
//         echo json_encode(['message' => 'Course deleted successfully']);
//         exit;
//     } else {
//         http_response_code(500);
//         echo json_encode(['error' => 'Failed to delete course']);
//         exit;
//     }
// }

// // Handle unsupported endpoints
// http_response_code(404);
// echo json_encode(['error' => 'Endpoint not found']);
// exit;