<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'User ID is required']);
        exit();
    }
    
    $id = intval($_GET['id']);
    
    // Simulate user not found
    if ($id === 9999) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        exit();
    }
    
    // Validation
    if (isset($input['email']) && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        exit();
    }
    
    // Mock updated user
    $updatedUser = [
        'id' => $id,
        'name' => $input['name'] ?? 'Updated User',
        'email' => $input['email'] ?? '[email protected]',
        'role' => $input['role'] ?? 'user',
        'active' => $input['active'] ?? true,
        'updated_at' => date('Y-m-d H:i:s')
    ];
    
    http_response_code(200);
    echo json_encode($updatedUser);
}
?>