<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

sleep(3); // 3 second delay

echo json_encode([
    'message' => 'This response was intentionally delayed by 3 seconds',
    'timestamp' => date('Y-m-d H:i:s')
]);
?>