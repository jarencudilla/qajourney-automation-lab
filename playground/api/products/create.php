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
    if (empty($input['name']) || !isset($input['price'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Name and price are required']);
        exit();
    }
    
    if (!is_numeric($input['price']) || $input['price'] < 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Price must be a positive number']);
        exit();
    }
    
    $newProduct = [
        'id' => rand(100, 999),
        'name' => $input['name'],
        'price' => floatval($input['price']),
        'stock' => $input['stock'] ?? 0,
        'category' => $input['category'] ?? 'Uncategorized',
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    http_response_code(201);
    echo json_encode($newProduct);
}
?>