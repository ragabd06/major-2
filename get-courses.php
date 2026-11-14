<?php
/*
 * get-courses.php
 *   ?major=cs            -> courses of one major
 *   (no parameter)       -> courses of all majors
 * Each course also carries "major" (the slug) so JavaScript can group them.
 */
require_once __DIR__ . '/db.php';
header('Content-Type: application/json; charset=utf-8');

$slugById = [];
foreach (mm_rows('majors') as $m) $slugById[$m['id']] = $m['slug'];

$where = [];
if (!empty($_GET['major'])) {
    $m = mm_major($_GET['major']);
    if (!$m) { echo json_encode([]); exit; }
    $where['major_id'] = $m['id'];
}

$out = [];
foreach (mm_rows('courses', $where) as $c) {
    $out[] = [
        'major'        => $slugById[$c['major_id']],
        'level'        => (int)$c['level'],
        'code'         => $c['course_code'],
        'name'         => $c['course_name'],
        'name_ar'      => $c['course_name_ar'] ?? $c['course_name'],
        'name_en'      => $c['course_name_en'] ?? '',
        'credits'      => (int)$c['credit_hours'],
        'prerequisite' => $c['prerequisite'],
        'sample'       => (int)$c['is_sample'] === 1,
    ];
}
echo json_encode($out, JSON_UNESCAPED_UNICODE);
