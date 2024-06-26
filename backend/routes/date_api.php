<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include("../../vendor/autoload.php");

use backend\config\Database;
use backend\controllers\DateController;

$date = new DateController(new Database());

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'get_date') {
            $date->get_allow_date();
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    case 'PUT':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'update_date') {
            $date->update_date();
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    
    default:
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
