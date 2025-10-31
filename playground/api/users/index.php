<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Mock users data
$users = [
    ['id' => 1, 'name' => 'John Doe', 'email' => '[email protected]', 'role' => 'admin', 'active' => true],
    ['id' => 2, 'name' => 'Jane Smith', 'email' => '[email protected]', 'role' => 'user', 'active' => true],
    ['id' => 3, 'name' => 'Bob Johnson', 'email' => '[email protected]', 'role' => 'user', 'active' => false],
    ['id' => 4, 'name' => 'Alice Williams', 'email' => '[email protected]', 'role' => 'moderator', 'active' => true]
];

// Handle GET request with optional ID parameter
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if ID is provided in query string
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $user = array_values(array_filter($users, fn($u) => $u['id'] === $id));
        
        if (!empty($user)) {
            echo json_encode($user[0]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'User not found', 'id' => $id]);
        }
    } else {
        // Return all users
        echo json_encode($users);
    }
}
?>