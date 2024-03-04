<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include("../../vendor/autoload.php");

use backend\config\Database;
use backend\controllers\CourseRegistrationController;

$registration = new CourseRegistrationController(new Database());

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'get_student_data') {
            $id = $_GET['id'] ?? null;
            $semester = $_GET['semester'] ?? null;
            if ($id !== null && $semester!==null) {
                $registration->get_student_data($id,$semester);
            } else {
                echo json_encode(['error' => 'Fail to fetch']);
            }
        } else if ($endpoint === 'registrations_list') {
            $registration->get_registrations_list();
        }  else if ($endpoint === 'get_registration_history') {
            $id = $_GET['id'] ?? null;
            $semester = $_GET['semester'] ?? null;
            if ($id !== null && $semester) {
                $registration->get_registration_history($id, $semester);
            } else {
                echo json_encode(['error' => 'Fail to fetch']);
            }
        } 
        else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    case 'POST':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'register_course') {
            $id = $_GET['id'] ?? null;
            $name = $_GET['name'] ?? null;
            $academic = $_GET['academic'] ?? null;
            $year = $_GET['year'] ?? null;
            $semester = $_GET['semester'] ?? null;
            $major = $_GET['major'] ?? null;
            if ($id !== null && $name !== null & $academic !== null & $year !== null & $semester !== null & $major != null) {
                $registration->register_course($id, $name, $academic, $year, $semester, $major);
            } else {
                echo json_encode(['error' => 'Fail to fetch']);
            }
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    case 'PUT':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'change_registration_status') {
            $id = $_GET['id'] ?? null;
            $status = $_GET['status'] ?? null;
            $semester = $_GET['semester'] ?? null;
            $userId = $_GET['user_id'] ?? null;
           if($id !== null && $status !==null && $semester !== null && $userId !== null){
            $registration->change_registration_status($id, $status,$semester,$userId);
           }else{
            echo json_encode(['error' => 'Fail to fetch']);
           }
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    default:
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
