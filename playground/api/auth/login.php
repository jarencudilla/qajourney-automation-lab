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
    
    $validUsers = [
        ['email' => '[email protected]', 'password' => 'password123', 'name' => 'Test User', 'role' => 'admin'],
        ['email' => '[email protected]', 'password' => 'demo123', 'name' => 'Demo User', 'role' => 'user']
    ];
    
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and password are required']);
        exit();
    }
    
    $user = array_values(array_filter($validUsers, fn($u) => $u['email'] === $email && $u['password'] === $password));
    
    if (!empty($user)) {
        $token = 'mock-jwt-token-' . bin2hex(random_bytes(16));
        http_response_code(200);
        echo json_encode([
            'token' => $token,
            'user' => [
                'email' => $user[0]['email'],
                'name' => $user[0]['name'],
                'role' => $user[0]['role']
            ],
            'expires_in' => 3600
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
}
?>