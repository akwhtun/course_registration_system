<?php
// example.php

// Start session
session_start();

$_SESSION['username'] = 'john_doe';

echo json_encode(array('username' => $_SESSION['username']));