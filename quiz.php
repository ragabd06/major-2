<?php
$page_title = 'Major Quiz';
$active = 'try';
$scripts = ['quiz.js'];
include 'php/header.php';

$slugById = [];
foreach (mm_rows('majors') as $m) $slugById[$m['id']] = $m['slug'];
$questions = mm_rows('quiz_questions');
$options   = mm_rows('quiz_options');
$letters   = ['A', 'B', 'C', 'D'];
?>
<section class="page-head">
  <div class="container">
    <p class="eyebrow">Step 4 · Quiz</p>
    <h1>What fits the way you think?</h1>
    <p class="muted">No right answers. Choose what sounds most fun.</p>
  </div>
</section>

<section class="section">
  <div class="container quiz-wrap">
    <p class="muted small" id="quizCount"></p>
    <div class="progress"><div id="quizBar"></div></div>
    <div class="card" style="margin-top:18px">
      <?php foreach ($questions as $q): $i = 0; ?>
        <div class="quiz-q">
          <h2><?= e($q['question']) ?></h2>
          <?php foreach ($options as $o): if ($o['question_id'] != $q['id']) continue; ?>
            <button type="button" class="quiz-option"
              data-m1="<?= e($slugById[$o['major_id']]) ?>" data-s1="<?= (int)$o['score'] ?>"
              <?php if (!empty($o['major2_id'])): ?>data-m2="<?= e($slugById[$o['major2_id']]) ?>" data-s2="<?= (int)$o['score2'] ?>"<?php endif; ?>
              data-dim="<?= e($o['dim']) ?>">
              <span class="letter"><?= $letters[$i++] ?></span><?= e($o['option_text']) ?>
            </button>
          <?php endforeach; ?>
        </div>
      <?php endforeach; ?>
      <div class="quiz-nav">
        <button type="button" class="btn btn-soft" id="quizBack">Back</button>
        <button type="button" class="btn btn-primary" id="quizNext" disabled>Next</button>
      </div>
    </div>
  </div>
</section>
<?php include 'php/footer.php'; ?>
