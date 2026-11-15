<!-- Message about the source of course data -->
<div class="banner success-banner" id="sourceBanner">
  ✓ Shared and different courses use the uploaded Qassim University study plans.
</div>

<!-- Selected majors will appear here -->
<div class="pick-row" id="comparePicker"></div>

<!-- Messages will appear here -->
<p class="feedback" id="compareMsg"></p>

<!-- Table showing topic coverage for each major -->
<h2>Topic emphasis</h2>
<p class="muted small">
  Topic coverage is calculated from course titles in the uploaded plans; it is an exploration aid, not an official curriculum rating.
</p>
<div class="table-wrap">
  <table class="compare" id="topicTable"></table>
</div>

<!-- Lists of shared and different courses -->
<div class="two-col wide">

  <!-- Shared courses -->
  <div class="card">
    <h3>Courses you share
      <span class="count-pill" id="sharedCount">0</span>
    </h3>
    <div id="sharedList"></div>
  </div>

  <!-- Different courses -->
  <div class="card">
    <h3>Courses that differ
      <span class="count-pill" id="differCount">0</span>
    </h3>
    <div id="differList"></div>
  </div>

</div>

<!-- Link to the study plans page -->
<p class="center" style="margin-top:26px">
  <a class="btn btn-primary" href="study-plans.php">
    Explore the study plans
  </a>
</p>
