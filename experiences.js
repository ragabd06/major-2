/*
 * experiences.js - the 17 mini experiences (Page 3).
 *
 * Each experience is a function:  EXP.name(root, finish)
 *   root   = the empty <div> where the experience draws itself
 *   finish = call finish('message') when the student completes it
 * They are SIMPLE demonstrations - not real AI / hacking tools.
 */
var EXP = {};

// tiny helper: build an element from HTML text
function make(html) {
  var d = document.createElement('div');
  d.innerHTML = html.trim();
  return d.firstChild;
}

/* ================= COMPUTER SCIENCE ================= */

// 1. AI / Machine Learning - learn from labelled points (nearest neighbours)
EXP.classify = function (root, finish) {
  var train = [[18,22,'A'],[26,30,'A'],[15,38,'A'],[32,20,'A'],[24,42,'A'],
               [72,70,'B'],[80,58,'B'],[66,82,'B'],[85,80,'B'],[60,64,'B']];
  var mystery = [[28,34],[75,72],[45,50],[62,78]];
  var i = 0, matches = 0;

  var dots = train.map(function (p) {
    return '<circle cx="' + p[0] * 2.6 + '" cy="' + p[1] * 2 + '" r="6" fill="' + (p[2] === 'A' ? '#2f7bff' : '#8b4be8') + '"/>';
  }).join('');
  root.innerHTML =
    '<p>The model has learned from these examples: <b style="color:#2f7bff">● Category A</b> and <b style="color:#8b4be8">● Category B</b>.</p>' +
    '<svg class="plot" viewBox="0 0 260 200">' + dots + '<g id="mp"></g></svg>' +
    '<p id="cq"></p><div class="btn-row"><button class="btn btn-soft" data-a="A">Category A</button><button class="btn btn-soft" data-a="B">Category B</button></div>' +
    '<p class="feedback" id="cf"></p>';

  function nearest(p) {
    var d = train.map(function (t) { return { c: t[2], d: Math.hypot(t[0] - p[0], t[1] - p[1]) }; })
                 .sort(function (a, b) { return a.d - b.d; }).slice(0, 3);
    var a = d.filter(function (x) { return x.c === 'A'; }).length;
    return a >= 2 ? 'A' : 'B';
  }
  function show() {
    var p = mystery[i];
    $('#mp', root).innerHTML = '<circle cx="' + p[0] * 2.6 + '" cy="' + p[1] * 2 + '" r="8" fill="none" stroke="#111" stroke-width="3"/><text x="' + (p[0] * 2.6 + 12) + '" y="' + (p[1] * 2 - 8) + '" font-size="14">?</text>';
    $('#cq', root).innerHTML = '<b>New data point ' + (i + 1) + '/4:</b> is it more likely Category A or B?';
  }
  show();
  $all('[data-a]', root).forEach(function (b) {
    b.addEventListener('click', function () {
      var model = nearest(mystery[i]);
      if (b.dataset.a === model) matches++;
      $('#cf', root).textContent = 'The model looked at the 3 closest examples and says: Category ' + model + '.';
      i++;
      if (i < mystery.length) { setTimeout(show, 700); }
      else { setTimeout(function () { finish('You agreed with the model ' + matches + '/4 times. Machine learning = finding patterns in examples.'); }, 700); }
    });
  });
};

// 2. Web development - style a button live
EXP.button = function (root, finish) {
  root.innerHTML =
    '<div class="two-col"><div class="controls">' +
    '<label>Button text<input id="bt" value="Join MajorMatch"></label>' +
    '<label>Colour<input type="color" id="bc" value="#5b5bf0"></label>' +
    '<label>Roundness<input type="range" id="br" min="0" max="30" value="10"></label>' +
    '<label>Size<input type="range" id="bs" min="12" max="28" value="16"></label></div>' +
    '<div class="preview-box"><button id="pb" type="button">Join MajorMatch</button></div></div>' +
    '<pre class="code" id="bcode"></pre>' +
    '<button class="btn btn-primary" id="bdone">I like my button</button>';
  var pb = $('#pb', root);
  function update() {
    var t = $('#bt', root).value || 'Button', c = $('#bc', root).value, r = $('#br', root).value, s = $('#bs', root).value;
    pb.textContent = t;
    pb.style.cssText = 'background:' + c + ';color:#fff;border:0;padding:12px 22px;cursor:pointer;border-radius:' + r + 'px;font-size:' + s + 'px';
    $('#bcode', root).textContent = 'button {\n  background: ' + c + ';\n  border-radius: ' + r + 'px;\n  font-size: ' + s + 'px;\n}';
  }
  $all('input', root).forEach(function (x) { x.addEventListener('input', update); });
  update();
  $('#bdone', root).addEventListener('click', function () { finish('That is HTML + CSS at work - the code on the left changes as you design.'); });
};

