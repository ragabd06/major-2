<?php
$page_title = 'Your Result';
$active = 'try';
$scripts = ['result.js'];
include 'php/header.php';
?>
<section class="page-head">
  <div class="container">
    <p class="eyebrow">Step 5 · Result</p>
    <h1>Your Exploration Result</h1>
    <p class="muted">Built from your quiz answers, your mini-experience ratings and your chosen interests.</p>
  </div>
</section>

<section class="section">
  <div class="container" id="resultBox">
    <p class="muted center">Calculating...</p>
  </div>
  <div class="container center" style="margin-top:26px">
    <a class="btn btn-soft" href="quiz.php">Retake the quiz</a>
    <a class="btn btn-soft" href="experience.php">Try more experiences</a>
    <a class="btn btn-primary" href="compare.php">Compare majors</a>
  </div>
</section>
<?php include 'php/footer.php'; ?>
