<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include("../../vendor/autoload.php");

use backend\config\Database;
use backend\controllers\CourseController;

$course = new CourseController(new Database());

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'courses_list') {
            $course->get_courses_list();
        } elseif ($endpoint === 'get_course') {
            $id = $_GET['id'] ?? null;
            if ($id !== null) {
                $course->get_course($id);
            } else {
                echo json_encode(['error' => 'Course ID is required']);
            }
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    case 'POST':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'create_course') {
            $course->create_course();
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
        case 'PUT':
            $endpoint = $_GET['endpoint'] ?? '';
            if($endpoint === 'update_course'){
                $id = $_GET['id'] ?? null;
                $course->update_course($id);
            }else{
                echo json_encode(['error' => 'Endpoint not found']);  
            }
            break;
    case 'DELETE':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'delete_course') {
            $id = $_GET['id'] ?? null;
            $course->delete_course($id);
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    default:
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