// 3. Algorithms - sort the bars by swapping
EXP.sort = function (root, finish) {
  var arr = [4, 2, 6, 1, 5, 3], sel = -1, swaps = 0;
  root.innerHTML = '<p>Click two bars to swap them. Put them in order from <b>smallest to largest</b>.</p><div class="bars" id="bars"></div><p class="feedback" id="sf">Swaps: 0</p>';
  function draw() {
    $('#bars', root).innerHTML = arr.map(function (v, i) {
      return '<div class="bar' + (i === sel ? ' sel' : '') + '" data-i="' + i + '" style="height:' + (v * 28 + 20) + 'px">' + v + '</div>';
    }).join('');
    $all('.bar', root).forEach(function (b) {
      b.addEventListener('click', function () {
        var i = +b.dataset.i;
        if (sel === -1) { sel = i; }
        else {
          if (sel !== i) { var t = arr[sel]; arr[sel] = arr[i]; arr[i] = t; swaps++; }
          sel = -1;
        }
        draw();
        $('#sf', root).textContent = 'Swaps: ' + swaps;
        var ok = arr.every(function (v, k) { return k === 0 || arr[k - 1] <= v; });
        if (ok) finish('Sorted in ' + swaps + ' swaps. Algorithms are about finding the fewest steps!');
      });
    });
  }
  draw();
};

// 4. Programming - read pseudo code and predict the output
EXP.logic_puzzle = function (root, finish) {
  var puzzles = [
    { code: 'x = 2\nrepeat 3 times:\n    x = x * 2\nprint x', opts: ['8', '12', '16', '6'], ans: '16' },
    { code: 'x = 5\nif x > 3 and x < 10:\n    print "A"\nelse:\n    print "B"', opts: ['A', 'B', 'AB', 'nothing'], ans: 'A' },
    { code: 'total = 0\nfor n in 1, 2, 3, 4:\n    if n is even:\n        total = total + n\nprint total', opts: ['10', '6', '4', '2'], ans: '6' }
  ];
  var p = 0;
  function show() {
    var q = puzzles[p];
    root.innerHTML = '<p><b>Puzzle ' + (p + 1) + '/' + puzzles.length + '</b> - what does this program print?</p><pre class="code">' + q.code + '</pre>' +
      '<div class="btn-row">' + q.opts.map(function (o) { return '<button class="btn btn-soft" data-o="' + o + '">' + o + '</button>'; }).join('') + '</div><p class="feedback" id="lf"></p>';
    $all('[data-o]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.o === q.ans) {
          p++;
          if (p < puzzles.length) { $('#lf', root).textContent = '✅ Correct!'; setTimeout(show, 600); }
          else finish('You traced code by hand - that is how programmers find bugs.');
        } else { $('#lf', root).textContent = '❌ Not quite. Go through it line by line.'; }
      });
    });
  }
  show();
};

/* ================= INFORMATION TECHNOLOGY ================= */

// 5. Databases - put items in the right table
EXP.db_sort = function (root, finish) {
  var items = [
    { t: 'Sara Ahmed', a: 'students' }, { t: 'Database Systems', a: 'courses' }, { t: 'Dr. Khaled', a: 'instructors' },
    { t: 'Omar Ali', a: 'students' }, { t: 'Web Basics', a: 'courses' }, { t: 'Dr. Huda', a: 'instructors' }
  ];
  var sel = null, done = 0;
  root.innerHTML = '<p>Pick an item, then click the <b>table</b> it belongs to.</p><div class="chips" id="pool"></div>' +
    '<div class="tables"><div class="dbtable" data-t="students"><h4>👩‍🎓 Students</h4></div><div class="dbtable" data-t="courses"><h4>📘 Courses</h4></div><div class="dbtable" data-t="instructors"><h4>👨‍🏫 Instructors</h4></div></div><p class="feedback" id="df"></p>';
  items.forEach(function (it) {
    var c = make('<button class="chip chip-btn">' + it.t + '</button>');
    c.addEventListener('click', function () { $all('.chip-btn', root).forEach(function (x) { x.classList.remove('sel'); }); sel = { it: it, el: c }; c.classList.add('sel'); });
    $('#pool', root).appendChild(c);
  });
  $all('.dbtable', root).forEach(function (t) {
    t.addEventListener('click', function () {
      if (!sel) { $('#df', root).textContent = 'Pick an item first.'; return; }
      if (sel.it.a === t.dataset.t) {
        t.appendChild(make('<div class="row-item">' + sel.it.t + '</div>'));
        sel.el.remove(); sel = null; done++;
        $('#df', root).textContent = '✅ Stored!';
        if (done === items.length) finish('Organised! Databases keep data in tidy tables so it can be found fast.');
      } else { $('#df', root).textContent = '❌ That item does not belong in this table.'; }
    });
  });
};

