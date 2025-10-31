<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$shouldFail = rand(0, 1);

if ($shouldFail) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Random server error occurred',
        'code' => 'INTERNAL_SERVER_ERROR'
    ]);
} else {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Request succeeded'
    ]);
}
?>