<!-- <?php

$host = 'localhost'; // Database host
$dbname = 'course_registration_system'; // Database name
$username = 'root'; // Database username
$password = ''; // Database password

try {
    // Establish a new PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

    // Set PDO attributes for error reporting and exceptions
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    // Optionally, set other attributes as needed
    // $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // You're now connected to the specific database via PDO
    echo "Connected successfully";
} catch (PDOException $e) {
    // Handle database connection errors
    echo "Connection failed: " . $e->getMessage();
}
?> -->