// 6. Networking - connect Computer -> Router -> Server
EXP.network = function (root, finish) {
  var nodes = { server: { x: 40, y: 70, e: '🗄️', n: 'Server' }, pc: { x: 150, y: 70, e: '💻', n: 'Computer' }, router: { x: 260, y: 70, e: '📡', n: 'Router' } };
  var links = [], first = null;
  root.innerHTML = '<p>Connect the devices so the computer can reach the server. Click one device, then another.</p><svg class="plot" viewBox="0 0 300 140" id="net"></svg><p class="feedback" id="nf"></p><button class="btn btn-soft" id="nreset">Clear links</button>';
  function draw() {
    var s = '';
    links.forEach(function (l) { s += '<line x1="' + nodes[l[0]].x + '" y1="' + nodes[l[0]].y + '" x2="' + nodes[l[1]].x + '" y2="' + nodes[l[1]].y + '" stroke="#5b5bf0" stroke-width="4"/>'; });
    for (var k in nodes) {
      var n = nodes[k];
      s += '<g class="node' + (first === k ? ' sel' : '') + '" data-k="' + k + '" style="cursor:pointer"><circle cx="' + n.x + '" cy="' + n.y + '" r="28" fill="#fff" stroke="#5b5bf0" stroke-width="3"/><text x="' + n.x + '" y="' + (n.y + 8) + '" text-anchor="middle" font-size="24">' + n.e + '</text><text x="' + n.x + '" y="' + (n.y + 48) + '" text-anchor="middle" font-size="12">' + n.n + '</text></g>';
    }
    $('#net', root).innerHTML = s;
    $all('.node', root).forEach(function (g) { g.addEventListener('click', function () { click(g.getAttribute('data-k')); }); });
  }
  function has(a, b) { return links.some(function (l) { return (l[0] === a && l[1] === b) || (l[0] === b && l[1] === a); }); }
  function click(k) {
    if (!first) { first = k; draw(); return; }
    if (first === k) { first = null; draw(); return; }
    var pair = [first, k].sort().join('-');
    first = null;
    if (pair === 'pc-server') { $('#nf', root).textContent = '❌ A computer cannot reach the server directly here - it needs the router in between.'; draw(); return; }
    if (!has(pair.split('-')[0], pair.split('-')[1])) links.push(pair.split('-'));
    $('#nf', root).textContent = '✅ Link added.';
    draw();
    if (has('pc', 'router') && has('router', 'server')) finish('Computer → Router → Server. You just built a tiny network!');
  }
  $('#nreset', root).addEventListener('click', function () { links = []; first = null; $('#nf', root).textContent = ''; draw(); });
  draw();
};

// 7. Web - customise a mini page
EXP.webpage = function (root, finish) {
  root.innerHTML =
    '<div class="two-col"><div class="controls">' +
    '<label>Page title<input id="wt" value="My Study Group"></label>' +
    '<label>Theme<select id="wth"><option value="light">Light</option><option value="dark">Dark</option><option value="purple">Purple</option></select></label>' +
    '<label>Text size<input type="range" id="ws" min="14" max="24" value="16"></label>' +
    '<label class="check"><input type="checkbox" id="wb" checked> Show join button</label></div>' +
    '<div class="mini-page" id="mp2"><h3 id="mpt"></h3><p>Welcome! We meet every Sunday to study together.</p><button id="mpb" type="button">Join us</button></div></div>' +
    '<button class="btn btn-primary" id="wdone">Publish my page</button>';
  var themes = { light: ['#ffffff', '#1c2340'], dark: ['#161a33', '#ffffff'], purple: ['#efe9ff', '#3b1f8f'] };
  function update() {
    var th = themes[$('#wth', root).value], pg = $('#mp2', root);
    $('#mpt', root).textContent = $('#wt', root).value;
    pg.style.background = th[0]; pg.style.color = th[1]; pg.style.fontSize = $('#ws', root).value + 'px';
    $('#mpb', root).style.display = $('#wb', root).checked ? 'inline-block' : 'none';
  }
  $all('input,select', root).forEach(function (x) { x.addEventListener('input', update); x.addEventListener('change', update); });
  update();
  $('#wdone', root).addEventListener('click', function () { finish('Published! Every website you visit is made from pieces like these.'); });
};

