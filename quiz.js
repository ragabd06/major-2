/*
 * quiz.js - Page 5: one question at a time.
 * quiz.php prints every question and option into the HTML (from MySQL),
 * with data attributes holding the points:
 *   data-m1 / data-s1 = main major + score,  data-m2 / data-s2 = second major + score,  data-dim
 */
document.addEventListener('DOMContentLoaded', function () {
  var qs = $all('.quiz-q');
  if (!qs.length) return;

  var current = 0;
  var picks = [];   // chosen option element per question
  var bar = $('#quizBar'), count = $('#quizCount'), next = $('#quizNext'), back = $('#quizBack');

  function show(i) {
    qs.forEach(function (q, k) { q.style.display = k === i ? 'block' : 'none'; });
    bar.style.width = Math.round(i / qs.length * 100) + '%';
    count.textContent = 'Question ' + (i + 1) + ' of ' + qs.length;
    back.style.visibility = i === 0 ? 'hidden' : 'visible';
    next.textContent = i === qs.length - 1 ? 'See my result' : 'Next';
    next.disabled = !picks[i];
  }

  $all('.quiz-option').forEach(function (o) {
    o.addEventListener('click', function () {
      var q = o.closest('.quiz-q');
      $all('.quiz-option', q).forEach(function (x) { x.classList.remove('chosen'); });
      o.classList.add('chosen');
      picks[current] = o;
      next.disabled = false;
    });
  });

  next.addEventListener('click', function () {
    if (!picks[current]) return;
    if (current < qs.length - 1) { current++; show(current); return; }
    finishQuiz();
  });
  back.addEventListener('click', function () { if (current > 0) { current--; show(current); } });

  function finishQuiz() {
    var majors = { cs: 0, it: 0, cy: 0, ce: 0 }, dims = {};
    picks.forEach(function (o) {
      if (!o) return;
      majors[o.dataset.m1] += +o.dataset.s1;
      if (o.dataset.m2) majors[o.dataset.m2] += +o.dataset.s2;
      if (o.dataset.dim) dims[o.dataset.dim] = (dims[o.dataset.dim] || 0) + 1;
    });
    var s = MMState.get();
    s.quiz = { majors: majors, dims: dims, answered: picks.filter(Boolean).length };
    MMState.save(s);
    MMState.sync();
    location.href = 'result.php';
  }

  show(0);
});
