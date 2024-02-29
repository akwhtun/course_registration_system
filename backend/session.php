<?php
// example.php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
// Start session
session_start();

$_SESSION['username'] = 'john_doe';

echo json_encode(array('username' => $_SESSION['username']));