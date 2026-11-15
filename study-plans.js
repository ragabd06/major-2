// Display study plans for the selected major
document.addEventListener('DOMContentLoaded', function () {
var tabs = $('#planTabs');
if (!tabs) return;

var current = new URLSearchParams(location.search).get('major');
if (!MAJORS[current]) current = 'cs';

var courses = [];

// Create major buttons
Object.keys(MAJORS).forEach(function (m) {
var btn = document.createElement('button');
btn.className = 'pick-card';
btn.dataset.m = m;
btn.innerHTML = '<span>' + MAJORS[m].icon + '</span><b>' + MAJORS[m].name + '</b>';

btn.addEventListener('click', function () {
  current = m;
  render();
});

tabs.appendChild(btn);
});

$('#courseSearch').addEventListener('input', render);

// Show courses for the selected major
function render() {
$all('.pick-card', tabs).forEach(function (btn) {
btn.classList.toggle('selected', btn.dataset.m === current);
});

var term = $('#courseSearch').value.trim().toLowerCase();

var mine = courses.filter(function (c) {
  return c.major === current;
});

$('#planSummary').textContent =
  MAJORS[current].name + ' · ' + mine.length + ' courses';

var html = '';
var found = 0;

// Display courses level by level
for (var level = 1; level <= 10; level++) {
  var list = mine.filter(function (c) {
    return Number(c.level) === level &&
      (!term || (c.name + ' ' + c.code).toLowerCase().includes(term));
  });

  found += list.length;

  if (!list.length && term) continue;

  html += '<section class="level">' +
    '<h3><span class="level-badge">' + level + '</span> Level ' + level + '</h3>' +
    '<div class="course-grid">' +
    (list.length ? list.map(card).join('') : '<p class="muted">No courses listed.</p>') +
    '</div></section>';
}

$('#planLevels').innerHTML = found || !term
  ? html
  : '<p class="muted">No matching courses found.</p>';
}

// Course card design
function card(c) {
return '<div class="course-card" style="border-top-color:' + MAJORS[c.major].color + '">' +
'<span class="code">' + c.code + '</span>' +
'<h4>' + c.name + '</h4>' +
(c.name_ar ? '<p class="course-ar">' + c.name_ar + '</p>' : '') +
'<div class="course-meta">' +
'<span>⏱ ' + c.credits + ' credit hours</span>' +
'<span>' + (c.prerequisite ? 'Prerequisite: ' + c.prerequisite : 'No prerequisite') + '</span>' +
'</div></div>';
}

// Load course data
fetch('get-courses.php')
.then(function (response) {
return response.json();
})
.then(function (data) {
courses = data;
render();
})
.catch(function () {
$('#planLevels').innerHTML =
'<p class="warn">Could not load courses. Please check the PHP server.</p>';
});
});
