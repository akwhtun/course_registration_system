<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include("../../vendor/autoload.php");

use backend\config\Database;
use backend\controllers\SubadminAccountController;

$account = new SubadminAccountController(new Database());

// Handle requests based on HTTP method
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'subadmins_account_list') {
            $account->get_accounts_list();
        } elseif ($endpoint === 'get_subadmin') {
            $id = $_GET['id'] ?? null;
            if ($id !== null) {
                $account->get_subadmin($id);
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
        if ($endpoint === 'subadmin_register_account') {
            $account->register_subadmin_account();
        } else {
            // http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    case 'PUT':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'update_subadmin') {
            $id = $_GET['id'] ?? null;
            $account->update_subadmin($id);
        } else {
            echo json_encode(['error' => 'Endpoint not found']);
        }
        break;
    default:
        // http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
