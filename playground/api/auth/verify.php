<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    
    if (empty($authHeader) || !str_starts_with($authHeader, 'Bearer ')) {
        http_response_code(401);
        echo json_encode(['error' => 'No token provided']);
        exit();
    }
    
    $token = substr($authHeader, 7);
    
    // Mock token validation
    if (str_starts_with($token, 'mock-jwt-token-')) {
        http_response_code(200);
        echo json_encode(['valid' => true, 'message' => 'Token is valid']);
    } else {
        http_response_code(401);
        echo json_encode(['valid' => false, 'error' => 'Invalid token']);
    }
}
?>