<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include("../../vendor/autoload.php");

use backend\config\Database;
use backend\controllers\StudentGradeController;

$grade = new StudentGradeController(new Database());

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'student_data') {
            $id = $_GET['id'] ?? null;
            $year = $_GET['year'] ?? null;
            if ($id !== null && $year) {
                $grade->get_student_data($id, $year);
            } else {
                echo json_encode(['error' => 'Fail to fetch']);
            }
        } elseif ($endpoint === 'student_grades_list') {
            $id = $_GET['id'] ?? null;
            if ($id !== null) {
                $grade->student_grades_list($id);
            } else {
                echo json_encode(['error' => 'Fail to fetch']);
            }
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;

    case 'POST':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'student_register_grade') {
            $id = $_GET['id'] ?? null;
            if ($id !== null) {
                $grade->register_student_grade($id);
            }
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    case 'PUT':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'update_grade') {
            $id = $_GET['id'] ?? null;
            $grade->update_grade($id);
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    case 'DELETE':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'delete_grade') {
            $id = $_GET['id'] ?? null;
            $grade->delete_grade($id);
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    default:
        echo json_encode(['error' => 'Method not allowed']);
        break;
}