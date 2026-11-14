<?php
require_once __DIR__ . '/php/db.php';
$slug  = isset($_GET['major']) ? $_GET['major'] : 'cs';
$major = mm_major($slug);
if (!$major) $major = mm_major('cs');
$page_title = 'Try & Discover';
$active = 'try';
$scripts = ['experiences.js'];
include 'php/header.php';

$majors = mm_rows('majors');
$exps   = mm_rows('experiences', ['major_id' => $major['id']]);
$fieldName = [];
foreach (mm_rows('fields', ['major_id' => $major['id']]) as $f) $fieldName[$f['id']] = $f['name'];
?>
<section class="page-head">
  <div class="container">
    <p class="eyebrow">Step 2 · Try</p>
    <h1>Don't just read about it. Try it.</h1>
    <p class="muted">Pick a major, open a mini experience, then rate how much you enjoyed it. These are tiny demos - not the real thing - but they show the flavour.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="pick-row">
      <?php foreach ($majors as $m): ?>
        <a class="pick-card <?= $m['slug'] === $major['slug'] ? 'selected' : '' ?>" href="experience.php?major=<?= e($m['slug']) ?>">
          <span><?= e($m['icon']) ?></span><b><?= e($m['name_en']) ?></b>
        </a>
      <?php endforeach; ?>
    </div>

    <h2><?= e($major['icon']) ?> <?= e($major['name_en']) ?> experiences</h2>
    <?php foreach ($exps as $x): ?>
      <div class="exp-card" id="exp-<?= e($x['type']) ?>" data-type="<?= e($x['type']) ?>">
        <div class="exp-head">
          <div>
            <span class="tag"><?= e(isset($fieldName[$x['field_id']]) ? $fieldName[$x['field_id']] : 'Field') ?></span>
            <h3><?= e($x['title']) ?></h3>
            <p class="muted" style="margin:0"><?= e($x['description']) ?></p>
          </div>
          <div><span class="exp-rated"></span><button class="btn btn-primary exp-start" type="button">Try it</button></div>
        </div>
        <div class="exp-body"></div>
      </div>
    <?php endforeach; ?>

    <div class="cta-band" style="margin-top:36px">
      <h2>Tried a few? See what it says about you.</h2>
      <a class="btn btn-light" href="explore.php">Open my interest profile</a>
    </div>
  </div>
</section>
<?php include 'php/footer.php'; ?>