// 8. Cloud - drag a file to the cloud, then open it anywhere
EXP.cloud = function (root, finish) {
  var up = false;
  root.innerHTML = '<p>1) Drag the file to the cloud (or just click it).  2) Open it from another device.</p>' +
    '<div class="cloud-row"><div class="cloud-box">💻 Local computer<div class="file" id="cfile" draggable="true">📄 report.pdf</div></div><div class="arrow">➜</div>' +
    '<div class="cloud-box dropzone" id="cdrop">☁️ Cloud<div id="cstate" class="muted small">Drop here</div></div><div class="arrow">➜</div>' +
    '<div class="cloud-box">Access anywhere<div class="devices"><button class="dev" disabled data-d="📱 phone">📱</button><button class="dev" disabled data-d="💻 laptop">💻</button><button class="dev" disabled data-d="📲 tablet">📲</button></div></div></div><p class="feedback" id="cf2"></p>';
  function upload() {
    if (up) return; up = true;
    $('#cstate', root).textContent = '✅ report.pdf stored';
    $('#cfile', root).style.opacity = 0.4;
    $all('.dev', root).forEach(function (d) { d.disabled = false; });
    $('#cf2', root).textContent = 'Uploaded! Now open it from a device.';
  }
  $('#cfile', root).addEventListener('click', upload);
  $('#cfile', root).addEventListener('dragstart', function (e) { e.dataTransfer.setData('text', 'file'); });
  var z = $('#cdrop', root);
  z.addEventListener('dragover', function (e) { e.preventDefault(); z.classList.add('over'); });
  z.addEventListener('dragleave', function () { z.classList.remove('over'); });
  z.addEventListener('drop', function (e) { e.preventDefault(); z.classList.remove('over'); upload(); });
  $all('.dev', root).forEach(function (d) {
    d.addEventListener('click', function () { finish('Opened on your ' + d.dataset.d.split(' ')[1] + '! Cloud computing = your data and tools live online.'); });
  });
};

/* ================= CYBERSECURITY ================= */

// 9. Password strength
EXP.password = function (root, finish) {
  root.innerHTML = '<p>Create a password (it is not saved anywhere) and watch the meter.</p>' +
    '<input type="text" id="pw" class="wide" placeholder="Type a password..." autocomplete="off">' +
    '<div class="meter"><div class="meter-fill" id="pm"></div></div><p id="pl" class="feedback"></p><ul class="checks" id="pc"></ul>' +
    '<button class="btn btn-primary" id="pdone" disabled>Done</button>';
  var common = ['123456', 'password', 'qwerty', '12345678', 'admin', 'letmein', '111111', 'iloveyou'];
  var rules = [
    ['At least 8 characters', function (p) { return p.length >= 8; }],
    ['At least 12 characters', function (p) { return p.length >= 12; }],
    ['Has lowercase and UPPERCASE letters', function (p) { return /[a-z]/.test(p) && /[A-Z]/.test(p); }],
    ['Has a number', function (p) { return /\d/.test(p); }],
    ['Has a symbol (! @ # ...)', function (p) { return /[^A-Za-z0-9]/.test(p); }],
    ['Is not a common password', function (p) { return p.length > 0 && common.indexOf(p.toLowerCase()) === -1; }]
  ];
  $('#pw', root).addEventListener('input', function () {
    var p = this.value, n = 0;
    $('#pc', root).innerHTML = rules.map(function (r) { var ok = r[1](p); if (ok) n++; return '<li class="' + (ok ? 'ok' : '') + '">' + (ok ? '✅ ' : '⬜ ') + r[0] + '</li>'; }).join('');
    var lvl = p.length === 0 ? 0 : n;
    var names = ['', 'Very weak', 'Weak', 'Weak', 'Okay', 'Strong', 'Very strong'];
    var cols = ['#ddd', '#e5484d', '#f08a2f', '#f08a2f', '#e7c000', '#2fb36a', '#1a9d55'];
    $('#pm', root).style.width = (lvl / 6 * 100) + '%';
    $('#pm', root).style.background = cols[lvl];
    $('#pl', root).textContent = p ? 'Strength: ' + names[lvl] : '';
    $('#pdone', root).disabled = lvl < 5;
  });
  $('#pdone', root).addEventListener('click', function () { finish('Strong passwords are long and unpredictable. Security people think like this all day.'); });
};

// 10. Phishing - spot the suspicious message
EXP.phishing = function (root, finish) {
  var rounds = [
    { a: { from: 'security@qu-edu-login.verify-now.xyz', body: 'URGENT! Your account will be closed in 24 hours. Click http://qu-edu-login.verify-now.xyz and enter your password to keep it.' },
      b: { from: 'labs@university.example', body: 'Reminder: tomorrow\'s lab session is at 10:00 in Building 4. Bring your student card.' },
      bad: 'a', why: 'Red flags: fake-looking address, urgent threat, link asking for your password.' },
    { a: { from: 'library@university.example', body: 'Your library book is due Thursday. You can renew it from the library page you normally use.' },
      b: { from: 'it-help@gmail-support.example', body: 'Hi, I am from IT support. Please reply with your password so I can fix your email.' },
      bad: 'b', why: 'Red flags: real IT teams never ask for your password, and the address does not match the university.' }
  ];
  var r = 0;
  function show() {
    var q = rounds[r];
    root.innerHTML = '<p><b>Round ' + (r + 1) + '/2</b> - which message looks suspicious?</p><div class="msgs">' +
      ['a', 'b'].map(function (k) { return '<button class="msg" data-k="' + k + '"><small>From: ' + q[k].from + '</small><span>' + q[k].body + '</span></button>'; }).join('') + '</div><p class="feedback" id="phf"></p>';
    $all('.msg', root).forEach(function (m) {
      m.addEventListener('click', function () {
        if (m.dataset.k === q.bad) {
          $('#phf', root).textContent = '✅ Correct! ' + q.why;
          r++;
          if (r < rounds.length) setTimeout(show, 1800); else setTimeout(function () { finish('Phishing tricks people, not computers - spotting it is a real security skill.'); }, 1800);
        } else $('#phf', root).textContent = '❌ That one looks normal. Check the sender address and what it asks you to do.';
      });
    });
  }
  show();
};

