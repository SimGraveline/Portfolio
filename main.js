(function(){
  var top = document.getElementById('siteTop');
  var root = document.documentElement;
  var compact = false;

  // The page keeps room for the full header (--top-h); anchors use the compact height (--top-h-c).
  function measure(){
    top.classList.remove('is-compact');
    var full = top.offsetHeight;
    top.classList.add('is-compact');
    var small = top.offsetHeight;
    top.classList.toggle('is-compact', compact);
    root.style.setProperty('--top-h', full + 'px');
    root.style.setProperty('--top-h-c', small + 'px');
  }
  function onScroll(){
    var y = window.scrollY;
    if (!compact && y > 90) { compact = true; top.classList.add('is-compact'); }
    else if (compact && y < 30) { compact = false; top.classList.remove('is-compact'); }
  }
  measure();
  onScroll();
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  window.addEventListener('scroll', onScroll, { passive: true });

  var nav = document.getElementById('siteNav');
  var toggle = document.getElementById('navToggle');
  var items = nav.querySelectorAll('.nav-item');

  function closeAll(except){
    items.forEach(function(it){
      if (it === except) return;
      it.classList.remove('open');
      it.querySelector('.nav-btn').setAttribute('aria-expanded', 'false');
    });
  }

  items.forEach(function(it){
    var btn = it.querySelector('.nav-btn');
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var open = !it.classList.contains('open');
      closeAll(it);
      it.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    it.querySelectorAll('.submenu a').forEach(function(a){
      a.addEventListener('click', function(){
        closeAll();
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  });

  toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.addEventListener('click', function(){ closeAll(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeAll(); });
})();

/* ---------- Published Games ---------- */
(function(){
  var IMG = 'img/sim-graveline-';
  var GAMES = [
    {"title": "DICEBITS", "year": "2026", "platforms": "GBA, GB, GBC, GEN, NES, PICO-8, HTML", "engine": "GameMaker, Homemade", "role": "Solo Developer", "company": "Grave Games", "img": "dicebits.png", "link": "dicebits.html"},
    {"title": "Mighty Cuphead Adventure", "year": "TBA", "platforms": "Steam, PS5, Xbox Series, SMS", "engine": "Unity, Tiled", "role": "Level Designer", "company": "Studio MDHR", "img": "cuphead.jpg", "link": "https://mightycuphead.com/"},
    {"title": "Teenage Mutant Ninja Turtles: Shredder's Revenge", "year": "2022", "platforms": "Steam, PS4, Xbox One, Switch, Mobile", "engine": "In-House Engine", "role": "Level Designer", "company": "Tribute Games", "img": "tmnt.jpg", "link": "https://store.steampowered.com/app/1361510/Teenage_Mutant_Ninja_Turtles_Shredders_Revenge/"},
    {"title": "Steel Assault", "year": "2021", "platforms": "Steam, PS4, Xbox One, Switch", "engine": "In-House Engine, Tiled", "role": "Level Designer (additional)", "company": "Tribute Games", "img": "steel-assault-cover1.jpg", "link": "https://store.steampowered.com/app/1280300/Steel_Assault/"},
    {"title": "Panzer Paladin", "year": "2020", "platforms": "Steam, PS4, Xbox One, Switch", "engine": "In-House Engine", "role": "Lead Level Designer", "company": "Tribute Games", "img": "panzer.jpg", "link": "https://store.steampowered.com/app/975510/Panzer_Paladin/"},
    {"title": "Night Lights", "year": "2019", "platforms": "Steam, PS4, Xbox One, Switch", "engine": "Unity", "role": "Game Design Consultant", "company": "Grave Danger Games / Meridian 4", "img": "night.jpg", "link": "https://store.steampowered.com/app/590850/Night_Lights/"},
    {"title": "AFTERGRINDER", "year": "2017", "platforms": "Steam", "engine": "GameMaker", "role": "Producer, Creative Director", "company": "Grave Danger Games / Meridian 4", "img": "aftergrinder.jpg", "italic": true, "link": "https://store.steampowered.com/app/618310/AFTERGRINDER/"},
    {"title": "Soulless: Ray of Hope", "year": "2016", "platforms": "Steam", "engine": "Unity", "role": "Game Design Consultant", "company": "Frisky Fatal / Meridian 4", "img": "soulless.jpg", "link": "https://store.steampowered.com/app/528300/Soulless_Ray_Of_Hope/"},
    {"title": "Assassin's Creed: Brotherhood", "year": "2010", "platforms": "PC, PS3, Xbox 360", "engine": "In-House Engine", "role": "Game Designer (missions)", "company": "Ubisoft Montreal", "img": "assassin_show.jpg", "link": "https://store.steampowered.com/app/48190/Assassins_Creed_Brotherhood/"},
    {"title": "Shorts", "year": "2009", "platforms": "DS", "engine": "In-House Engine", "role": "Level Designer", "company": "Behaviour Interactive / Majesco", "img": "shorts.jpg"},
    {"title": "Petz Sports", "year": "2008", "platforms": "Wii", "engine": "In-House Engine", "role": "Lead Game Designer", "company": "Ubisoft Montreal", "img": "petz.jpg"},
    {"title": "My Weight Loss Coach", "year": "2008", "platforms": "DS, Mobile", "engine": "In-House Engine", "role": "Lead Game Designer", "company": "Ubisoft Montreal", "img": "weight.jpg"},
    {"title": "Thrillville: Off the Rails", "year": "2007", "platforms": "DS", "engine": "In-House Engine", "role": "Game Designer (mini-games)", "company": "DC Studios / Lucas Arts", "img": "thrillville.jpg"},
    {"title": "Code Lyoko", "year": "2007", "platforms": "DS", "engine": "In-House Engine", "role": "Lead Game Designer, Level Designer", "company": "DC Studios / Game Factory", "img": "codelyoko.jpg"},
    {"title": "Hannah Montana", "year": "2006", "platforms": "DS", "engine": "In-House Engine", "role": "Lead Game Designer, Level Designer, Narrative Designer", "company": "DC Studios / Disney-BVG", "img": "hannah.jpg"},
    {"title": "State of Emergency 2", "year": "2006", "platforms": "PS2", "engine": "In-House Engine", "role": "Tester (uncredited)", "company": "DC Studios, SouthPeak Interactive", "img": "state.jpg"},
    {"title": "Winx Club", "year": "2006 (PC-PS2), 2005(GBA)", "platforms": "PC, PS2, GBA", "engine": "In-House Engine", "role": "Lead Tester, Video Sequencer", "company": "DC Studios, Konami", "img": "winx.jpg"},
    {"title": "Whac-A-Mole", "year": "2005", "platforms": "DS, GBA", "engine": "In-House Engine", "role": "Lead Tester", "company": "DC Studios, Activision", "img": "whac.jpg"},
    {"title": "Rayman 2: the Great Escape", "year": "2005 (DS), 1999 (PC-N64)", "platforms": "PC, N64, DS", "engine": "In-House Engine", "role": "Tester", "company": "DC Studios / Ubisoft Montreal", "img": "rayman.jpg"},
    {"title": "Disney Cinderella's Magical Dreams", "year": "2005", "platforms": "GBA", "engine": "In-House Engine", "role": "Level Designer, Tester, Production Assistant", "company": "DC Studios, Disney-BVG", "img": "cinderalla.jpg"},
    {"title": "Fear Factor Unleashed", "year": "2004", "platforms": "GBA", "engine": "In-House Engine", "role": "Level Designer, Tester, Production Assistant", "company": "DC Studios, HIP Games", "img": "fear.jpg"},
    {"title": "Kratt Brothers - Be the Creature", "year": "2004", "platforms": "PC (dvd bonus)", "engine": "In-House Engine", "role": "Tester", "company": "DC Studios, National Geographic", "img": "kratt.jpg"},
    {"title": "Disney's Mini-Golf", "year": "2004", "platforms": "PC (web portal)", "engine": "In-House Engine", "role": "Tester", "company": "DC Studios, Disney-BVG"},
    {"title": "Kenny vs Spenny: Versusville", "year": "2004", "platforms": "PC", "engine": "In-House Engine", "role": "Tester", "company": "DC Studios, CBC", "img": "kennyspenny.jpg", "link": "https://versusville.com/"},
    {"title": "Speed Devils", "year": "1999", "platforms": "DC", "engine": "In-House Engine", "role": "Tester (uncredited)", "company": "Ubisoft Montreal", "img": "speeddevils.jpg"}
  ];

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }
  function row(k, v){ return '<div class="g-row"><span class="g-label">' + k + '</span><span class="g-value">' + esc(v) + '</span></div>'; }

  function render(gridId, list, rowsFn){
    var grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = list.map(function(g){
      var art = g.img
        ? '<div class="g-art' + (g.fit ? ' g-' + g.fit : '') + '" style="background-image:url(\'' + IMG + g.img + '\')"></div>'
        : '<div class="g-art g-placeholder' + (g.fit === 'portrait' ? ' g-portrait' : '') + '"><span>Cover unavailable</span></div>';
      var tag = g.link ? 'a' : 'article';
      var external = g.link && /^https?:/.test(g.link);
      var attrs = g.link ? ' class="game-card has-link" href="' + esc(g.link) + '"' + (external ? ' target="_blank" rel="noopener"' : '') : ' class="game-card"';
      return '<' + tag + attrs + '>' + art +
        '<div class="g-info">' +
          '<h3' + (g.italic ? ' class="g-italic"' : '') + '>' + esc(g.title) + '</h3>' +
          (g.year ? '<p class="g-year">' + esc(g.year) + '</p>' : '') +
          '<p class="g-role">' + esc(g.role) + '</p>' +
          rowsFn(g) +
        '</div></' + tag + '>';
    }).join('');
  }

  render('publishedGrid', GAMES, function(g){
    return row('Developer / Publisher', g.company) + row('Platform(s)', g.platforms) + row('Game Engine(s)', g.engine);
  });

  /* ---------- Cancelled Games ---------- */
  var CANCELLED = [
    { title: 'G.I. Joe: Snake Eyes', platforms: 'PC, PS5, Xbox Series', engine: 'Unreal', role: 'Game Designer (Enemy AI)', company: 'Atomic Arcade', img: 'snakeeyes.jpg' },
    { title: 'Angry Birds "battle royale"', platforms: 'TBD', engine: 'Unity', role: 'Game Designer (systems)', company: 'Rovio Montreal', img: 'angrybirds.jpg' },
    { title: 'Legacy of Kain "sequel"', platforms: 'TBD', engine: 'Unreal', role: 'Game Designer (quests)', company: 'Eidos Montreal', img: 'kain.jpg' },
    { title: 'Rainbow Six Patriots', platforms: 'PC, PS4, Xbox One', engine: 'In-House Engine', role: 'Lead Game Designer', company: 'Ubisoft Montreal', img: 'rainbow.jpg' },
    { title: 'Just Dance Kinect', platforms: 'Kinect', engine: 'In-House Engine', role: 'Lead Game Designer', company: 'Ubisoft Montreal', img: 'justdance.jpg' },
    { title: 'James Noir 2', platforms: 'Wii-U', engine: 'In-House Engine', role: 'Lead Game Designer', company: 'Ubisoft Montreal', img: 'james.jpg' },
    { title: 'Blob Kinect', platforms: 'Kinect', engine: 'In-House Engine', role: 'Lead Game Designer', company: 'Ubisoft Montreal' },
    { title: 'Shaun White Skateboarding', platforms: 'PSP', engine: 'In-House Engine', role: 'Lead Game Designer', company: 'Ubisoft Montreal', img: 'shaunwhite.jpg' }
  ].map(function(g){ g.year = 'Cancelled'; return g; });

  render('cancelledGrid', CANCELLED, function(g){
    return row('Developer', g.company) + row('Platform(s)', g.platforms) + row('Engine(s)', g.engine);
  });

  /* ---------- GBA Videos ---------- */
  var GBA_META = ["2004–2005", "Video Sequencer, Menu Artist, Tester", "DC Studios / Majesco", "GBA"];
  var GBA = [
    {"t": "All Grown Up!: Volume 1", "y": "2004", "i": "gbav-all-grown-up-volume-1.jpg"},
    {"t": "Cartoon Network Collection: Volume 1", "y": "2004", "i": "gbav-cartoon-network-collection-volume-1.jpg"},
    {"t": "Cartoon Network Collection: Volume 2", "y": "2004", "i": "gbav-cartoon-network-collection-volume-2.jpg"},
    {"t": "Cartoon Network Collection: Premium Edition", "y": "2004", "i": "gbav-cartoon-network-collection-premium-edition.jpg"},
    {"t": "Cartoon Network Collection: Special Edition", "y": "2004", "i": "gbav-cartoon-network-collection-special-edition.jpg"},
    {"t": "Cartoon Network Collection: Limited Edition", "y": "2004", "i": "gbav-cartoon-network-collection-limited-edition.jpg"},
    {"t": "Cartoon Network Collection: Platinum Edition", "y": "2005", "i": "gbav-cartoon-network-collection-platinum-edition.jpg"},
    {"t": "Codename: Kids Next Door: Volume 1", "y": "2004", "i": "gbav-codename-kids-next-door-volume-1.jpg"},
    {"t": "Disney Channel Collection: Volume 1", "y": "2004", "i": "gbav-disney-channel-collection-volume-1.jpg"},
    {"t": "Disney Channel Collection: Volume 2", "y": "2005", "i": "gbav-disney-channel-collection-volume-2.jpg"},
    {"t": "Dora the Explorer: Volume 1", "y": "2004", "i": "gbav-dora-the-explorer-volume-1.jpg"},
    {"t": "Dragon Ball GT: Volume 1", "y": "2004", "i": "gbav-dragon-ball-gt-volume-1.jpg"},
    {"t": "Dragon Ball GT: Volume 2", "y": "Unreleased"},
    {"t": "Nicktoons Collection: Volume 1", "y": "2004", "i": "gbav-nicktoons-collection-volume-1.jpg"},
    {"t": "Nicktoons Collection: Volume 2", "y": "2004", "i": "gbav-nicktoons-collection-volume-2.jpg"},
    {"t": "Nicktoons Collection: Volume 3", "y": "2005", "i": "gbav-nicktoons-collection-volume-3.jpg"},
    {"t": "Sonic X: A Super Sonic Hero", "y": "2004", "i": "gbav-sonic-x-a-super-sonic-hero.jpg"},
    {"t": "Sonic X: Chaos Emerald Chaos", "y": "Unreleased"},
    {"t": "SpongeBob SquarePants: Volume 1", "y": "2004", "i": "gbav-spongebob-squarepants-volume-1.jpg"},
    {"t": "SpongeBob SquarePants: Volume 2", "y": "2004", "i": "gbav-spongebob-squarepants-volume-2.jpg"},
    {"t": "SpongeBob SquarePants: Volume 3", "y": "2004", "i": "gbav-spongebob-squarepants-volume-3.jpg"},
    {"t": "Strawberry Shortcake: Volume 1", "y": "2004", "i": "gbav-strawberry-shortcake-volume-1.jpg"},
    {"t": "Strawberry Shortcake: Volume 2", "y": "Unreleased"},
    {"t": "Super Robot Monkey Team Hyperforce Go!: Volume 1", "y": "2005", "i": "gbav-super-robot-monkey-team-hyperforce-go-volume-1.jpg"},
    {"t": "Teenage Mutant Ninja Turtles: The Shredder Strikes", "y": "Unreleased"},
    {"t": "Teenage Mutant Ninja Turtles: Things Change", "y": "2004", "i": "gbav-teenage-mutant-ninja-turtles-things-change.jpg"},
    {"t": "The Adventures of Jimmy Neutron, Boy Genius: Volume 1", "y": "2004", "i": "gbav-the-adventures-of-jimmy-neutron-boy-genius-volume-1.jpg"},
    {"t": "The Fairly OddParents: Volume 1", "y": "2004", "i": "gbav-the-fairly-oddparents-volume-1.jpg"},
    {"t": "The Fairly OddParents: Volume 2", "y": "2004", "i": "gbav-the-fairly-oddparents-volume-2.jpg"},
    {"t": "The Proud Family: Volume 1", "y": "2005", "i": "gbav-the-proud-family-volume-1.jpg"},
    {"t": "Yu-Gi-Oh!: Noah's Final Threat", "y": "Unreleased"},
    {"t": "Yu-Gi-Oh!: Yugi vs. Joey", "y": "2004", "i": "gbav-yu-gi-oh-yugi-vs-joey.jpg"}
  ];
  (function(){
    var meta = document.getElementById('gbaMeta');
    if (meta) meta.innerHTML = GBA_META.map(function(m){ return '<span class="gba-chip">' + esc(m) + '</span>'; }).join('');
    var grid = document.getElementById('gbaGrid');
    if (!grid) return;
    grid.innerHTML = GBA.map(function(g){
      var unrel = g.y === 'Unreleased';
      var art = g.i
        ? '<div class="gba-art" style="background-image:url(&quot;' + IMG + g.i + '&quot;)"></div>'
        : '<div class="gba-art gba-placeholder"><span>Cover unavailable</span></div>';
      return '<article class="gba-card' + (unrel ? ' is-unreleased' : '') + '">' + art +
        '<h3>' + esc(g.t) + '</h3><p class="gba-year">' + esc(g.y) + '</p></article>';
    }).join('');
  })();
})();

/* ---------- Companies ---------- */
(function(){
  var LOGO = 'img/sim-graveline-logo-';
  function logoFile(f){ return /\.[a-z]+$/.test(f) ? f : f + '.png'; }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }
  function render(id, list){
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = list.map(function(c){
      var logo = c[3]
        ? '<div class="co-logo"><img src="' + LOGO + logoFile(c[3]) + '" alt="' + esc(c[0]) + ' logo" loading="lazy"></div>'
        : '<div class="co-logo co-nologo" aria-hidden="true"></div>';
      var tag = c[4] ? 'a' : 'article';
      var attrs = c[4] ? ' class="co-card has-link" href="' + esc(c[4]) + '" target="_blank" rel="noopener"' : ' class="co-card"';
      return '<' + tag + attrs + '>' + logo + '<h3>' + esc(c[0]) + '</h3>' +
        (c[1] ? '<p class="co-years">' + esc(c[1]) + '</p>' : '') +
        (c[2] ? '<p class="co-role">' + esc(c[2]) + '</p>' : '') + '</' + tag + '>';
    }).join('');
  }

  render("studiosGrid", [
    ["Grave Games", "2026", "Solo Developer", "grave-games.jpg", "https://www.linkedin.com/company/gravegames/"],
    ["Isart Digital Montreal", "2013-2018, 2024-2025", "Head of Game Design, Teacher", "isart.svg", "https://www.isart.com/montreal/"],
    ["Studio MDHR", "2024", "Level Designer - Freelance", "studio-mdhr", "https://studiomdhr.com/"],
    ["Atomic Arcade (Hasbro / Wizards of the Coast)", "2023-2024", "Game Designer (Enemy AI) - Freelance", "atomic-arcade.jpg"],
    ["Rovio Montreal", "2022-2023", "Game Designer (systems)", "rovio"],
    ["Subliminal Entertainment (Illogika)", "2022", "Creative Director", "illogika", "https://www.illogika.com/"],
    ["Eidos Montreal", "2021-2022", "Game Designer (quests)", "eidos-montreal", "https://www.eidosmontreal.com/"],
    ["Tribute Games", "2018-2021", "Level Designer", "tribute-games", "https://tributegames.com/"],
    ["Studio XP", "2018", "Head of Study, Teacher", "studio-xp", "https://www.studioxp.online/en/"],
    ["Grave Danger Games", "2013-2017", "Co-Founder", "grave-danger-games.jpg", "https://www.linkedin.com/company/grave-danger-games/"],
    ["Ubisoft Montreal", "1999, 2007-2009, 2010-2013", "Lead Game Designer", "ubisoft-montreal", "https://montreal.ubisoft.com/en/"],
    ["Behaviour Interactive (A2M)", "2009", "Level Designer", "behaviour", "https://www.bhvr.com/"],
    ["DC Studios", "2004-2007", "Lead Game Designer, Level Designer, Lead Tester", "dc-studios"]
  ]);

  render("publishersGrid", [
    ["Activision", "", "", "activision"],
    ["Buena Vista Games (Disney)", "", "", "buena-vista-games"],
    ["Game Factory", "", "", "game-factory"],
    ["HIP Games", "", "", "hip-games"],
    ["Konami", "", "", "konami"],
    ["LucasArts", "", "", "lucasarts.svg"],
    ["Majesco", "", "", "majesco"],
    ["Meridian 4", "", "", "meridian-4"],
    ["Moon Scoop", "", "", "moon-scoop"],
    ["SouthPeak Interactive", "", "", "southpeak"]
  ]);

  render("coOthersGrid", [
    ["Archambault", "2002-2004", "Administrative Manager", "archambault"],
    ["Metro Video", "2000-2002", "Clerk Manager", "metro-video.jpg"],
    ["Pixcom Interactif", "2000", "Web Master, Integrator", "pixcom.jpg"],
    ["AT&T Canada", "1999", "Web Integrator (internship)", "att"]
  ]);
})();

/* ---------- Platforms ---------- */
(function(){
  var P = 'img/sim-graveline-platform-';
  function render(id, list){
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = list.map(function(p){
      return '<div class="plat-card" title="' + p[1] + '"><img src="' + P + p[0] + '.png" alt="' + p[1] + '" loading="lazy"></div>';
    }).join('');
  }
  render('platNintendo', [['nes','Nintendo NES'],['gb','Nintendo Game Boy'],['gbc','Nintendo Game Boy Color'],['n64','Nintendo 64'],['gba','Nintendo Game Boy Advance'],['nds','Nintendo DS'],['wii','Nintendo Wii'],['wiiu','Nintendo Wii-U'],['switch','Nintendo Switch']]);
  render('platSony', [['ps2','Sony PlayStation 2'],['ps3','Sony PlayStation 3'],['psp','Sony PlayStation Portable'],['ps4','Sony PlayStation 4']]);
  render('platMicrosoft', [['x360','Microsoft Xbox 360'],['kinect','Microsoft Kinect'],['xone','Microsoft Xbox One']]);
  render('platSega', [['sms','Sega Master System'],['genesis','Sega Genesis'],['dreamcast','Sega Dreamcast']]);
  render('platPc', [['steam','Valve Steam'],['oculus','Oculus'],['ios','Apple iOS'],['android','Google Android'],['html5','Web Browser / HTML'],['pico8','Pico-8'],['pc','PC']]);
})();

/* ---------- Contact form ---------- */
(function(){
  var form = document.getElementById('contactForm');
  if (!form) return;
  var ENDPOINT = 'https://formsubmit.co/ajax/sim.graveline@gmail.com';
  var btn = document.getElementById('cSend');
  var status = document.getElementById('cStatus');

  function setStatus(msg, kind){
    status.textContent = msg;
    status.className = 'form-status' + (kind ? ' ' + kind : '');
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var data = new FormData(form);
    if (data.get('_honey')) return; // bot
    var payload = {
      name: data.get('name'),
      email: data.get('email'),
      subject: data.get('subject'),
      message: data.get('message'),
      _subject: 'Portfolio: ' + data.get('subject'),
      _template: 'table',
      _captcha: 'false'
    };
    btn.disabled = true;
    setStatus('Sending…', '');
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function(r){ return r.json().then(function(j){ return { ok: r.ok, body: j }; }); })
      .then(function(res){
        if (res.ok && String(res.body.success) === 'true') {
          form.reset();
          setStatus('Thanks! Your message was sent.', 'ok');
        } else {
          throw new Error(res.body && res.body.message || 'send failed');
        }
      })
      .catch(function(){
        setStatus('Something went wrong. Please email me directly at sim.graveline@gmail.com.', 'err');
      })
      .then(function(){ btn.disabled = false; });
  });
})();

/* ---------- Socials ---------- */
(function(){
  var el = document.getElementById('socialsGrid');
  if (!el) return;
  var SOCIALS = [
    ['LinkedIn', 'linkedin.com/in/simgrave', 'https://www.linkedin.com/in/simgrave/', 'linkedin.png'],
    ['GitHub', 'github.com/SimGraveline', 'https://github.com/SimGraveline', 'github.png'],
    ['itch.io', 'simgraveline.itch.io', 'https://simgraveline.itch.io/', 'itch.svg']
  ];
  el.innerHTML = SOCIALS.map(function(s){
    return '<a class="co-card has-link" href="' + s[2] + '" target="_blank" rel="noopener">' +
      '<div class="co-logo"><img src="img/sim-graveline-social-' + s[3] + '" alt="' + s[0] + ' logo" loading="lazy"></div>' +
      '<h3>' + s[0] + '</h3><p class="co-years">' + s[1] + '</p></a>';
  }).join('');
})();
