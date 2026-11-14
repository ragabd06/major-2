/* Compare official course entries across selected Qassim University plans. */
document.addEventListener('DOMContentLoaded', function () {
  var picker = $('#comparePicker');
  if (!picker) return;
  var slugs = Object.keys(MAJORS), selected = [];
  var params = new URLSearchParams(location.search).get('majors');
  if (params) selected = params.split(',').filter(function (m) { return MAJORS[m]; }).slice(0, 4);
  if (selected.length < 2) selected = ['cs', 'it'];
  var allCourses = [];
  slugs.forEach(function (m) {
    var b=document.createElement('button'); b.className='pick-card'; b.dataset.m=m;
    b.innerHTML='<span>'+MAJORS[m].icon+'</span><b>'+MAJORS[m].name+'</b>';
    b.addEventListener('click',function(){ var i=selected.indexOf(m); if(i>-1){if(selected.length>2)selected.splice(i,1);else flash('Keep at least 2 majors selected.');} else if(selected.length<4)selected.push(m); render(); });
    picker.appendChild(b);
  });
  function flash(msg){var f=$('#compareMsg');f.textContent=msg;setTimeout(function(){f.textContent='';},2000);}
  function dots(n){var s='';for(var i=0;i<5;i++)s+='<i class="dot'+(i<n?' on':'')+'"></i>';return '<span class="dots" title="'+n+' / 5">'+s+'</span>'; }
  var topicRules=[
    {topic:'Programming',words:['برمجة','Programming']},
    {topic:'AI / Machine Learning',words:['ذكاء اصطناعي','تعلم الآلة','Artificial Intelligence','Machine Learning']},
    {topic:'Web',words:['الويب','Web']},
    {topic:'Networks',words:['شبكات','Networks']},
    {topic:'Security',words:['أمن','امن','تشفير','اختراق','Cybersecurity','Security','Cryptography','Hacking']},
    {topic:'Hardware / Embedded',words:['دوائر','إلكترونيات','معالج','أنظمة مدمجة','VLSI','Hardware','Embedded']},
    {topic:'Robotics / Control',words:['روبوت','تحكم','Robotics','Control']},
    {topic:'Databases',words:['قواعد بيانات','Database']},
    {topic:'Mathematics',words:['رياضيات','حساب','جبر','تفاضل','إحصاء','Mathematics','Calculus']},
    {topic:'Systems',words:['نظام التشغيل','النظم','Systems','Operating System']}
  ];
  function coverage(m,r){var n=0;allCourses.forEach(function(c){if(c.major!==m)return;var text=((c.name||'')+' '+(c.name_ar||'')+' '+(c.name_en||'')).toLowerCase();if(r.words.some(function(w){return text.indexOf(w.toLowerCase())>-1;}))n++;});return Math.min(5,n);}
  function render(){
    $all('.pick-card',picker).forEach(function(b){b.classList.toggle('selected',selected.indexOf(b.dataset.m)>-1);});
    var head='<tr><th>Topic</th>'+selected.map(function(m){return '<th>'+MAJORS[m].icon+' '+MAJORS[m].name+'</th>';}).join('')+'</tr>';
    var rows=topicRules.map(function(r){var vals=selected.map(function(m){return coverage(m,r);}),max=Math.max.apply(null,vals);return '<tr><td><b>'+r.topic+'</b></td>'+selected.map(function(m,i){return '<td class="'+(vals[i]===max&&max>0?'best':'')+'">'+dots(vals[i])+'</td>';}).join('')+'</tr>';}).join('');
    $('#topicTable').innerHTML=head+rows;
    var byCode={};
    allCourses.forEach(function(c){if(selected.indexOf(c.major)===-1)return;if(!byCode[c.code])byCode[c.code]={name:c.name,code:c.code,majors:{}};byCode[c.code].majors[c.major]=c.level;});
    var shared=[],differ=[];Object.keys(byCode).forEach(function(k){var c=byCode[k];(Object.keys(c.majors).length===selected.length?shared:differ).push(c);});
    shared.sort(function(a,b){return a.code.localeCompare(b.code);});differ.sort(function(a,b){return a.code.localeCompare(b.code);});
    $('#sharedCount').textContent=shared.length;$('#differCount').textContent=differ.length;
    $('#sharedList').innerHTML=shared.length?shared.map(function(c){return '<div class="course-row"><span class="code">'+c.code+'</span><span>'+c.name+'</span></div>';}).join(''):'<p class="muted">No shared courses in the selected plans.</p>';
    $('#differList').innerHTML=differ.length?differ.map(function(c){return '<div class="course-row"><span class="code">'+c.code+'</span><span>'+c.name+'</span><span class="tags">'+selected.map(function(m){return c.majors[m]?'<em style="background:'+MAJORS[m].color+'">'+m.toUpperCase()+'</em>':'';}).join('')+'</span></div>';}).join(''):'<p class="muted">Every course is shared.</p>';
  }
  render();
  fetch('php/get-courses.php').then(function(r){return r.json();}).then(function(data){allCourses=data;render();}).catch(function(){$('#sharedList').innerHTML='<p class="warn">Could not load courses. Open this site through a PHP server (XAMPP/WAMP), not by double-clicking the file.</p>';});
});
