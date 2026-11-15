<?php
$page_title = 'Study Plans';
$active = 'plans';
$scripts = ['study-plans.js'];
include 'header.php';
?>

<section class="page-head">
  <div class="container">
    <p class="eyebrow">Step 7 · Study Plans</p>
    <h1>Explore the Study Plans</h1>
    <p class="muted">Choose a major to view its courses by level.</p>
  </div>
</section>

<section class="section">
  <div class="container">

    <div class="banner success-banner">
      Course data is based on Qassim University study plans.
    </div>

    <!-- Major selection -->
    <div class="pick-row" id="planTabs"></div>

    <p><b id="planSummary"></b></p>

    <!-- Search courses -->
    <input class="search" id="courseSearch"
           type="search" placeholder="Search courses...">

    <!-- Display courses -->
    <div id="planLevels">
      <p class="muted">Loading...</p>
    </div>

  </div>
</section>

<?php include 'php/footer.php'; ?>