// 11. Digital forensics - fictional case
EXP.forensics = function (root, finish) {
  var ev = [
    ['🖥️ System log', '22:03 - account "noura" copied exam_final.pdf to a USB drive on Lab-PC-3.'],
    ['🚪 Door badge records', '21:45 - noura badged OUT of the lab building.  21:50 - khaled badged IN to the lab.  Omar: no record today.'],
    ['📷 Camera note', 'Lab-PC-3 at 22:03: the person at the keyboard wears a blue jacket. Khaled wore a blue jacket today.']
  ];
  var opened = 0;
  root.innerHTML = '<p><b>Case:</b> the exam file was copied to a USB drive. Open the evidence, then name the person who did it.</p><div class="evidence" id="ev"></div>' +
    '<div class="btn-row"><button class="btn btn-soft" data-s="noura">Noura</button><button class="btn btn-soft" data-s="khaled">Khaled</button><button class="btn btn-soft" data-s="omar">Omar</button></div><p class="feedback" id="ff"></p>';
  ev.forEach(function (e) {
    var b = make('<button class="evidence-card">' + e[0] + '<span class="hidden">' + e[1] + '</span></button>');
    b.addEventListener('click', function () { if (!b.classList.contains('open')) { b.classList.add('open'); opened++; } });
    $('#ev', root).appendChild(b);
  });
  $all('[data-s]', root).forEach(function (b) {
    b.addEventListener('click', function () {
      if (opened < 3) { $('#ff', root).textContent = 'Open all the evidence first - one clue is never enough.'; return; }
      if (b.dataset.s === 'khaled') finish('Khaled used Noura\'s logged-in account. Forensics = combining small clues into a story.');
      else $('#ff', root).textContent = '❌ Compare the badge times with the log time again.';
    });
  });
};

// 12. Ethical hacking - find the weakness (fictional, safe)
EXP.weakness = function (root, finish) {
  var step = 1;
  function s1() {
    root.innerHTML = '<p>You are a security tester for a <b>fictional</b> student-club website. Which setting is the weakness?</p><div class="settings">' +
      [['Connection', 'HTTPS enabled', 0], ['Admin password', '"admin123"', 1], ['Failed logins', 'Locked after 5 tries', 0], ['Stored passwords', 'Hashed', 0]]
        .map(function (r) { return '<button class="setting" data-w="' + r[2] + '"><b>' + r[0] + '</b><span>' + r[1] + '</span></button>'; }).join('') + '</div><p class="feedback" id="wf"></p>';
    $all('.setting', root).forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.w === '1') { $('#wf', root).textContent = '✅ Found it! Guessable passwords are one of the most common weaknesses.'; setTimeout(s2, 1400); }
        else $('#wf', root).textContent = '❌ That setting is fine. Look for something easy to guess.';
      });
    });
  }
  function s2() {
    root.innerHTML = '<p>Now suggest the fix. What should the club do?</p><div class="settings">' +
      [['Hide the login page', 0], ['Use a long, unique password and turn on two-step verification', 1], ['Change "admin123" to "admin124"', 0]]
        .map(function (r) { return '<button class="setting" data-w="' + r[1] + '"><span>' + r[0] + '</span></button>'; }).join('') + '</div><p class="feedback" id="wf"></p>';
    $all('.setting', root).forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.w === '1') finish('Ethical hackers find weaknesses so they can be fixed - with permission, always.');
        else $('#wf', root).textContent = '❌ That would not stop a determined attacker.';
      });
    });
  }
  s1();
};

/* ================= COMPUTER ENGINEERING ================= */

