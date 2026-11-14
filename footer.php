<?php /* footer.php - shared bottom of every page. Set $scripts (array of js files) before including. */
$scripts = isset($scripts) ? $scripts : [];
?>
</main>
<footer class="footer">
  <div class="container">
    <strong>MajorMatch</strong> · Don't just choose your major. Explore it.
    <div class="footer-note">A university project prototype · College of Computer · This is an exploration tool, not an official advisor.</div>
  </div>
</footer>
<script src="js/data.js"></script>
<script src="js/main.js"></script>
<?php foreach ($scripts as $s): ?>
<script src="js/<?= e($s) ?>"></script>
<?php endforeach; ?>
</body>
</html>
