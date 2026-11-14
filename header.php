<?php
/* header.php - shared top of every page. Set $page_title and $active before including. */
require_once __DIR__ . '/db.php';
$page_title = isset($page_title) ? $page_title : 'MajorMatch';
$active     = isset($active) ? $active : '';
$nav = [
    'home'    => ['index.php',      'Home'],
    'majors'  => ['majors.php',     'Explore Majors'],
    'try'     => ['experience.php', 'Try & Discover'],
    'compare' => ['compare.php',    'Compare'],
    'plans'   => ['study-plans.php','Study Plans'],
];
?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= e($page_title) ?> · MajorMatch</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
<header class="navbar">
  <div class="container nav-inner">
    <a class="logo" href="index.php"><span class="logo-mark">M</span>Major<span>Match</span></a>
    <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
    <nav class="nav-links" id="navLinks">
      <?php foreach ($nav as $key => $item): ?>
        <a href="<?= $item[0] ?>" class="<?= $active === $key ? 'active' : '' ?>"><?= $item[1] ?></a>
      <?php endforeach; ?>
      <a class="btn btn-primary btn-small" href="majors.php">Start Exploring</a>
    </nav>
  </div>
</header>
<main>