// 13. Robotics - program a robot on a grid
EXP.robot = function (root, finish) {
  var N = 6, walls = ['1,1', '3,0', '3,1', '1,3', '4,3', '2,4', '4,5'], goal = [5, 5];
  var queue = [], busy = false;
  root.innerHTML = '<p>Build a command list with the arrows, then press <b>Run</b>. Reach the ⭐ without hitting 🧱.</p><div class="grid" id="rg"></div>' +
    '<div class="btn-row"><button class="btn btn-soft" data-c="U">⬆️</button><button class="btn btn-soft" data-c="D">⬇️</button><button class="btn btn-soft" data-c="L">⬅️</button><button class="btn btn-soft" data-c="R">➡️</button>' +
    '<button class="btn btn-primary" id="rrun">▶ Run</button><button class="btn btn-soft" id="rclr">Clear</button></div><p class="feedback" id="rq"></p>';
  function draw(pos) {
    var h = '';
    for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
      var c = '';
      if (pos[0] === x && pos[1] === y) c = '🤖'; else if (walls.indexOf(x + ',' + y) > -1) c = '🧱'; else if (x === goal[0] && y === goal[1]) c = '⭐';
      h += '<div class="cell">' + c + '</div>';
    }
    $('#rg', root).innerHTML = h;
  }
  function show() { $('#rq', root).textContent = 'Commands: ' + (queue.map(function (c) { return { U: '⬆️', D: '⬇️', L: '⬅️', R: '➡️' }[c]; }).join(' ') || '(none yet)'); }
  $all('[data-c]', root).forEach(function (b) { b.addEventListener('click', function () { if (!busy) { queue.push(b.dataset.c); show(); } }); });
  $('#rclr', root).addEventListener('click', function () { if (!busy) { queue = []; show(); draw([0, 0]); } });
  $('#rrun', root).addEventListener('click', function () {
    if (busy || !queue.length) return;
    busy = true;
    var pos = [0, 0], i = 0;
    draw(pos);
    var t = setInterval(function () {
      if (i >= queue.length) {
        clearInterval(t); busy = false;
        if (pos[0] === goal[0] && pos[1] === goal[1]) finish('The robot reached the goal in ' + queue.length + ' commands. Robotics = software that moves hardware.');
        else { $('#rq', root).textContent = 'The robot stopped at the wrong place. Clear and try a new path.'; queue = []; }
        return;
      }
      var c = queue[i++], nx = pos[0] + (c === 'R') - (c === 'L'), ny = pos[1] + (c === 'D') - (c === 'U');
      if (nx < 0 || ny < 0 || nx >= N || ny >= N || walls.indexOf(nx + ',' + ny) > -1) {
        clearInterval(t); busy = false; queue = [];
        $('#rq', root).textContent = '💥 The robot bumped into something! Clear and try again.';
        return;
      }
      pos = [nx, ny]; draw(pos);
    }, 350);
  });
  draw([0, 0]); show();
};

// 14. Embedded systems - LEDs as binary
EXP.leds = function (root, finish) {
  var targets = [5, 10, 18], t = 0, state = [0, 0, 0, 0, 0, 0, 0, 0];
  root.innerHTML = '<p>Each LED is one bit. Light the LEDs so the board shows the number <b id="tg"></b>.</p><div class="leds" id="lr"></div><p class="feedback" id="lv"></p>';
  function val() { return state.reduce(function (a, b) { return a * 2 + b; }, 0); }
  function draw() {
    $('#tg', root).textContent = targets[t];
    $('#lr', root).innerHTML = state.map(function (s, i) {
      return '<div class="led-col"><div class="led' + (s ? ' on' : '') + '"></div><button class="btn btn-soft btn-small" data-i="' + i + '">' + (s ? 'ON' : 'OFF') + '</button><small>' + Math.pow(2, 7 - i) + '</small></div>';
    }).join('');
    $('#lv', root).textContent = 'Binary ' + state.join('') + ' = ' + val();
    $all('[data-i]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        state[+b.dataset.i] ^= 1; draw();
        if (val() === targets[t]) {
          t++;
          if (t >= targets.length) finish('You programmed a binary display - this is how embedded devices show numbers.');
          else { state = [0, 0, 0, 0, 0, 0, 0, 0]; setTimeout(draw, 500); $('#lv', root).textContent = '✅ Correct! Next number...'; }
        }
      });
    });
  }
  draw();
};

