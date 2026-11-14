<?php
$page_title = 'Compare Majors';
$active = 'compare';
$scripts = ['compare.js'];
include 'php/header.php';
?>
<section class="page-head">
  <div class="container">
    <p class="eyebrow">Step 6 · Compare</p>
    <h1>Compare majors side by side</h1>
    <p class="muted">Select 2 to 4 majors.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="banner success-banner" id="sourceBanner">✓ Shared and different courses use the uploaded Qassim University study plans.</div>
    <div class="pick-row" id="comparePicker"></div>
    <p class="feedback" id="compareMsg"></p>

    <h2>Topic emphasis</h2>
    <p class="muted small">Topic coverage is calculated from course titles in the uploaded plans; it is an exploration aid, not an official curriculum rating.</p>
    <div class="table-wrap"><table class="compare" id="topicTable"></table></div>

    <div class="two-col wide">
      <div class="card"><h3>Courses you share <span class="count-pill" id="sharedCount">0</span></h3><div id="sharedList"></div></div>
      <div class="card"><h3>Courses that differ <span class="count-pill" id="differCount">0</span></h3><div id="differList"></div></div>
    </div>
    <p class="center" style="margin-top:26px"><a class="btn btn-primary" href="study-plans.php">Explore the study plans</a></p>
  </div>
</section>
<?php include 'php/footer.php'; ?>
