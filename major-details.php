<?php
require_once __DIR__ . '/php/db.php';
$slug  = isset($_GET['major']) ? $_GET['major'] : 'cs';
$major = mm_major($slug);
if (!$major) $major = mm_major('cs');   // unknown slug -> show Computer Science
$page_title = $major['name_en'];
$active = 'majors';
include 'php/header.php';

$fields  = mm_rows('fields', ['major_id' => $major['id']]);
$exps    = mm_rows('experiences', ['major_id' => $major['id']]);
$courses = mm_rows('courses', ['major_id' => $major['id']]);
$sample  = false;
$byLevel = [];
foreach ($courses as $c) {
    $byLevel[(int)$c['level']][] = $c;
    if ((int)$c['is_sample'] === 1) $sample = true;
}
?>
<section class="page-head">
  <div class="container">
    <p class="eyebrow">Major details</p>
    <h1><?= e($major['icon']) ?> <?= e($major['name_en']) ?></h1>
    <p class="ar"><?= e($major['name_ar']) ?></p>
    <p><?= e($major['description']) ?></p>
    <div class="btn-row">
      <a class="btn btn-primary" href="experience.php?major=<?= e($major['slug']) ?>">Try a mini experience</a>
      <a class="btn btn-soft" href="study-plans.php?major=<?= e($major['slug']) ?>">See the study plan</a>
      <a class="btn btn-soft" href="compare.php?majors=<?= e(implode(',', array_values(array_unique([$major['slug'], 'cs', 'it', 'ce']))) ) ?>">Compare</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2>Fields you can explore</h2>
    <div class="detail-fields">
      <?php foreach ($fields as $f): ?>
        <div class="field-card"><?= e($f['name']) ?><small>Field area</small></div>
      <?php endforeach; ?>
    </div>

    <h2 style="margin-top:44px">Things you can try</h2>
    <div class="chips">
      <?php foreach ($exps as $x): ?>
        <a class="chip chip-link" href="experience.php?major=<?= e($major['slug']) ?>#exp-<?= e($x['type']) ?>"><?= e($x['title']) ?></a>
      <?php endforeach; ?>
    </div>

    <h2 style="margin-top:44px">A glimpse of the study plan</h2>
    <?php if ($sample): ?>
      <div class="banner" style="display:block">⚠️ Demo course data - replace it with the official Qassim University plan (see README).</div>
    <?php endif; ?>
    <div class="grid-3">
      <?php foreach ([1, 4, 8] as $lvl): if (empty($byLevel[$lvl])) continue; ?>
        <div class="card">
          <h3>Level <?= $lvl ?></h3>
          <?php foreach ($byLevel[$lvl] as $c): ?>
            <div class="course-row"><span class="code"><?= e($c['course_code']) ?></span><span><?= e($c['course_name']) ?></span></div>
          <?php endforeach; ?>
        </div>
      <?php endforeach; ?>
    </div>
    <p style="margin-top:20px"><a class="btn btn-primary" href="study-plans.php?major=<?= e($major['slug']) ?>">Open the full plan</a></p>
  </div>
</section>
<?php include 'php/footer.php'; ?>
