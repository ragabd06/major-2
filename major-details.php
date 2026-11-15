
<?php
// Include the database connection.
require_once __DIR__ . '/db.php';

// Get the selected major from the URL. Use CS as the default.
$slug  = isset($_GET['major']) ? $_GET['major'] : 'cs';

// Retrieve the major information.
$major = mm_major($slug);

// If the major does not exist, display Computer Science.
if (!$major) $major = mm_major('cs');

// Set the page title and active navigation item.
$page_title = $major['name_en'];
$active = 'majors';

// Include the shared website header.
include 'header.php';

// Retrieve data related to the selected major.
$fields  = mm_rows('fields', ['major_id' => $major['id']]);
$exps    = mm_rows('experiences', ['major_id' => $major['id']]);
$courses = mm_rows('courses', ['major_id' => $major['id']]);

// Prepare variables to organize courses by academic level.
$sample  = false;
$byLevel = [];

// Group courses by level and check if sample data exists.
foreach ($courses as $c) {
    $byLevel[(int)$c['level']][] = $c;

    if ((int)$c['is_sample'] === 1) $sample = true;
}
?>

<!-- Display the selected major's main information. -->
<section class="page-head">
  <div class="container">
    <p class="eyebrow">Major details</p>
    <h1><?= e($major['icon']) ?> <?= e($major['name_en']) ?></h1>
    <p class="ar"><?= e($major['name_ar']) ?></p>
    <p><?= e($major['description']) ?></p>

    <!-- Navigation buttons for related project features. -->
    <div class="btn-row">
      <a class="btn btn-primary" href="experience.php?major=<?= e($major['slug']) ?>">Try a mini experience</a>
      <a class="btn btn-soft" href="study-plans.php?major=<?= e($major['slug']) ?>">See the study plan</a>
      <a class="btn btn-soft" href="compare.php?majors=<?= e(implode(',', array_values(array_unique([$major['slug'], 'cs', 'it', 'ce']))) ) ?>">Compare</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">

    <!-- Display the fields related to the selected major. -->
    <h2>Fields you can explore</h2>
    <div class="detail-fields">
      <?php foreach ($fields as $f): ?>
        <div class="field-card"><?= e($f['name']) ?><small>Field area</small></div>
      <?php endforeach; ?>
    </div>

    <!-- Display mini experiences related to the selected major. -->
    <h2 style="margin-top:44px">Things you can try</h2>
    <div class="chips">
      <?php foreach ($exps as $x): ?>
        <a class="chip chip-link" href="experience.php?major=<?= e($major['slug']) ?>#exp-<?= e($x['type']) ?>"><?= e($x['title']) ?></a>
      <?php endforeach; ?>
    </div>

    <!-- Show a preview of courses from selected academic levels. -->
    <h2 style="margin-top:44px">A glimpse of the study plan</h2>

    <?php if ($sample): ?>
      <!-- Warning shown when the displayed course data is sample data. -->
      <div class="banner" style="display:block">⚠️ Demo course data - replace it with the official Qassim University plan (see README).</div>
    <?php endif; ?>

    <div class="grid-3">
      <?php foreach ([1, 4, 8] as $lvl): if (empty($byLevel[$lvl])) continue; ?>
        <div class="card">
          <h3>Level <?= $lvl ?></h3>

          <!-- Display course codes and names for this level. -->
          <?php foreach ($byLevel[$lvl] as $c): ?>
            <div class="course-row">
              <span class="code"><?= e($c['course_code']) ?></span>
              <span><?= e($c['course_name']) ?></span>
            </div>
          <?php endforeach; ?>
        </div>
      <?php endforeach; ?>
    </div>

    <!-- Link to the complete study plan. -->
    <p style="margin-top:20px">
      <a class="btn btn-primary" href="study-plans.php?major=<?= e($major['slug']) ?>">Open the full plan</a>
    </p>
  </div>
</section>

<!-- Include the shared website footer. -->
<?php include 'footer.php'; ?>
