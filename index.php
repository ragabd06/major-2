<?php
// Set the page title and mark the current page as Home.
$page_title = 'Which Computer Major Fits You?';
$active = 'home';

// Include the shared website header.
include 'header.php';
?>

<!-- Hero section: introduces the MajorMatch website. -->
<section class="hero">
  <div class="container hero-inner">
    <div>
      <p class="tagline">Don't just choose your major. Explore it.</p>
      <h1>Which Computer Major Fits You?</h1>
      <p class="lead">Don't choose based on a course name. Explore what you can actually build, create, and work with.</p>

      <!-- Buttons that navigate to the majors page. -->
      <div class="btn-row">
        <a class="btn btn-primary" href="majors.php">Start Exploring</a>
        <a class="btn btn-light" href="majors.php#majors">Explore Majors</a>
      </div>
    </div>

    <!-- Decorative icons representing different technology fields. -->
    <div class="hero-art" aria-hidden="true">
      <div class="orb">💻</div>
      <span class="float-icon" style="top:6%;left:8%">🤖 AI</span>
      <span class="float-icon" style="top:0;right:12%">&lt;/&gt; Code</span>
      <span class="float-icon" style="top:34%;right:0">📱 Apps</span>
      <span class="float-icon" style="bottom:18%;right:8%">🦾 Robot</span>
      <span class="float-icon" style="bottom:2%;left:30%">🗄️ Database</span>
      <span class="float-icon" style="bottom:20%;left:0">☁️ Cloud</span>
      <span class="float-icon" style="top:38%;left:-2%">🌐 Web</span>
      <span class="float-icon" style="bottom:0;right:34%">🎮 Game</span>
    </div>
  </div>
</section>

<!-- Interest section: allows users to explore their interests. -->
<section class="section">
  <div class="container">
    <div class="section-head">
      <h2>What are you curious about?</h2>
      <p class="muted">Tap the things that sound interesting. We'll show which majors connect to them.</p>
    </div>

    <!-- JavaScript displays the interests and their results here. -->
    <div class="interest-grid" id="interestGrid"></div>
    <div class="interest-result" id="interestResult"></div>
  </div>
</section>

<!-- Explains the steps users can follow through MajorMatch. -->
<section class="section">
  <div class="container">
    <div class="section-head">
      <h2>Explore → Try → Discover → Compare → Decide</h2>
      <p class="muted">MajorMatch is a journey, not a list of course names.</p>
    </div>

    <!-- Navigation links to the main project features. -->
    <div class="journey">
      <a class="step" href="majors.php">1 · Explore majors</a><span class="arrow-s">➜</span>
      <a class="step" href="experience.php">2 · Try mini experiences</a><span class="arrow-s">➜</span>
      <a class="step" href="explore.php">3 · Build your profile</a><span class="arrow-s">➜</span>
      <a class="step" href="quiz.php">4 · Take the quiz</a><span class="arrow-s">➜</span>
      <a class="step" href="result.php">5 · See your result</a><span class="arrow-s">➜</span>
      <a class="step" href="compare.php">6 · Compare</a><span class="arrow-s">➜</span>
      <a class="step" href="study-plans.php">7 · Study plans</a>
    </div>
  </div>
</section>

<!-- Final call-to-action section. -->
<section class="section">
  <div class="container">
    <div class="cta-band">
      <h2>Ready to find out what each major feels like?</h2>
      <p>It takes about 10 minutes. No sign-up needed.</p>
      <a class="btn btn-light" href="majors.php">Start Exploring</a>
    </div>
  </div>
</section>

<!-- Include the shared website footer. -->
<?php include 'footer.php'; ?>
