/*
 * result.js - Page 6: draws the final recommendation from the saved state.
 */
document.addEventListener('DOMContentLoaded', function () {
  var box = $('#resultBox');
  if (!box) return;

  var res = computeResult();
  if (!res.hasData) {
    box.innerHTML = '<div class="card center"><h2>Your profile is empty</h2><p class="muted">Try a few mini experiences and take the quiz first - then your result will appear here.</p>' +
      '<a class="btn btn-primary" href="experience.php">Try &amp; Discover</a> <a class="btn btn-soft" href="quiz.php">Take the quiz</a></div>';
    return;
  }

  var top = res.majors[0], profile = computeProfile();
  var topDims = profile.filter(function (p) { return p.pct > 0; }).slice(0, 3).map(function (p) { return p.label.toLowerCase(); });
  var why = topDims.length
    ? 'Your choices suggest that you enjoy ' + topDims.join(', ').replace(/, ([^,]*)$/, ' and $1') + '.'
    : 'Explore a few more experiences to see what you enjoy most.';
  var note = res.tried < 3 ? '<p class="warn">You tried only ' + res.tried + ' experience(s). Try more for a more reliable result.</p>' : '';

  var html = '<div class="result-top card"><div class="result-icon">' + MAJORS[top.slug].icon + '</div>' +
    '<p class="eyebrow">Top match</p><h2>' + MAJORS[top.slug].name + '</h2><p class="muted">' + MAJORS[top.slug].ar + '</p>' +
    '<div class="big-pct">' + top.pct + '% <small>match</small></div><p>' + why + '</p>' + note +
    '<a class="btn btn-primary" href="major-details.php?major=' + top.slug + '">Explore this major</a> ' +
    '<a class="btn btn-soft" href="compare.php?majors=' + res.majors.slice(0, 3).map(function (m) { return m.slug; }).join(',') + '">Compare top majors</a></div>';

  html += '<div class="two-col wide"><div class="card"><h3>Your strongest interests</h3>' +
    profile.slice(0, 5).map(function (p) {
      return '<div class="bar-row"><span class="bar-label">' + p.label + '</span><div class="bar-track"><div class="bar-fill" style="width:' + p.pct + '%"></div></div><span class="bar-val">' + p.pct + '%</span></div>';
    }).join('') + '</div>' +
    '<div class="card"><h3>Other majors you may enjoy</h3>' +
    res.majors.slice(1).map(function (m) {
      return '<a class="other-major" href="major-details.php?major=' + m.slug + '"><span>' + MAJORS[m.slug].icon + ' ' + MAJORS[m.slug].name + '</span><b>' + m.pct + '%</b></a>';
    }).join('') + '</div></div>';

  html += '<p class="disclaimer">This is an exploration result, not a final decision. Talk to advisors and read the study plans before you choose.</p>';
  box.innerHTML = html;
});
