<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'message' => 'QA Journey Mock API',
    'version' => '1.0.0',
    'endpoints' => [
        'users' => [
            'GET /api/users' => 'List all users',
            'GET /api/users?id=1' => 'Get single user',
            'POST /api/users/create.php' => 'Create user',
            'PUT /api/users/update.php?id=1' => 'Update user',
            'DELETE /api/users/delete.php?id=1' => 'Delete user'
        ],
        'products' => [
            'GET /api/products' => 'List all products',
            'GET /api/products?id=1' => 'Get single product',
            'POST /api/products/create.php' => 'Create product'
        ],
        'auth' => [
            'POST /api/auth/login.php' => 'Login (email: [email protected], password: password123)',
            'POST /api/auth/logout.php' => 'Logout',
            'GET /api/auth/verify.php' => 'Verify token (requires Authorization header)'
        ],
        'test' => [
            'GET /api/test/slow-endpoint.php' => '3 second delay',
            'GET /api/test/random-failure.php' => '50% chance of 500 error',
            'GET /api/test/rate-limited.php' => 'Rate limited to 5 requests per minute'
        ]
    ],
    'documentation' => 'https://qajourney.net'
]);
?>