<?php
/*
 * db.php - database connection + one tiny helper used by every page.
 *
 * 1. Change the four settings below to match your XAMPP / WAMP / MAMP setup.
 * 2. If MySQL is not running, the site still works: it reads php/fallback.json
 *    (the same data as database.sql). This is handy for demos.
 */
$DB_HOST = 'localhost';
$DB_NAME = 'majormatch';
$DB_USER = 'root';
$DB_PASS = '';

/** Returns a PDO connection, or null when MySQL is not available. */
function mm_pdo() {
    global $DB_HOST, $DB_NAME, $DB_USER, $DB_PASS;
    static $pdo = false;
    if ($pdo !== false) return $pdo;
    try {
        $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4", $DB_USER, $DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    } catch (Exception $e) {
        $pdo = null;
    }
    return $pdo;
}

/** True when we are reading from MySQL (false = fallback.json). */
function mm_using_db() { return mm_pdo() !== null; }

/**
 * Get all rows of a table, optionally filtered, e.g.
 *   mm_rows('courses', ['major_id' => 1]);
 * Only table names from the whitelist are allowed.
 */
function mm_rows($table, $where = []) {
    $allowed = ['majors','fields','courses','experiences','quiz_questions','quiz_options'];
    if (!in_array($table, $allowed, true)) return [];

    $pdo = mm_pdo();
    if ($pdo) {
        $sql = "SELECT * FROM $table";
        $params = [];
        if ($where) {
            $parts = [];
            foreach ($where as $col => $val) {
                if (!preg_match('/^[a-z_0-9]+$/', $col)) continue;
                $parts[] = "$col = ?";
                $params[] = $val;
            }
            if ($parts) $sql .= ' WHERE ' . implode(' AND ', $parts);
        }
        $sql .= ' ORDER BY id';
        $st = $pdo->prepare($sql);
        $st->execute($params);
        return $st->fetchAll();
    }

    // fallback: read the JSON file
    $data = json_decode(file_get_contents(__DIR__ . '/fallback.json'), true);
    $rows = isset($data[$table]) ? $data[$table] : [];
    foreach ($where as $col => $val) {
        $rows = array_values(array_filter($rows, function ($r) use ($col, $val) {
            return isset($r[$col]) && (string)$r[$col] === (string)$val;
        }));
    }
    return $rows;
}

/** Find one major by its slug (cs / it / cy / ce). */
function mm_major($slug) {
    foreach (mm_rows('majors') as $m) if ($m['slug'] === $slug) return $m;
    return null;
}

/** HTML-escape shortcut. */
function e($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