// 15. Digital logic - AND / OR gates
EXP.gates = function (root, finish) {
  var A = 0, B = 0, gate = 'AND', task = 0;
  var tasks = [
    { t: 'With the <b>AND</b> gate, make the output light up.', ok: function () { return gate === 'AND' && out() === 1; } },
    { t: 'With the <b>OR</b> gate, light the output while input <b>B is OFF</b>.', ok: function () { return gate === 'OR' && B === 0 && out() === 1; } },
    { t: 'With the <b>AND</b> gate, keep <b>A ON</b> but make the output go OFF.', ok: function () { return gate === 'AND' && A === 1 && out() === 0; } }
  ];
  function out() { return gate === 'AND' ? (A & B) : (A | B); }
  function draw() {
    root.innerHTML = '<p><b>Task ' + (task + 1) + '/3:</b> ' + tasks[task].t + '</p><div class="logic">' +
      '<div class="inputs"><button class="toggle ' + (A ? 'on' : '') + '" id="ga">A = ' + A + '</button><button class="toggle ' + (B ? 'on' : '') + '" id="gb">B = ' + B + '</button></div>' +
      '<div class="gate-box">' + gate + '</div><div class="out-led ' + (out() ? 'on' : '') + '">' + out() + '</div></div>' +
      '<div class="btn-row"><button class="btn btn-soft' + (gate === 'AND' ? ' active' : '') + '" data-g="AND">AND gate</button><button class="btn btn-soft' + (gate === 'OR' ? ' active' : '') + '" data-g="OR">OR gate</button></div>';
    $('#ga', root).addEventListener('click', function () { A ^= 1; check(); });
    $('#gb', root).addEventListener('click', function () { B ^= 1; check(); });
    $all('[data-g]', root).forEach(function (b) { b.addEventListener('click', function () { gate = b.dataset.g; check(); }); });
  }
  function check() {
    if (tasks[task].ok()) {
      task++;
      if (task >= tasks.length) { draw(); finish('AND needs both inputs ON, OR needs at least one. Every processor is built from gates like these.'); return; }
    }
    draw();
  }
  draw();
};

// 16. Computer vision - a camera detects an object
EXP.vision = function (root, finish) {
  var obj = '⚽', x = 40, y = 60, hits = {};
  root.innerHTML = '<p>Click inside the scene to place an object. The <b>camera</b> only sees inside the dashed frame. Detect 3 different objects.</p>' +
    '<div class="btn-row"><button class="btn btn-soft active" data-o="⚽">⚽ Ball</button><button class="btn btn-soft" data-o="🍎">🍎 Apple</button><button class="btn btn-soft" data-o="🚗">🚗 Car</button></div>' +
    '<div class="scene" id="sc"><div class="frame"></div><div class="thing" id="th">⚽</div><div class="bbox" id="bb"></div></div>' +
    '<label class="slider-label">Detection threshold: <b id="tv">70</b>%<input type="range" id="thr" min="50" max="95" value="70"></label><p class="feedback" id="vf">Nothing detected yet.</p>';
  var names = { '⚽': 'ball', '🍎': 'apple', '🚗': 'car' };
  var sc = $('#sc', root);
  function update() {
    var w = sc.clientWidth, h = sc.clientHeight;
    var th = $('#th', root), bb = $('#bb', root);
    th.textContent = obj; th.style.left = x + 'px'; th.style.top = y + 'px';
    // the camera frame covers the middle 60% of the scene
    var fx0 = w * 0.2, fx1 = w * 0.8, fy0 = h * 0.15, fy1 = h * 0.85;
    var cx = x + 20, cy = y + 20;
    var inside = cx > fx0 && cx < fx1 && cy > fy0 && cy < fy1;
    var dx = Math.abs(cx - w / 2) / (w / 2), dy = Math.abs(cy - h / 2) / (h / 2);
    var conf = Math.max(0, Math.round(99 - (dx + dy) * 38));
    var thr = +$('#thr', root).value;
    $('#tv', root).textContent = thr;
    if (inside && conf >= thr) {
      bb.style.display = 'block'; bb.style.left = (x - 4) + 'px'; bb.style.top = (y - 4) + 'px';
      bb.textContent = names[obj] + ' ' + conf + '%';
      $('#vf', root).textContent = '✅ Detected: ' + names[obj] + ' (' + conf + '% sure)';
      hits[obj] = 1;
      if (Object.keys(hits).length >= 3) finish('The "camera" found 3 objects. Real computer vision learns this from thousands of images.');
    } else {
      bb.style.display = 'none';
      $('#vf', root).textContent = inside ? 'Seen, but not sure enough (' + conf + '%). Lower the threshold or move to the centre.' : 'Object is outside the camera frame - not detected.';
    }
  }
  sc.addEventListener('click', function (e) {
    var r = sc.getBoundingClientRect();
    x = Math.max(0, Math.min(sc.clientWidth - 40, e.clientX - r.left - 20));
    y = Math.max(0, Math.min(sc.clientHeight - 40, e.clientY - r.top - 20));
    update();
  });
  $all('[data-o]', root).forEach(function (b) { b.addEventListener('click', function () { obj = b.dataset.o; $all('[data-o]', root).forEach(function (z) { z.classList.remove('active'); }); b.classList.add('active'); update(); }); });
  $('#thr', root).addEventListener('input', update);
  setTimeout(update, 50);
};

