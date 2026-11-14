/*
 * study-plans.js - Page 8: choose a major, see 8 levels of course cards, search courses.
 */
document.addEventListener('DOMContentLoaded', function () {
  var tabs = $('#planTabs');
  if (!tabs) return;

  var current = new URLSearchParams(location.search).get('major');
  if (!MAJORS[current]) current = 'cs';
  var courses = [];

  Object.keys(MAJORS).forEach(function (m) {
    var b = document.createElement('button');
    b.className = 'pick-card'; b.dataset.m = m;
    b.innerHTML = '<span>' + MAJORS[m].icon + '</span><b>' + MAJORS[m].name + '</b>';
    b.addEventListener('click', function () { current = m; render(); });
    tabs.appendChild(b);
  });
  $('#courseSearch').addEventListener('input', render);

  function render() {
    $all('.pick-card', tabs).forEach(function (b) { b.classList.toggle('selected', b.dataset.m === current); });
    var term = $('#courseSearch').value.trim().toLowerCase();
    var mine = courses.filter(function (c) { return c.major === current; });
        $('#planSummary').textContent = MAJORS[current].name + ' · ' + mine.length + ' course entries from the plan';

    var html = '', found = 0;
    for (var lvl = 1; lvl <= 10; lvl++) {
      var list = mine.filter(function (c) {
        return c.level === lvl && (!term || (c.name + ' ' + c.code).toLowerCase().indexOf(term) > -1);
      });
      found += list.length;
      if (!list.length && term) continue;
      html += '<section class="level"><h3><span class="level-badge">' + lvl + '</span> Level ' + lvl + '</h3><div class="course-grid">' +
        (list.length ? list.map(card).join('') : '<p class="muted">No courses listed.</p>') + '</div></section>';
    }
    $('#planLevels').innerHTML = found || !term ? html : '<p class="muted">No course matches "' + term + '".</p>';
  }

  function card(c) {
    return '<div class="course-card" style="border-top-color:' + MAJORS[c.major].color + '"><span class="code">' + c.code + '</span>' +
      '<h4>' + c.name + '</h4>' + (c.name_ar && c.name_en ? '<p class="course-ar">' + c.name_ar + '</p>' : '') + '<div class="course-meta"><span>⏱ ' + c.credits + ' credit hours</span>' +
      '<span>' + (c.prerequisite ? 'Prerequisite: ' + c.prerequisite : 'No prerequisite') + '</span></div></div>';
  }

  fetch('php/get-courses.php').then(function (r) { return r.json(); }).then(function (data) {
    courses = data;
    render();
  }).catch(function () {
    $('#planLevels').innerHTML = '<p class="warn">Could not load courses. Open this site through a PHP server (XAMPP/WAMP), not by double-clicking the file.</p>';
  });
});
