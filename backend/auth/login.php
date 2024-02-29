<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

include("../../vendor/autoload.php");

use backend\config\Database;
use backend\controllers\AuthController;

$auth = new AuthController(new Database());

$user = $auth->check_auth_user();

if (isset($_SESSION['user'])) {
    echo "old user";
} else {


    if (empty($user)) {
        $_SESSION['user'] = $user;
    }
    echo "new user";
}