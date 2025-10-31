<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$products = [
    ['id' => 1, 'name' => 'Laptop', 'price' => 999.99, 'stock' => 15, 'category' => 'Electronics'],
    ['id' => 2, 'name' => 'Wireless Mouse', 'price' => 29.99, 'stock' => 50, 'category' => 'Electronics'],
    ['id' => 3, 'name' => 'Mechanical Keyboard', 'price' => 149.99, 'stock' => 25, 'category' => 'Electronics'],
    ['id' => 4, 'name' => 'USB-C Cable', 'price' => 12.99, 'stock' => 100, 'category' => 'Accessories'],
    ['id' => 5, 'name' => 'Monitor Stand', 'price' => 45.00, 'stock' => 0, 'category' => 'Accessories']
];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $product = array_values(array_filter($products, fn($p) => $p['id'] === $id));
        
        if (!empty($product)) {
            echo json_encode($product[0]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Product not found']);
        }
    } else {
        echo json_encode($products);
    }
}
?>