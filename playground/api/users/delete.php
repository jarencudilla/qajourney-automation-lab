<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
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
    
    http_response_code(200);
    echo json_encode(['message' => 'User deleted successfully', 'id' => $id]);
}
?>