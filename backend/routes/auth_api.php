<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include("../../vendor/autoload.php");

use backend\config\Database;
use backend\controllers\AuthController;

$auth = new AuthController(new Database());

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST':
        $endpoint = $_GET['endpoint'] ?? '';
        if ($endpoint === 'login') {
            $auth->check_auth_user();
        } else if ($endpoint === 'changePassword') {
            $user_id = $_GET['user_id'] ?? null;
            if ($user_id !== null) {
                $auth->change_password($user_id);
            } else {
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
