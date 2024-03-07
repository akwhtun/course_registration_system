<?php


namespace backend\controllers;

use backend\config\Database;
use PDO;

class AuthController
{
    private $conn;

    public function __construct(Database $db)
    {
        $this->conn = $db->connect();
    }

    // public function check_auth_user11()
    // {
    //     $data = json_decode(file_get_contents('php://input'), true);

    //     $requiredFields = ['email', 'password'];
    //     $missingFields = [];

    //     foreach ($requiredFields as $field) {
    //         if (empty(trim($data[$field]))) {
    //             $missingFields[] = ucfirst($field);
    //         }
    //     }

    //     if (!empty($missingFields)) {
    //         $errorMessage = implode(' and ', $missingFields) . ' field' . (count($missingFields) > 1 ? 's' : '') . ' ' . (count($missingFields) > 1 ? 'are' : 'is') . ' required';
    //         http_response_code(202);
    //         echo json_encode(['error' => $errorMessage]);
    //         exit;
    //     }


    //     try {
    //         $query = "SELECT users.id, users.role_id, users.status,users.name,users.email,users.gender FROM users WHERE email = :email AND password = :password";
    //         $stmt = $this->conn->prepare($query);
    //         $stmt->bindValue(':email', $data['email']);
    //         $stmt->bindValue(':password', $data['password']);
    //         $stmt->execute();
    //         $check_user = $stmt->fetch(PDO::FETCH_ASSOC);
    //         if (!empty($check_user)) {
    //             if ($check_user['status'] == 0) {
    //                 http_response_code(200);
    //                 echo json_encode(['message' => 'changePassword', 'user_id' => $check_user['id'], 'role_id' => $check_user['role_id'], 'name' => $check_user['name'], 'email' => $check_user['email'], 'gender' => $check_user['gender']]);
    //                 exit;
    //             } else {
    //                 $query = "SELECT users.*, students.id AS student_id, students.major AS student_major, students.student_year AS student_year FROM users, students WHERE users.email = :email AND users.password = :password AND users.role_id = :role_id";
    //                 $stmt = $this->conn->prepare($query);
    //                 $stmt->bindValue(':email', $data['email']);
    //                 $stmt->bindValue(':password', $data['password']);
    //                 $stmt->bindValue(':role_id', $check_user['role_id']);
    //                 $stmt->execute();
    //                 $user = $stmt->fetch(PDO::FETCH_ASSOC);

    //                 http_response_code(200);
    //                 echo json_encode($user);
    //                 exit;
    //             }
    //         } else {
    //             http_response_code(202);
    //             echo json_encode(['error' => 'Unauthorized user']);
    //             exit;
    //         }
    //     } catch (\Exception $e) {
    //         http_response_code(202);
    //         echo json_encode(['error' => $e->getMessage()]);
    //         exit;
    //     }
    // }
    public function check_auth_user()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $requiredFields = ['email', 'password'];
        $missingFields = [];

        foreach ($requiredFields as $field) {
            if (empty(trim($data[$field]))) {
                $missingFields[] = ucfirst($field);
            }
        }

        if (!empty($missingFields)) {
            $errorMessage = implode(' and ', $missingFields) . ' field' . (count($missingFields) > 1 ? 's' : '') . ' ' . (count($missingFields) > 1 ? 'are' : 'is') . ' required';
            http_response_code(202);
            echo json_encode(['error' => $errorMessage]);
            exit;
        }

        try {
            $query = "SELECT id, role_id, status, name, email, gender, password FROM users WHERE email = :email";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':email', $data['email']);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
            // if (!empty($user) && password_verify($data['password'], $user['password'])) {
            //     if ($user['status'] == 0) {
            //         http_response_code(200);
            //         echo json_encode(['message' => 'changePassword', 'user_id' => $user['id'], 'role_id' => $user['role_id'], 'name' => $user['name'], 'email' => $user['email'], 'gender' => $user['gender']]);
            //         exit;
            //     } else {
            //         $userId = $user['id'];
            //         $role = $user['role_id'];
            //         if ($role == 2) {
            //             $query1 = "SELECT users.* FROM users WHERE users.id = :user_id";
            //             $stmt1 = $this->conn->prepare($query1);
            //             $stmt1->bindValue(':user_id', $userId);
            //             $stmt1->execute();
            //             $student = $stmt1->fetch(PDO::FETCH_ASSOC);
                    
