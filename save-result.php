<?php
/*
 * save-result.php  (called by js/main.js with fetch + POST)
 * Body (JSON): { "session": "abc123", "ratings": { "classify": "love", "sort": "ok" } }
 * Saves each rating into the user_exploration table.
 * If MySQL is not available it simply answers {"saved": false} - the website
 * keeps working because the ratings are also stored in the browser.
 */
require_once __DIR__ . '/db.php';
header('Content-Type: application/json; charset=utf-8');

$body = json_decode(file_get_contents('php://input'), true);
$pdo  = mm_pdo();
if (!$pdo || !is_array($body) || empty($body['session']) || empty($body['ratings'])) {
    echo json_encode(['saved' => false]);
    exit;
}

$session = substr(preg_replace('/[^a-zA-Z0-9_-]/', '', $body['session']), 0, 64);
$scores  = ['love' => 2, 'ok' => 1, 'no' => 0];

// map experience "type" key -> id
$idByType = [];
foreach (mm_rows('experiences') as $x) $idByType[$x['type']] = $x['id'];

// start fresh for this visitor so repeated saves do not create duplicates
$pdo->prepare('DELETE FROM user_exploration WHERE session_id = ?')->execute([$session]);

$ins = $pdo->prepare('INSERT INTO user_exploration (session_id, experience_id, rating, score) VALUES (?, ?, ?, ?)');
$count = 0;
foreach ($body['ratings'] as $type => $rating) {
    if (!isset($idByType[$type]) || !isset($scores[$rating])) continue;
    $ins->execute([$session, $idByType[$type], $rating, $scores[$rating]]);
    $count++;
}
echo json_encode(['saved' => true, 'count' => $count]);
