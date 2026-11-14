<?php
$page_title = 'Study Plans';
$active = 'plans';
$scripts = ['study-plans.js'];
include 'php/header.php';
?>
<section class="page-head">
  <div class="container">
    <p class="eyebrow">Step 7 · Study plans</p>
    <h1>Explore the study plans</h1>
    <p class="muted">Choose a major to see its courses level by level.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="banner success-banner" id="sourceBanner">✓ Course data is based on the uploaded Qassim University study plans.</div>
    <div class="pick-row" id="planTabs"></div>
    <p><b id="planSummary"></b></p>
    <input class="search" id="courseSearch" type="search" placeholder="Search courses...">
    <div id="planLevels"><p class="muted">Loading...</p></div>
  </div>
</section>
<?php include 'php/footer.php'; ?>
