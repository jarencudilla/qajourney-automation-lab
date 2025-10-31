<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validation
    if (empty($input['name']) || empty($input['email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Name and email are required']);
        exit();
    }
    
    // Validate email format
    if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        exit();
    }
    
    // Mock user creation
    $newUser = [
        'id' => rand(100, 999),
        'name' => $input['name'],
        'email' => $input['email'],
        'role' => $input['role'] ?? 'user',
        'active' => true,
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    http_response_code(201);
    echo json_encode($newUser);
}
?>