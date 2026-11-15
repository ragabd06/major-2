<?php
// Set the page title and active navigation item.
$page_title = 'Explore Majors';
$active = 'majors';

// Include the shared website header.
include 'header.php';

// Define a color for each major.
$colors = [
    'cs' => '#5b5bf0',
    'it' => '#2f7bff',
    'ce' => '#18a8f0'
];

// Retrieve majors and filter the results to show only three selected majors.
$majors = array_filter(mm_rows('majors'), function ($m) {
    return in_array($m['slug'], ['cs', 'it', 'ce'], true);
});

// Re-index the filtered array.
$majors = array_values($majors);
?>

<!-- Page heading and introduction. -->
<section class="page-head">
  <div class="container">
    <p class="eyebrow">Step 1 · Explore</p>
    <h1>Three majors. Different worlds.</h1>
    <p class="muted">
      Explore the three computer majors and discover what makes each one different.
    </p>
  </div>
</section>

<!-- Display the available majors as cards. -->
<section class="section" id="majors">
  <div class="container grid-2">

    <?php foreach ($majors as $m):
        // Retrieve the fields related to the current major.
        $fields = mm_rows('fields', ['major_id' => $m['id']]);
    ?>

    <!-- Major card with its assigned color. -->
    <article class="card major-card"
      style="--c:<?= e($colors[$m['slug']] ?? '#5b5bf0') ?>">

      <!-- Display the major icon and names. -->
      <div class="major-icon"><?= e($m['icon']) ?></div>
      <h3><?= e($m['name_en']) ?></h3>
      <div class="ar"><?= e($m['name_ar']) ?></div>

      <!-- Display the major description. -->
      <p><?= e($m['description']) ?></p>

      <!-- Display the fields associated with this major. -->
      <div class="chips">
        <?php foreach ($fields as $f): ?>
          <span class="chip"><?= e($f['name']) ?></span>
        <?php endforeach; ?>
      </div>

      <!-- Links to the major details and mini experiences. -->
      <div class="btn-row">
        <a class="btn btn-primary"
           href="major-details.php?major=<?= e($m['slug']) ?>">
          Explore this major
        </a>

        <a class="btn btn-soft"
           href="experience.php?major=<?= e($m['slug']) ?>">
          Try a mini experience
        </a>
      </div>

    </article>

    <?php endforeach; ?>

  </div>
</section>

<!-- Include the shared website footer. -->
<?php include 'footer.php'; ?>