            //             http_response_code(200);
            //             echo json_encode($student);
            //             exit;
            //         }
                    
                    
            //     }
           
           
            // } else {
            //     http_response_code(202);
            //     echo json_encode(['error' => 'Invalid Email or Password']);
            //     exit;
            // }
            if (!empty($user) && password_verify($data['password'], $user['password'])) {
                if ($user['status'] == 0) {
                    http_response_code(200);
                    echo json_encode(['message' => 'changePassword', 'user_id' => $user['id'], 'role_id' => $user['role_id'], 'name' => $user['name'], 'email' => $user['email'], 'gender' => $user['gender']]);
                    exit;
                } else {
                    $userId = $user['id'];
                    $role = $user['role_id'];
                    
                    // Fetch student data regardless of role
                    if($role == 3){
                        $query1 = "SELECT users.*,students.major,students.semester,students.student_year FROM users,students WHERE users.id = :user_id AND students.user_id = users.id";
                        $stmt1 = $this->conn->prepare($query1);
                        $stmt1->bindValue(':user_id', $userId);
                        $stmt1->execute();
                        $student = $stmt1->fetch(PDO::FETCH_ASSOC);
                        
                        http_response_code(200);
                        echo json_encode($student);
                        exit;
                    }
                    if($role == 2){
                        $query2 = "SELECT users.*,sub_admins.department FROM users,sub_admins WHERE users.id = :user_id AND sub_admins.user_id = users.id";
                        $stmt2 = $this->conn->prepare($query2);
                        $stmt2->bindValue(':user_id', $userId);
                        $stmt2->execute();
                        $subadmin = $stmt2->fetch(PDO::FETCH_ASSOC);
                        
                        http_response_code(200);
                        echo json_encode($subadmin);
                        exit;
                    }
                    if($role == 1){
                        $query3 = "SELECT users.* FROM users WHERE users.id = :user_id ";
                        $stmt3 = $this->conn->prepare($query3);
                        $stmt3->bindValue(':user_id', $userId);
                        $stmt3->execute();
                        $admin = $stmt3->fetch(PDO::FETCH_ASSOC);
                        
                        http_response_code(200);
                        echo json_encode($admin);
                        exit;
                    }
                }
            }else {
                    http_response_code(202);
                    echo json_encode(['error' => 'Invalid Email or Password']);
                    exit;
                }
            
        } catch (\Exception $e) {
            http_response_code(202);
            echo json_encode(['error' => $e->getMessage()]);
            exit;
        }
        
        
    }


    public function change_password($userId)
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $requiredFields = ['currentPassword', 'newPassword', 'confirmPassword'];
        $missingFields = [];

        foreach ($requiredFields as $field) {
            if (empty(trim($data[$field]))) {
                $missingFields[] = ucfirst($field);
            }
        }

        if (!empty($missingFields)) {
            $errorMessage = implode(' and ', $missingFields) . ' field' . (count($missingFields) > 1 ? 's' : '') . ' ' . (count($missingFields) > 1 ? 'are' : 'is') . ' required';
            http_response_code(202);
            echo json_encode(['error' => $errorMessage]);
            exit;
        }

        // Check if new password matches confirm password
        if ($data['newPassword'] !== $data['confirmPassword']) {
            http_response_code(202);
            echo json_encode(['error' => 'New password and confirm password do not match']);
            exit;
        }

        // Validate current password
        $currentPassword = $data['currentPassword'];

        // Retrieve the password hash from the database for the user
        $query = "SELECT password FROM users WHERE id = :userId";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':userId', $userId);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Check if the password matches
        if (!password_verify($currentPassword, $user['password'])) {
            http_response_code(202);
            echo json_encode(['error' => 'Current password is incorrect']);
            exit;
        }

        // Check if the new password meets the requirements
        $newPassword = $data['newPassword'];
        $errors = [];

        if (strlen($newPassword) < 8) {
            $errors[] = 'Password must be at least 8 characters long';
        }

        if (!preg_match('/[A-Z]/', $newPassword)) {
            $errors[] = 'Password must contain at least one uppercase letter';
        }

        if (!preg_match('/[a-z]/', $newPassword)) {
            $errors[] = 'Password must contain at least one lowercase letter';
        }

        if (!preg_match('/\d/', $newPassword)) {
            $errors[] = 'Password must contain at least one number';
        }

        if (!preg_match('/[!@#$%^&*(),.?":{}|<>]/', $newPassword)) {
            $errors[] = 'Password must contain at least one special character';
        }
        if (empty($errors)) {
            // If current password is valid and new password meets requirements, update the password
            $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
            $query = "UPDATE users SET password = :newPassword, status = :status WHERE id = :userId";

            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':newPassword', $newPasswordHash);
            $stmt->bindValue(':status', 1);
            $stmt->bindValue(':userId', $userId);
            $stmt->execute();

            // Provide success response
            http_response_code(200);
            echo json_encode(['message' => 'Password changed successfully']);
        } else {
            // Provide error response with specific messages
            http_response_code(202);
            echo json_encode(['error' => implode(', ', $errors)]);
        }
    }
}
