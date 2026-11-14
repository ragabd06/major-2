/*
 * main.js - loaded on every page.
 *  - mobile menu
 *  - the student's saved state (localStorage)
 *  - the scoring functions that build the profile and the final result
 *  - home page interest cards
 */

// ---------- 1. State (kept in the browser so the student does not need to log in) ----------
var MMState = {
  KEY: 'majormatch_state',

  get: function () {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(this.KEY)) || {}; } catch (e) { s = {}; }
    if (!s.session) s.session = 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    if (!s.ratings) s.ratings = {};     // { classify: 'love', sort: 'ok', ... }
    if (!s.interests) s.interests = []; // ['ai', 'web', ...]
    if (!s.quiz) s.quiz = null;         // { majors: {cs: 12, ...}, dims: {ai: 2, ...}, answered: 6 }
    return s;
  },

  save: function (s) {
    try { localStorage.setItem(this.KEY, JSON.stringify(s)); } catch (e) {}
  },

  rate: function (type, rating) {
    var s = this.get();
    s.ratings[type] = rating;
    this.save(s);
    this.sync();
  },

  toggleInterest: function (key) {
    var s = this.get();
    var i = s.interests.indexOf(key);
    if (i === -1) s.interests.push(key); else s.interests.splice(i, 1);
    this.save(s);
    return i === -1;
  },

  reset: function () {
    try { localStorage.removeItem(this.KEY); } catch (e) {}
  },

  // send the ratings to PHP/MySQL (fails silently if the server is not available)
  sync: function () {
    var s = this.get();
    if (!window.fetch) return;
    fetch('php/save-result.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session: s.session, ratings: s.ratings })
    }).catch(function () {});
  }
};

// ---------- 2. Scoring ----------
var RATING_VALUE = { love: 1, ok: 0.55, no: 0 };

// Profile: how much the student seems to like each dimension (0-100)
function computeProfile() {
  var s = MMState.get();
  var raw = {}, k;
  for (k in DIMS) raw[k] = 0;

  // mini experiences
  for (var type in s.ratings) {
    var meta = EXPERIENCE_META[type];
    if (!meta) continue;
    for (k in meta.dims) raw[k] += meta.dims[k] * RATING_VALUE[s.ratings[type]];
  }
  // chosen interests
  s.interests.forEach(function (key) {
    INTERESTS.forEach(function (it) {
      if (it.key !== key) return;
      for (var d in it.dims) raw[d] += 0.6 * it.dims[d];
    });
  });
  // quiz answers
  if (s.quiz && s.quiz.dims) for (k in s.quiz.dims) raw[k] += 0.5 * s.quiz.dims[k];

  var out = [];
  for (k in DIMS) out.push({ key: k, label: DIMS[k], pct: Math.min(100, Math.round(raw[k] / 2 * 100)) });
  out.sort(function (a, b) { return b.pct - a.pct; });
  return out;
}

// Final result: score for every major (0-100)
function computeResult() {
  var s = MMState.get();
  var slugs = Object.keys(MAJORS);
  var res = {};
  var tried = Object.keys(s.ratings).length;

  slugs.forEach(function (m) {
    var parts = [];   // [weight, value 0..1]

    // (a) quiz - 50%
    if (s.quiz && s.quiz.answered) parts.push([0.5, Math.min(1, s.quiz.majors[m] / (s.quiz.answered * 3))]);

    // (b) ratings of the mini experiences of this major - 35%
    var sum = 0, n = 0;
    for (var type in s.ratings) {
      if (EXPERIENCE_META[type] && EXPERIENCE_META[type].major === m) { sum += RATING_VALUE[s.ratings[type]]; n++; }
    }
    if (n > 0) parts.push([0.35, sum / n]);

    // (c) selected interests - 15%
    if (s.interests.length) {
      var pts = 0;
      s.interests.forEach(function (key) {
        INTERESTS.forEach(function (it) { if (it.key === key && it.majors[m]) pts += it.majors[m]; });
      });
      parts.push([0.15, Math.min(1, pts / (3 * s.interests.length))]);
    }

    var w = 0, v = 0;
    parts.forEach(function (p) { w += p[0]; v += p[0] * p[1]; });
    res[m] = w ? Math.max(5, Math.min(98, Math.round(v / w * 100))) : 0;
  });

  var list = slugs.map(function (m) { return { slug: m, pct: res[m] }; })
                  .sort(function (a, b) { return b.pct - a.pct; });
  return { majors: list, hasData: tried > 0 || s.interests.length > 0 || !!(s.quiz && s.quiz.answered), tried: tried };
}

// ---------- 3. Small helpers ----------
function $(sel, root) { return (root || document).querySelector(sel); }
function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

// ---------- 4. Page setup ----------
document.addEventListener('DOMContentLoaded', function () {
  // mobile menu
  var toggle = $('#navToggle'), links = $('#navLinks');
  if (toggle) toggle.addEventListener('click', function () { links.classList.toggle('open'); });

  // little "profile" counter in the navbar area is not needed - keep it simple
  initInterestCards();
});

// Home page: "What are you curious about?"
function initInterestCards() {
  var grid = $('#interestGrid');
  if (!grid) return;
  var panel = $('#interestResult');
  var chosen = MMState.get().interests;

  INTERESTS.forEach(function (it) {
    var b = document.createElement('button');
    b.className = 'interest-card' + (chosen.indexOf(it.key) > -1 ? ' selected' : '');
    b.innerHTML = '<span class="i-icon">' + it.icon + '</span><span>' + it.label + '</span>';
    b.addEventListener('click', function () {
      var on = MMState.toggleInterest(it.key);
      b.classList.toggle('selected', on);
      showInterest(it, on);
    });
    grid.appendChild(b);
  });

  function showInterest(it, on) {
    var html = '<h3>' + it.icon + ' ' + it.label + '</h3><div class="chips">';
    Object.keys(it.majors).sort(function (a, b) { return it.majors[b] - it.majors[a]; }).forEach(function (m) {
      var strength = it.majors[m] >= 3 ? 'Strong link' : (it.majors[m] === 2 ? 'Good link' : 'Some link');
      html += '<a class="chip chip-link" href="major-details.php?major=' + m + '">' + MAJORS[m].icon + ' ' +
              MAJORS[m].name + ' <small>· ' + strength + '</small></a>';
    });
    html += '</div><p class="muted">' + it.note + '</p>';
    html += '<p class="muted small">' + (on ? 'Saved to your profile ✓' : 'Removed from your profile') + '</p>';
    panel.innerHTML = html;
    panel.classList.add('show');
  }
}
