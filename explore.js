/*
 * explore.js - Page 4: "Discover your interests" dashboard.
 * Reads the saved state and draws the progress bar + interest bars.
 */
var TOTAL_EXPERIENCES = Object.keys(EXPERIENCE_META).length;

function updateExploreCount() {
  var s = MMState.get();
  var n = Object.keys(s.ratings).length;
  var el = $('#exploredCount');
  if (el) el.textContent = n;
  var bar = $('#exploreBar');
  if (bar) bar.style.width = Math.round(n / TOTAL_EXPERIENCES * 100) + '%';
  var lbl = $('#exploreOf');
  if (lbl) lbl.textContent = n + ' of ' + TOTAL_EXPERIENCES + ' experiences tried';
}

document.addEventListener('DOMContentLoaded', function () {
  var box = $('#interestBars');
  if (!box) return;

  updateExploreCount();
  var s = MMState.get();
  var tried = Object.keys(s.ratings).length;

  // bars
  var profile = computeProfile();
  if (tried === 0 && s.interests.length === 0 && !s.quiz) {
    box.innerHTML = '<p class="muted">No data yet. Try a mini experience or pick interests on the home page and your bars will grow here.</p>';
  } else {
    box.innerHTML = profile.map(function (p) {
      return '<div class="bar-row"><span class="bar-label">' + p.label + '</span>' +
             '<div class="bar-track"><div class="bar-fill" style="width:' + p.pct + '%"></div></div>' +
             '<span class="bar-val">' + p.pct + '%</span></div>';
    }).join('');
  }

  // what they tried
  var list = $('#triedList');
  var types = Object.keys(s.ratings);
  if (types.length) {
    var icons = { love: '❤️', ok: '🙂', no: '😐' };
    list.innerHTML = types.map(function (t) {
      var m = EXPERIENCE_META[t] ? MAJORS[EXPERIENCE_META[t].major] : null;
      return '<span class="chip">' + icons[s.ratings[t]] + ' ' + (document.querySelector('[data-title="' + t + '"]') ? document.querySelector('[data-title="' + t + '"]').textContent : t) +
             (m ? ' <small>· ' + m.name + '</small>' : '') + '</span>';
    }).join('');
  } else {
    list.innerHTML = '<p class="muted">Nothing yet - go to <a href="experience.php">Try &amp; Discover</a>.</p>';
  }

  // quiz CTA text
  var cta = $('#quizHint');
  if (cta) cta.textContent = tried >= 3 ? 'You have a good start. Ready for the quiz?' : 'Tip: try at least 3 experiences before the quiz for a better result.';

  // reset button
  var reset = $('#resetBtn');
  if (reset) reset.addEventListener('click', function () {
    if (confirm('Clear your exploration and start again?')) { MMState.reset(); location.reload(); }
  });
});
