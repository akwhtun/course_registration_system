<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include("../../vendor/autoload.php");

use backend\config\Database;
use backend\controllers\PrequisiteController;

$course = new PrequisiteController(new Database());

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'prequisites_list') {
            $course->get_prequisites_list();
        } elseif ($endpoint === 'get_prequisite') {
            $id = $_GET['id'] ?? null;
            if ($id !== null) {
                $course->get_prequisite($id);
            } else {
                echo json_encode(['error' => 'Fail to fetch']);
            }
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    case 'POST':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'create_prequisite') {
            $course->create_prequisite();
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    case 'PUT':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'update_prequisite') {
            $id = $_GET['id'] ?? null;
            $course->update_prequisite($id);
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    case 'DELETE':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'delete_prequisite') {
            $id = $_GET['id'] ?? null;
            $course->delete_prequisite($id);
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    default:
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
