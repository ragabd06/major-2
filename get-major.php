<?php
/* get-major.php?slug=cs  ->  JSON: the major, its fields and its experiences. */
require_once __DIR__ . '/db.php';
header('Content-Type: application/json; charset=utf-8');

$slug  = isset($_GET['slug']) ? $_GET['slug'] : '';
$major = mm_major($slug);
if (!$major) {
    http_response_code(404);
    echo json_encode(['error' => 'Major not found']);
    exit;
}
echo json_encode([
    'major'       => $major,
    'fields'      => mm_rows('fields', ['major_id' => $major['id']]),
    'experiences' => mm_rows('experiences', ['major_id' => $major['id']]),
], JSON_UNESCAPED_UNICODE);
