<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

session_start();

if (!isset($_SESSION['request_count'])) {
    $_SESSION['request_count'] = 0;
    $_SESSION['reset_time'] = time() + 60;
}

if (time() > $_SESSION['reset_time']) {
    $_SESSION['request_count'] = 0;
    $_SESSION['reset_time'] = time() + 60;
}

$_SESSION['request_count']++;

if ($_SESSION['request_count'] > 5) {
    http_response_code(429);
    echo json_encode([
        'error' => 'Rate limit exceeded',
        'retry_after' => $_SESSION['reset_time'] - time()
    ]);
} else {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'requests_remaining' => 5 - $_SESSION['request_count']
    ]);
}
?>