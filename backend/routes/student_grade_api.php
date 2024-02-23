<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include("../../vendor/autoload.php");

use backend\config\Database;
use backend\controllers\StudentGradeController;

$account = new StudentGradeController(new Database());

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'students_account_list') {
            $account->get_accounts_list();
        } elseif ($endpoint === 'student_grades_list') {
            $id = $_GET['id'] ?? null;
            if ($id !== null) {
                $account->student_grades_list($id);
            } else {
                echo json_encode(['error' => 'Fail to fetch']);
            }
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;

    case 'POST':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'student_register_account') {
            $account->register_student_account();
        } else {
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
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
