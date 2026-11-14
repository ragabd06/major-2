<?php
$page_title = 'Discover Your Interests';
$active = 'try';
$scripts = ['explore.js'];
include 'php/header.php';
$titles = [];
foreach (mm_rows('experiences') as $x) $titles[$x['type']] = $x['title'];
?>
<section class="page-head">
  <div class="container">
    <p class="eyebrow">Step 3 · Discover</p>
    <h1>Discover your interests</h1>
    <p class="muted">Every experience you try and rate adds to your profile.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="two-col">
      <div class="card">
        <h3>You've explored: <span class="big-number" id="exploredCount">0</span> fields</h3>
        <div class="progress"><div id="exploreBar"></div></div>
        <p class="muted small" id="exploreOf"></p>
        <h3 style="margin-top:22px">What you tried</h3>
        <div class="chips" id="triedList"></div>
        <div class="btn-row">
          <a class="btn btn-primary" href="experience.php">Try more</a>
          <button class="btn btn-soft" id="resetBtn" type="button">Start over</button>
        </div>
      </div>
      <div class="card">
        <h3>Your interests so far</h3>
        <div class="building"><span class="pulse"></span> You're building your profile...</div>
        <div id="interestBars" style="margin-top:14px"></div>
        <p class="muted small">We won't name a major yet. Take the quiz to put it all together.</p>
      </div>
    </div>
    <div class="cta-band" style="margin-top:30px">
      <h2>Next: a short quiz</h2>
      <p id="quizHint"></p>
      <a class="btn btn-light" href="quiz.php">Take the quiz</a>
    </div>
  </div>
</section>
<div style="display:none">
  <?php foreach ($titles as $t => $title): ?><span data-title="<?= e($t) ?>"><?= e($title) ?></span><?php endforeach; ?>
</div>
<?php include 'php/footer.php'; ?>