// 17. Image processing - filters on a picture
EXP.image = function (root, finish) {
  root.innerHTML = '<p>Pick filters to change the picture pixel by pixel. Try at least 3.</p><canvas id="cv" width="300" height="180" class="canvas"></canvas>' +
    '<div class="btn-row" id="fb"></div><label class="slider-label">Brightness<input type="range" id="br2" min="-60" max="60" value="0"></label><p class="feedback" id="if"></p>';
  var cv = $('#cv', root), ctx = cv.getContext('2d'), tried = {}, current = 'original';
  // draw a simple picture
  function base() {
    var g = ctx.createLinearGradient(0, 0, 0, 180); g.addColorStop(0, '#4aa3ff'); g.addColorStop(1, '#d8f0ff');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 300, 180);
    ctx.fillStyle = '#ffcc33'; ctx.beginPath(); ctx.arc(240, 40, 24, 0, 7); ctx.fill();
    ctx.fillStyle = '#3aa655'; ctx.beginPath(); ctx.ellipse(80, 190, 140, 70, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#2d8a46'; ctx.beginPath(); ctx.ellipse(250, 195, 120, 55, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#e5484d'; ctx.fillRect(110, 90, 70, 50);
    ctx.fillStyle = '#8b4be8'; ctx.beginPath(); ctx.moveTo(100, 92); ctx.lineTo(145, 55); ctx.lineTo(190, 92); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillRect(135, 105, 20, 35);
  }
  function apply() {
    base();
    var img = ctx.getImageData(0, 0, 300, 180), d = img.data, b = +$('#br2', root).value;
    for (var i = 0; i < d.length; i += 4) {
      var r = d[i], g = d[i + 1], bl = d[i + 2];
      if (current === 'gray') { r = g = bl = 0.3 * r + 0.59 * g + 0.11 * bl; }
      else if (current === 'invert') { r = 255 - r; g = 255 - g; bl = 255 - bl; }
      else if (current === 'sepia') { var nr = 0.393 * r + 0.769 * g + 0.189 * bl, ng = 0.349 * r + 0.686 * g + 0.168 * bl, nb = 0.272 * r + 0.534 * g + 0.131 * bl; r = nr; g = ng; bl = nb; }
      else if (current === 'bw') { var v = (0.3 * r + 0.59 * g + 0.11 * bl) > 128 ? 255 : 0; r = g = bl = v; }
      d[i] = Math.max(0, Math.min(255, r + b)); d[i + 1] = Math.max(0, Math.min(255, g + b)); d[i + 2] = Math.max(0, Math.min(255, bl + b));
    }
    ctx.putImageData(img, 0, 0);
  }
  [['original', 'Original'], ['gray', 'Grayscale'], ['invert', 'Invert'], ['sepia', 'Sepia'], ['bw', 'Black & white']].forEach(function (f) {
    var b = make('<button class="btn btn-soft">' + f[1] + '</button>');
    b.addEventListener('click', function () {
      current = f[0]; tried[f[0]] = 1; apply();
      $('#if', root).textContent = 'Filters tried: ' + Object.keys(tried).length + '/3';
      if (Object.keys(tried).length >= 3) finish('Each filter is just maths applied to every pixel. That is image processing.');
    });
    $('#fb', root).appendChild(b);
  });
  $('#br2', root).addEventListener('input', apply);
  apply();
};

/* ================= RUNNER: opens an experience inside its card and asks for a rating ================= */
document.addEventListener('DOMContentLoaded', function () {
  $all('.exp-card').forEach(function (card) {
    var type = card.dataset.type;
    var body = $('.exp-body', card);
    var btn = $('.exp-start', card);
    if (!EXP[type]) return;

    function paintRated() {
      var r = MMState.get().ratings[type];
      var tag = $('.exp-rated', card);
      tag.textContent = r ? { love: '❤️ Loved it', ok: '🙂 It was okay', no: '😐 Not really' }[r] : '';
    }
    paintRated();

    btn.addEventListener('click', function () {
      if (card.classList.contains('open')) { card.classList.remove('open'); body.innerHTML = ''; btn.textContent = 'Try it'; return; }
      card.classList.add('open'); btn.textContent = 'Close';
      body.innerHTML = '<div class="exp-stage"></div><div class="exp-end"></div>';
      var stage = $('.exp-stage', body), end = $('.exp-end', body);
      EXP[type](stage, function (msg) {
        if (end.innerHTML) return;
        end.innerHTML = '<div class="success">🎉 ' + msg + '</div><h4>Did you enjoy this?</h4>' +
          '<div class="rate-row"><button class="rate" data-r="love">❤️ Loved it</button><button class="rate" data-r="ok">🙂 It was okay</button><button class="rate" data-r="no">😐 Not really</button></div><p class="feedback" id="rmsg"></p>';
        $all('.rate', end).forEach(function (rb) {
          rb.addEventListener('click', function () {
            MMState.rate(type, rb.dataset.r);
            $all('.rate', end).forEach(function (z) { z.classList.remove('chosen'); });
            rb.classList.add('chosen');
            $('#rmsg', end).innerHTML = 'Saved to your profile! <a href="explore.php">See your interests →</a>';
            paintRated();
            if (window.updateExploreCount) window.updateExploreCount();
          });
        });
        end.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });
  });
});
