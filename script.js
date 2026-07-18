    var tabstrip = document.querySelector('.tabstrip');
    var windowStack = document.getElementById('windowStack');
    var treeItems = document.querySelectorAll('.tree-item');
    var statusRight = document.getElementById('statusRight');
    var mainWorkspace = document.querySelector('main.workspace');

    function updateWorkspaceWidth(){
      var maxRight = 0;
      document.querySelectorAll('.room-proto, .obj-gallery-proto, .xp-gallery-proto').forEach(function(proto){
        var subwindows = proto.querySelector('.proto-subwindows');
        if (!subwindows) return;
        var rect = subwindows.getBoundingClientRect();
        if (rect.right > maxRight) maxRight = rect.right;
      });
      var workspaceRect = mainWorkspace.getBoundingClientRect();
      var needed = maxRight - workspaceRect.left;
      mainWorkspace.style.minWidth = Math.max(needed, 0) + 'px';
    }

    var statusMap = {
      hero: 'rm_intro: room loaded',
      travaux: 'rm_work: 3 instances',
      apropos: 'obj_sim: 2 events',
      competences: 'scr_skills.gml: ready',
      contact: 'rm_contact: ready'
    };

    function setActiveClasses(target){
      document.querySelectorAll('.tab').forEach(function(t){
        t.classList.toggle('active', t.dataset.target === target);
      });
      treeItems.forEach(function(el){
        el.classList.toggle('active', el.dataset.target === target);
      });
      updateFolderIcons();
      if (statusRight && statusMap[target]) statusRight.textContent = statusMap[target];
    }

    function updateFolderIcons(){
      var currentFolder = null;
      Array.from(document.querySelectorAll('.asset-tree > *')).forEach(function(el){
        if (el.classList.contains('tree-folder')) {
          currentFolder = el;
          currentFolder.classList.remove('has-active');
        } else if (currentFolder && el.classList.contains('tree-item') && el.classList.contains('active')) {
          currentFolder.classList.add('has-active');
        }
      });
    }

    function scrollToElement(el){
      if (!el) return;

      var rootStyle = getComputedStyle(document.documentElement);
      var headerH = parseFloat(rootStyle.getPropertyValue('--h-title')) + parseFloat(rootStyle.getPropertyValue('--h-menu'));
      var tabstripH = tabstrip ? tabstrip.getBoundingClientRect().height : 0;
      var offset = headerH + tabstripH;

      var rect = el.getBoundingClientRect();
      var elTopDoc = rect.top + window.scrollY;
      var targetScroll = elTopDoc - offset;

      window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
    }

    function scrollToSection(target){
      var el = document.getElementById('window-' + target) || document.getElementById(target);
      scrollToElement(el);
    }

    function activateTab(target, scroll){
      setActiveClasses(target);
      if (scroll !== false) scrollToSection(target);
    }

    function inferIcon(label){
      if (label.indexOf('rm_') === 0) return 'ico-room';
      if (label.indexOf('obj_') === 0) return 'ico-object';
      return 'ico-script';
    }

    var ROOM_PROJECTS = {
      level_design: {
        mighty_cuphead: {
          title: 'Mighty Cuphead Adventure',
          platforms: [
            { name: 'Steam' }, { name: 'SMS' }
          ],
          date: 'To be announced',
          trailer: 'https://www.youtube.com/watch?v=q21jZaUOa4Q',
          publisher: { name: 'Studio MDHR', url: 'https://studiomdhr.com/' },
          developer: { name: 'Studio MDHR', url: 'https://studiomdhr.com/' },
          role: 'Freelance Level Designer',
          desc: 'Using <strong>Tiled</strong> in <strong>Unity</strong>, I crafted levels inspired by themed tilesets and ingredients.'
        },
        tmnt: {
          title: "TMNT: Shredder's Revenge",
          platforms: [
            { name: 'Steam', url: 'https://store.steampowered.com/app/1361510/Teenage_Mutant_Ninja_Turtles_Shredders_Revenge/' },
            { name: 'Switch' }, { name: 'PlayStation' }, { name: 'Xbox' }, { name: 'iOS' }, { name: 'Android' }
          ],
          date: 'June 16, 2022',
          trailer: 'https://www.youtube.com/watch?v=GemOAwU-9fo',
          publisher: { name: 'Dotemu', url: 'https://www.dotemu.com/' },
          developer: { name: 'Tribute Games', url: 'https://tributegames.com/' },
          role: 'Level Designer',
          desc: 'In tight collaboration with designers, level artists, and writers, I created levels that pay homage to both the original TV series and the first line of video games based on the franchise.'
        },
        steel_assault: {
          title: 'Steel Assault',
          platforms: [
            { name: 'Steam', url: 'https://store.steampowered.com/app/1280300/Steel_Assault/' },
            { name: 'Switch' }, { name: 'PlayStation' }, { name: 'Xbox' }
          ],
          date: 'September 28, 2021',
          trailer: 'https://www.youtube.com/watch?v=IeVpQ-MHkiY',
          publisher: { name: 'Tribute Games', url: 'https://tributegames.com/' },
          developer: { name: 'Zenovia Interactive', url: 'https://zenovia.io/' },
          role: 'Additional Level Designer',
          desc: 'I was in charge of polishing the existing level design by tightening the spawn rate, level sizes, and overall cohesiveness of the game, and also had the opportunity to create a level of my own using <strong>Tiled</strong>.'
        },
        panzer_paladin: {
          title: 'Panzer Paladin',
          platforms: [
            { name: 'Steam', url: 'https://store.steampowered.com/app/975510/Panzer_Paladin/' },
            { name: 'Switch' }, { name: 'PlayStation' }, { name: 'Xbox' }, { name: 'iOS' }, { name: 'Android' }
          ],
          date: 'July 21, 2020',
          trailer: 'https://www.youtube.com/watch?v=JJHX2gWWOYA',
          publisher: { name: 'Tribute Games', url: 'https://tributegames.com/' },
          developer: { name: 'Tribute Games', url: 'https://tributegames.com/' },
          role: 'Lead Level Designer',
          desc: 'In tight collaboration with level artists and programmers, I created levels inspired by tilesets themed around world countries. I was also leading the production of the DLC, <strong>Challenge Core</strong>, producing an additional 11 levels where I was told "go all out, make them hard".'
        },
        shorts: {
          title: 'Shorts',
          platforms: [
            { name: 'Nintendo DS' }
          ],
          date: 'August 18, 2009',
          publisher: { name: 'Majesco Entertainment' },
          developer: { name: 'Behaviour Interactive', url: 'https://www.bhvr.com/' },
          role: 'Level Designer',
          desc: "During a short stint (pun intended) at Behaviour Interactive (back then known as A2M), I created around half the levels of the game, using <strong>Autodesk Maya</strong>."
        }
      },
      indie_dev: {
        dice_royal: {
          title: 'Dice Royal',
          platforms: [
            { name: 'iOS' }, { name: 'Android' }, { name: 'Netflix' },
            { name: 'Itch.io', url: 'https://simgraveline.itch.io/dice-royal-mobile' },
            { name: 'GameJolt', url: 'https://gamejolt.com/games/diceroyal/1077425' },
            { name: 'GX.Games', url: 'https://gx.games/games/aa6fvi/dice-royal-mobile/' }
          ],
          date: 'To be announced',
          publisher: { name: 'Grave Games' },
          developer: { name: 'Grave Games' },
          embed: {
            src: 'https://itch.io/embed-upload/18304738?color=000137',
            width: 384,
            height: 852,
            fallbackUrl: 'https://simgraveline.itch.io/dice-royal-mobile',
            fallbackText: 'Play Dice Royal Mobile on itch.io'
          },
          role: 'Solo developer',
          desc: "Made using <strong>GameMaker Studio</strong>, Dice Royal is an attempt at developing a mobile game with the intention of publishing it. <strong>This is a solo project where I handle the code and graphics</strong>, and use audio assets from existing libraries. It's been a long dream to have my own version of Tetris — now I do, and I'm happy with the results so far."
        },
        aftergrinder: {
          title: 'Aftergrinder',
          titleStyle: 'title-stylized',
          platforms: [
            { name: 'Steam', url: 'https://store.steampowered.com/app/618310/AFTERGRINDER/' }
          ],
          date: 'July 18, 2017',
          trailer: 'https://www.youtube.com/watch?v=_h8KR2lp_4U',
          publisher: { name: 'M4' },
          developer: { name: 'Grave Danger Games' },
          role: 'Creative Director',
          desc: "Aftergrinder started as a 5-level student project from the prototyping class I was teaching. I was so captivated by the students' work that I proposed we develop it into a full-fledged game and publish it — which we did. I handled the <strong>creative direction</strong> and acted as <strong>producer</strong>, while helping them build levels. We ended up showcasing the game at many events, including one in Oklahoma. Aftergrinder was made using <strong>GameMaker Studio</strong>."
        }
      },
      game_design: {
        night_lights: {
          title: 'Night Lights',
          platforms: [
            { name: 'Steam', url: 'https://store.steampowered.com/app/590850/Night_Lights/' }, { name: 'PlayStation' }, { name: 'Xbox' }
          ],
          date: 'June 7, 2019',
          trailer: 'https://www.youtube.com/watch?v=VQDGcSVX9wM',
          publisher: { name: 'M4' },
          developer: { name: 'Grave Danger Games' },
          role: 'Game Design Consultant',
          desc: 'On Night Lights, I was hired as a consultant to playtest the entire game, reporting walkthrough issues and providing insights on the quality and clarity of the objectives and puzzle flow across all the levels.'
        },
        soulless: {
          title: 'Soulless: Ray of Hope',
          platforms: [
            { name: 'Steam', url: 'https://store.steampowered.com/app/528300/Soulless_Ray_Of_Hope/' }
          ],
          date: 'October 18, 2016',
          trailer: 'https://www.youtube.com/watch?v=G8BcjPX8kak',
          publisher: { name: 'M4' },
          developer: { name: 'Frisky Fatal Games' },
          role: 'Game Design Consultant',
          desc: 'Another consulting gig. On this one, I simply played the game and provided an assessment of the game\'s overall qualities and state. That report was then used as a publishing agreement with the developer: "make these changes, we\'ll publish your game".'
        },
        ac_brotherhood: {
          title: "Assassin's Creed: Brotherhood",
          platforms: [
            { name: 'Steam', url: 'https://store.steampowered.com/agecheck/app/48190/' },
            { name: 'PlayStation' }, { name: 'Xbox' }
          ],
          date: 'November 16, 2010',
          trailer: 'https://www.youtube.com/watch?v=OjcYqcL0v0Q',
          publisher: { name: 'Ubisoft', url: 'https://www.ubisoft.com/en-ca' },
          developer: { name: 'Ubisoft Montreal', url: 'https://montreal.ubisoft.com/en/' },
          role: 'Mission Game Designer',
          desc: 'My first AAA title was exciting. In pre-production, I was in charge of doing concept briefs for new weapons, missions, transports, and assassinations. When we moved to production, I was assigned to the mission team, where I designed narrative missions, side quests, systemic events, rewards, and extra modes.'
        },
        thrillville: {
          title: 'Thrillville: Off the Rails',
          platforms: [
            { name: 'Nintendo DS' }
          ],
          date: 'October 8, 2007',
          publisher: { name: 'LucasArts' },
          developer: { name: 'DC Studios' },
          role: 'Mini-Game Designer',
          desc: 'With a second child and paternity leave on the way, I wasn\'t in a position to lead this project. I ended up designing all the mini-games and puzzles, which was a blast.'
        },
        snake_eyes: {
          title: 'G.I. Joe: Snake Eyes',
          platforms: [
            { name: 'Cancelled' }
          ],
          date: 'Unreleased',
          publisher: { name: 'Wizards of the Coast', url: 'https://company.wizards.com/' },
          developer: { name: 'Atomic Arcade' },
          role: 'Freelance Game Designer',
          desc: 'I was originally hired to work on the Enemy AI and combat situations, but also ended up prototyping other game mechanics in <strong>Unreal Engine</strong>. Most importantly, <strong>I was quickly put in charge of working with directors and producers to establish, document, and communicate the gameplay and narrative beats planned for the vertical slice</strong>.'
        }
      },
      design_lead: {
        rainbow_six: {
          title: 'Rainbow Six Patriots',
          platforms: [
            { name: 'Cancelled' }
          ],
          date: 'Unreleased',
          trailer: 'https://www.youtube.com/watch?v=kLhALiOnvs8',
          publisher: { name: 'Ubisoft', url: 'https://www.ubisoft.com/en-ca' },
          developer: { name: 'Ubisoft Montreal', url: 'https://montreal.ubisoft.com/en/' },
          role: 'Lead Game Designer, Enemy AI',
          desc: "I started work on R6 Patriots as an <strong>enemy / teammate AI designer</strong>, but ended up being offered the <strong>lead</strong> role. I worked closely with directors, organizing the work of my <strong>seven-person team</strong>, while overseeing the development of the AI systems. Sadly, when the project was pivoted into Siege, I wasn't brought onto the new team, which already had a lead in place."
        },
        james_noir: {
          title: 'James Noir 2',
          platforms: [
            { name: 'Nintendo Wii-U' }
          ],
          date: 'Unreleased',
          publisher: { name: 'Ubisoft', url: 'https://www.ubisoft.com/en-ca' },
          developer: { name: 'Ubisoft Montreal', url: 'https://montreal.ubisoft.com/en/' },
          role: 'Lead Game Designer, Puzzle Designer',
          desc: 'This was planned as a sequel to <strong>Hollywood Crime</strong>, released on the Nintendo 3DS. For the first and only time in my career, we were able to complete the entire "conception package" before starting production — including design for all the <strong>game mechanics</strong>, all the <strong>puzzles</strong>, the <strong>UI</strong>, and all the narrative beats. Unfortunately, the project ended up being canned.'
        },
        petz_sports: {
          title: 'Petz Sports: Dog Playground',
          platforms: [
            { name: 'Nintendo Wii' }
          ],
          date: 'November 4, 2008',
          trailer: 'https://www.youtube.com/watch?v=7pHO2Mnov4s',
          publisher: { name: 'Ubisoft', url: 'https://www.ubisoft.com/en-ca' },
          developer: { name: 'Ubisoft Montreal', url: 'https://montreal.ubisoft.com/en/' },
          role: 'Lead Game Designer',
          desc: 'On this project, <strong>I managed a team of three</strong>, and my first mandate was to trim the overscoped design in order to ship on time. <strong>I spent the first two weeks assessing the state of the project and made drastic cuts</strong>. <strong>We shipped on time</strong>.'
        },
        weight_loss_coach: {
          title: 'My Weight Loss Coach',
          platforms: [
            { name: 'Nintendo DS' }, { name: 'iOS' }
          ],
          date: 'June 24, 2008',
          publisher: { name: 'Ubisoft', url: 'https://www.ubisoft.com/en-ca' },
          developer: { name: 'Ubisoft Montreal', url: 'https://montreal.ubisoft.com/en/' },
          role: 'Lead Game Designer',
          desc: '"Bamboo" was the project\'s codename. <strong>With my team of two designers</strong>, we designed the entire <strong>game on paper, displayed on walls, all around our workspace</strong>. Most of it was done using Visio — all of this was a first for me, and it was a lot of fun. In the process, we met with health experts and did a lot of focus groups — both firsts as well, and just as fun.'
        },
        code_lyoko: {
          title: 'Code Lyoko',
          platforms: [
            { name: 'Nintendo DS' }
          ],
          date: 'May 15, 2007',
          trailer: 'https://www.youtube.com/watch?v=NrPg8Exn2pQ',
          publisher: { name: 'The Game Factory' },
          developer: { name: 'DC Studios' },
          role: 'Lead Game Designer, Puzzle Designer',
          desc: 'The game was mismanaged and overscoped. I was mandated to re-scope it and propose a recovery plan to the clients. We did, and they approved. In production, I was responsible for managing the team, which included a level designer and a writer. The game was a mix of <strong>2D point and click</strong> and <strong>3D hack and slash</strong>, with some <strong>puzzles</strong> sprinkled in here and there. In the end, we were all happy with the result.'
        },
        hannah_montana: {
          title: 'Hannah Montana',
          platforms: [
            { name: 'Nintendo DS' }
          ],
          date: 'October 9, 2006',
          trailer: 'https://www.youtube.com/watch?v=oOGDuvOjFyY',
          publisher: { name: "Disney's BVG" },
          developer: { name: 'DC Studios' },
          role: 'Lead Game Designer, Level Designer',
          desc: '<strong>This was my first game as a designer</strong>. Before I started working on it, it was a Lizzie McGuire game for the Game Boy Advance, but Disney asked us to turn it into a Hannah Montana game for the Nintendo DS. That was my first assignment, and it was a fun exercise. The biggest "refactor" was turning it into a <strong>2D point and click</strong>. Really proud of my first game!!'
        }
      },
      dev_qa: {
        state_of_emergency: {
          title: 'State of Emergency 2',
          platforms: [
            { name: 'PlayStation' }
          ],
          date: 'February 14, 2006',
          trailer: 'https://www.youtube.com/watch?v=8rLXzu-LbfY',
          publisher: { name: 'DC Studios' },
          developer: { name: 'VIS Entertainment / DC Studios' },
          role: 'Lead QA Tester',
          desc: 'I managed a team of QA developers.'
        },
        whac_a_mole: {
          title: 'Whac-A-Mole',
          platforms: [
            { name: 'Nintendo DS' }, { name: 'Nintendo GBA' }
          ],
          date: 'September 21, 2005',
          publisher: { name: 'Activision Value' },
          developer: { name: 'DC Studios' },
          role: 'Lead QA Tester',
          desc: 'I tested and reported bugs on the game while it was being developed.'
        },
        cinderella: {
          title: "Disney's Cinderella: Magical Dreams",
          platforms: [
            { name: 'Nintendo GBA' }
          ],
          date: 'September 20, 2005',
          publisher: { name: "Disney's BVG" },
          developer: { name: 'DC Studios' },
          role: 'Lead QA Tester, Production Assistant',
          desc: 'I tested and reported bugs on the game while it was being developed, as well as providing help on level design.'
        },
        fear_factor: {
          title: 'Fear Factor Unleashed',
          platforms: [
            { name: 'Nintendo GBA' }
          ],
          date: 'November 17, 2004',
          publisher: { name: 'HIP Interactive' },
          developer: { name: 'DC Studios' },
          role: 'Lead QA Tester, Production Assistant',
          desc: 'I tested and reported bugs on the game while it was being developed, as well as providing help on level design and producing video sequences from live action footage.'
        },
        winx_club: {
          title: 'Winx Club',
          platforms: [
            { name: 'PC' }, { name: 'PlayStation' }, { name: 'Xbox' }, { name: 'Nintendo GBA' }
          ],
          date: 'March 17, 2006',
          trailer: 'https://www.youtube.com/watch?v=Xhh4QsG5jzw',
          publisher: { name: 'Konami', url: 'https://www.konami.com/games/jp/ja/' },
          developer: { name: 'DC Studios' },
          role: 'Lead QA Tester',
          desc: 'I tested and reported bugs on the game while it was being developed, as well as producing video sequences from the animation footage for the handheld version.'
        },
        rayman2: {
          title: 'Rayman 2: The Great Escape',
          platforms: [
            { name: 'Nintendo 64' }, { name: 'PlayStation' }, { name: 'Dreamcast' }, { name: 'PC' }, { name: 'Nintendo DS' }
          ],
          date: 'October 29, 1999',
          trailer: 'https://www.youtube.com/watch?v=kCdO5KBbEuA',
          publisher: { name: 'Ubisoft', url: 'https://www.ubisoft.com/en-ca' },
          developer: { name: 'Ubisoft Montpellier', url: 'https://www.ubisoft.com/en-us/studio/montpellier' },
          role: 'QA Tester',
          desc: 'I tested and reported bugs on the game while it was being developed.'
        },
        gba_video: {
          title: 'GBA Video Carts',
          platforms: [
            { name: 'Nintendo GBA' }
          ],
          date: 'Various, 2004–2006',
          publisher: { name: 'Majesco Entertainment' },
          developer: { name: 'DC Studios' },
          role: 'Video Sequencer, Menu Artist',
          desc: "Using in-house tools, I was in charge of the entire pipeline of production for the <strong>GBA Video</strong> carts. In total, <strong>we shipped over 30 of them</strong>, where I compressed the video source, made menus from IP assets, and ensured the quality of the output."
        }
      }
    };

    function youtubeEmbedUrl(watchUrl){
      var match = watchUrl.match(/[?&]v=([^&]+)/);
      var id = match ? match[1] : '';
      return 'https://www.youtube.com/embed/' + id + '?mute=1';
    }

    function initXpGallery(win){
      var proto = win.querySelector('.xp-gallery-proto');
      if (!proto) return;

      var svg = proto.querySelector('.proto-connectors');
      var subwindows = proto.querySelector('.proto-subwindows');
      var mainEl = proto.querySelector(':scope > .win-chrome');

      var JOBS = [
        { id: 'grave_games', title: 'Grave Games', games: [
          { title: 'Dice Royal', platforms: 'Mobile' }
        ] },
        { id: 'freelance', title: 'Freelancer', games: [
          { title: 'Mighty Cuphead Adventure', platforms: 'PC, 8-Bit Consoles' },
          { title: 'Night Lights', platforms: 'PC, Consoles' },
          { title: 'Soulless: Ray of Hope', platforms: 'PC' },
          { title: 'Shorts', platforms: 'Handheld' }
        ] },
        { id: 'tribute', title: 'Tribute Games', games: [
          { title: "TMNT: Shredder's Revenge", platforms: 'PC, Consoles, Mobile' },
          { title: 'Steel Assault', platforms: 'PC, Consoles' },
          { title: 'Panzer Paladin', platforms: 'PC, Consoles' }
        ] },
        { id: 'grave_danger', title: 'Grave Danger Games', games: [
          { title: 'AFTERGRINDER', platforms: 'PC' }
        ] },
        { id: 'ubisoft', title: 'Ubisoft', games: [
          { title: "Assassin's Creed: Brotherhood", platforms: 'PC, Consoles' },
          { title: 'Petz Sports: Dog Playground', platforms: 'Console' },
          { title: 'My Weight Loss Coach', platforms: 'Handheld, Mobile' },
          { title: 'Rayman 2: The Great Escape', platforms: 'PC, Console, Handheld' }
        ] },
        { id: 'dc_studios', title: 'DC Studios', games: [
          { title: 'Thrillville: Off the Rails', platforms: 'Handheld' },
          { title: 'State of Emergency 2', platforms: 'Consoles' },
          { title: 'Code Lyoko', platforms: 'Handheld' },
          { title: 'Hannah Montana', platforms: 'Handheld' },
          { title: 'Whac-A-Mole', platforms: 'Handheld' },
          { title: "Disney's Cinderella: Magical Dreams", platforms: 'Handheld' },
          { title: 'Fear Factor Unleashed', platforms: 'Handheld' },
          { title: 'Winx Club', platforms: 'PC, Consoles, Handheld' },
          { title: '30+ GBA Video', platforms: 'Handheld' }
        ] }
      ];

      var colWidth = 420;
      var colGap = 30;
      var rowGap = 20;

      function layout(){
        subwindows.style.left = (mainEl.offsetWidth + 40) + 'px';
        subwindows.style.width = (colWidth * 2 + colGap) + 'px';

        var protoRect = proto.getBoundingClientRect();
        var colBottom = [-Infinity, -Infinity];

        JOBS.forEach(function(j){
          var w = document.getElementById('xpgal-' + j.id);
          var anchor = mainEl.querySelector('.event[data-job="' + j.id + '"] .event-head');
          var idealTop = anchor ? (anchor.getBoundingClientRect().top - protoRect.top) : colBottom[0] + rowGap;

          var col = idealTop >= colBottom[0] ? 0 : 1;
          var top = Math.max(idealTop, colBottom[col]);

          w.style.left = col * (colWidth + colGap) + 'px';
          w.style.top = top + 'px';
          colBottom[col] = top + w.offsetHeight + rowGap;
        });

        var totalHeight = Math.max(colBottom[0], colBottom[1]) - rowGap;
        proto.style.minHeight = Math.max(mainEl.offsetHeight, totalHeight) + 'px';
        drawConnectors();
        updateWorkspaceWidth();
      }

      function drawConnectors(){
        svg.innerHTML = '';
        var protoRect = proto.getBoundingClientRect();
        JOBS.forEach(function(j){
          var anchor = mainEl.querySelector('.event[data-job="' + j.id + '"] .event-head');
          var w = document.getElementById('xpgal-' + j.id);
          if (!anchor || !w) return;
          var aRect = anchor.getBoundingClientRect();
          var wRect = w.getBoundingClientRect();
          var titlebar = w.querySelector('.win-titlebar');
          var tbRect = titlebar.getBoundingClientRect();
          var x1 = aRect.right - protoRect.left;
          var y1 = aRect.top + aRect.height / 2 - protoRect.top;
          var x2 = wRect.left - protoRect.left;
          var y2 = tbRect.top + tbRect.height / 2 - protoRect.top;
          var midX = (x1 + x2) / 2;
          var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', 'M ' + x1 + ' ' + y1 + ' C ' + midX + ' ' + y1 + ', ' + midX + ' ' + y2 + ', ' + x2 + ' ' + y2);
          path.setAttribute('stroke', 'rgba(111,207,151,0.5)');
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('fill', 'none');
          svg.appendChild(path);
        });
      }

      JOBS.forEach(function(j){
        var w = document.createElement('div');
        w.className = 'win-chrome proto-subwindow xpgal-window';
        w.id = 'xpgal-' + j.id;
        var gamesHtml = j.games.map(function(g){
          return '<li>' + g.title + ' <span class="xpgal-platforms">— ' + g.platforms + '</span></li>';
        }).join('');
        w.innerHTML =
          '<div class="win-titlebar"><span class="win-title"><span class="win-caret">▸</span> ' + j.title + '</span></div>' +
          '<ul class="xp-list">' + gamesHtml + '</ul>';
        subwindows.appendChild(w);
      });

      layout();
      window.addEventListener('resize', layout);
    }

    function initObjSimGallery(win){
      var proto = win.querySelector('.obj-gallery-proto');
      if (!proto) return;

      var svg = proto.querySelector('.proto-connectors');
      var subwindows = proto.querySelector('.proto-subwindows');
      var mainEl = proto.querySelector(':scope > .win-chrome');

      var GALLERY = [
        { id: 'dice_royal', title: 'Dice Royal - Click to Play', img: 'img/sim-graveline-diceroyal_show.jpg', col: 0 },
        { id: 'cuphead', title: 'Mighty Cuphead Adventure', img: 'img/sim-graveline-cuphead_show.jpg', col: 1 },
        { id: 'tmnt', title: "TMNT: Shredder's Revenge", img: 'img/sim-graveline-tmnt_show.jpg', col: 0 },
        { id: 'panzer', title: 'Panzer Paladin', img: 'img/sim-graveline-panzer_show.jpg', col: 1 },
        { id: 'acb', title: "Assassin's Creed: Brotherhood", img: 'img/sim-graveline-assassin_show.jpg', col: 0 }
      ];

      var colWidth = 200;
      var colGap = 30;
      var rowGap = 20;

      function layout(){
        subwindows.style.left = (mainEl.offsetWidth + 40) + 'px';
        subwindows.style.width = (colWidth * 2 + colGap) + 'px';

        var firstColHeight = document.getElementById('gallery-' + GALLERY[0].id).offsetHeight;
        var stagger = Math.round(firstColHeight / 2);
        var colTop = [0, stagger];

        GALLERY.forEach(function(g){
          var w = document.getElementById('gallery-' + g.id);
          w.style.left = g.col * (colWidth + colGap) + 'px';
          w.style.top = colTop[g.col] + 'px';
          colTop[g.col] += w.offsetHeight + rowGap;
        });

        var totalHeight = Math.max(colTop[0], colTop[1]) - rowGap;
        proto.style.minHeight = Math.max(mainEl.offsetHeight, totalHeight) + 'px';
        drawConnectors();
        updateWorkspaceWidth();
      }

      function drawConnectors(){
        svg.innerHTML = '';
        var protoRect = proto.getBoundingClientRect();
        var mRect = mainEl.getBoundingClientRect();
        var x1 = mRect.right - protoRect.left;
        var y1 = mRect.top + 30 - protoRect.top;
        GALLERY.forEach(function(g){
          var w = document.getElementById('gallery-' + g.id);
          var wRect = w.getBoundingClientRect();
          var titlebar = w.querySelector('.win-titlebar');
          var tbRect = titlebar.getBoundingClientRect();
          var x2 = wRect.left - protoRect.left;
          var y2 = tbRect.top + tbRect.height / 2 - protoRect.top;
          var midX = (x1 + x2) / 2;
          var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', 'M ' + x1 + ' ' + y1 + ' C ' + midX + ' ' + y1 + ', ' + midX + ' ' + y2 + ', ' + x2 + ' ' + y2);
          path.setAttribute('stroke', 'rgba(111,207,151,0.5)');
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('fill', 'none');
          svg.appendChild(path);
        });
      }

      GALLERY.forEach(function(g){
        var w = document.createElement('div');
        w.className = 'win-chrome proto-subwindow obj-gallery-window';
        w.id = 'gallery-' + g.id;
        w.innerHTML =
          '<div class="win-titlebar"><span class="win-title"><span class="win-caret">▸</span> ' + g.title + '</span></div>' +
          '<img src="' + g.img + '" alt="' + g.title + '">';
        if (g.id === 'dice_royal') {
          w.style.cursor = 'pointer';
          w.addEventListener('click', function(){ window.open('https://simgraveline.itch.io/dice-roy', '_blank', 'noopener'); });
        }
        subwindows.appendChild(w);
      });

      layout();
      window.addEventListener('resize', layout);
    }

    function initRoomProto(win){
      var proto = win.querySelector('.room-proto');
      if (!proto) return;

      var roomKey = win.id.replace('window-', '');
      var projects = ROOM_PROJECTS[roomKey] || {};
      var svg = proto.querySelector('.proto-connectors');
      var subwindows = proto.querySelector('.proto-subwindows');
      var specTpl = document.getElementById('specTemplate');
      var openOrder = [];

      function positionSubwindows(){
        var mainEl = proto.querySelector('.proto-main');
        subwindows.style.left = (mainEl.offsetWidth + 40) + 'px';
      }
      positionSubwindows();
      window.addEventListener('resize', positionSubwindows);

      function layout(){
        var top = 0;
        openOrder.forEach(function(id){
          var w = document.getElementById('spec-' + roomKey + '-' + id);
          w.style.top = top + 'px';
          top += w.offsetHeight + 20;
        });
        var mainHeight = proto.querySelector('.proto-main').offsetHeight;
        proto.style.minHeight = Math.max(mainHeight, top - 20) + 'px';
        drawConnectors();
        updateWorkspaceWidth();
      }

      function drawConnectors(){
        svg.innerHTML = '';
        var protoRect = proto.getBoundingClientRect();
        openOrder.forEach(function(id){
          var thumb = proto.querySelector('.proto-thumb[data-proj="' + id + '"]');
          var w = document.getElementById('spec-' + roomKey + '-' + id);
          var tRect = thumb.getBoundingClientRect();
          var wRect = w.getBoundingClientRect();
          var x1 = tRect.right - protoRect.left;
          var y1 = tRect.top + tRect.height / 2 - protoRect.top;
          var x2 = wRect.left - protoRect.left;
          var y2 = wRect.top + 24 - protoRect.top;
          var midX = (x1 + x2) / 2;
          var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', 'M ' + x1 + ' ' + y1 + ' C ' + midX + ' ' + y1 + ', ' + midX + ' ' + y2 + ', ' + x2 + ' ' + y2);
          path.setAttribute('stroke', 'rgba(111,207,151,0.5)');
          path.setAttribute('stroke-width', '1.5');
          path.setAttribute('fill', 'none');
          svg.appendChild(path);
        });
      }

      function openSpec(id){
        var domId = 'spec-' + roomKey + '-' + id;
        if (document.getElementById(domId)) return;
        var data = projects[id];
        if (!data) return;

        var node = specTpl.content.cloneNode(true);
        var specWin = node.querySelector('.proto-subwindow');
        specWin.id = domId;
        var titleEl = node.querySelector('.spec-title-text');
        titleEl.textContent = data.title;
        if (data.titleStyle) titleEl.classList.add(data.titleStyle);

        var platformsEl = node.querySelector('.spec-platforms');
        data.platforms.forEach(function(p){
          var el = p.url ? document.createElement('a') : document.createElement('span');
          el.className = 'spec-platform';
          el.textContent = p.name;
          if (p.url) { el.href = p.url; el.target = '_blank'; el.rel = 'noopener'; }
          platformsEl.appendChild(el);
        });

        node.querySelector('.spec-date').textContent = data.date;

        if (data.trailer) {
          var embed = node.querySelector('.spec-trailer-embed');
          embed.hidden = false;
          embed.querySelector('iframe').src = youtubeEmbedUrl(data.trailer);
        } else if (data.embed) {
          var embed = node.querySelector('.spec-trailer-embed');
          embed.hidden = false;
          embed.style.paddingTop = (data.embed.height / data.embed.width * 100) + '%';
          var iframe = embed.querySelector('iframe');
          iframe.src = data.embed.src;
          iframe.removeAttribute('allow');
          iframe.removeAttribute('referrerpolicy');
          specWin.style.width = (data.embed.width + 32) + 'px';
        }

        function fillCredit(container, credit){
          if (!credit) return;
          if (credit.url) {
            var a = document.createElement('a');
            a.href = credit.url;
            a.target = '_blank';
            a.rel = 'noopener';
            a.textContent = credit.name;
            container.appendChild(a);
          } else {
            container.textContent = credit.name;
          }
        }

        if (data.publisher) {
          node.querySelector('.spec-publisher-row').hidden = false;
          fillCredit(node.querySelector('.spec-publisher'), data.publisher);
        }
        fillCredit(node.querySelector('.spec-developer'), data.developer);

        node.querySelector('.role').textContent = data.role;
        node.querySelector('.spec-desc').innerHTML = data.desc;
        node.querySelector('.win-close').addEventListener('click', function(){ closeSpec(id); });

        subwindows.appendChild(node);
        openOrder.push(id);
        proto.querySelector('.proto-thumb[data-proj="' + id + '"]').classList.add('is-open');
        layout();
        scrollToElement(document.getElementById(domId));
      }

      function closeSpec(id){
        var w = document.getElementById('spec-' + roomKey + '-' + id);
        var prevWin = w ? w.previousElementSibling : null;

        scrollToElement(prevWin || proto.querySelector('.proto-main'));

        setTimeout(function(){
          if (w) w.remove();
          openOrder = openOrder.filter(function(x){ return x !== id; });
          proto.querySelector('.proto-thumb[data-proj="' + id + '"]').classList.remove('is-open');
          layout();
        }, 450);
      }

      proto.querySelectorAll('.proto-thumb').forEach(function(thumb){
        thumb.addEventListener('click', function(){
          var id = thumb.dataset.proj;
          if (openOrder.indexOf(id) === -1) openSpec(id);
        });
      });

      subwindows.addEventListener('transitionend', function(e){
        if (e.propertyName === 'top') drawConnectors();
      });
    }

    function ensureWindow(target, label){
      if (document.getElementById('window-' + target)) return;

      var win = document.createElement('div');
      win.className = 'asset-window';
      win.id = 'window-' + target;

      var tpl = document.querySelector('template[data-card="' + target + '"]');
      if (tpl) {
        win.appendChild(tpl.content.cloneNode(true));
      } else {
        var chrome = document.createElement('div');
        chrome.className = 'win-chrome';
        var labelRow = document.createElement('div');
        labelRow.className = 'section-label';
        labelRow.innerHTML = '<span class="tree-ico ' + inferIcon(label) + '"></span>' + label + ' — Empty';
        var empty = document.createElement('div');
        empty.className = 'empty-window';
        empty.textContent = '// nothing here yet';
        chrome.appendChild(labelRow);
        chrome.appendChild(empty);
        win.appendChild(chrome);
      }

      windowStack.appendChild(win);
      initRoomProto(win);
      if (target === 'apropos') initObjSimGallery(win);
      if (target === 'xp') initXpGallery(win);

      var closeWindowBtn = win.querySelector('[data-close-window]');
      if (closeWindowBtn) {
        closeWindowBtn.addEventListener('click', function(){ closeTab(target); });
      }
    }

    function closeTab(target){
      var tab = tabstrip.querySelector('.tab[data-target="' + target + '"]');
      if (!tab) return;
      tab.remove();

      var win = document.getElementById('window-' + target);
      var prevWin = win ? win.previousElementSibling : null;
      var prevId = prevWin ? prevWin.id.replace('window-', '') : null;

      if (prevId) {
        setActiveClasses(prevId);
        scrollToElement(prevWin);
      } else {
        setActiveClasses('apropos');
        scrollToElement(document.getElementById('window-apropos'));
      }

      setTimeout(function(){
        if (win) win.remove();
        updateWorkspaceWidth();
      }, 450);
    }

    function stripTabPrefix(label){
      return label.replace(/^(rm_|sh_|scr_|obj_)/, '');
    }

    function openTab(target, label){
      var tab = tabstrip.querySelector('.tab[data-target="' + target + '"]');
      if (!tab) {
        tab = document.createElement('a');
        tab.className = 'tab';
        tab.dataset.target = target;
        tab.textContent = stripTabPrefix(label);

        if (target !== 'apropos') {
          var close = document.createElement('span');
          close.className = 'tab-close';
          close.textContent = '×';
          close.addEventListener('click', function(e){
            e.stopPropagation();
            closeTab(target);
          });
          tab.appendChild(close);
        }

        tab.addEventListener('click', function(){ activateTab(target); });
        tabstrip.appendChild(tab);
      }
      ensureWindow(target, label);
      activateTab(target);
    }

    tabstrip.querySelectorAll('.tab').forEach(function(tab){
      tab.addEventListener('click', function(){ activateTab(tab.dataset.target); });
    });

    treeItems.forEach(function(el){
      el.addEventListener('click', function(e){
        e.preventDefault();
        openTab(el.dataset.target, el.textContent.trim());
      });
    });

    ensureWindow('apropos', 'obj_sim');
    setActiveClasses('apropos');

    var flagToggle = document.getElementById('flagToggle');
    var isQuebecFlag = false;
    var CANADA_FLAG = '<svg viewBox="0 0 20 14" width="16" height="12" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="20" height="14" fill="#fff"/>' +
      '<rect width="5" height="14" fill="#FF0000"/>' +
      '<rect x="15" width="5" height="14" fill="#FF0000"/>' +
      '<path d="M10 3 L11 5.5 L13.5 5 L12 7 L14 8.5 L11.5 8.5 L11.5 11 L10 9.5 L8.5 11 L8.5 8.5 L6 8.5 L8 7 L6.5 5 L9 5.5 Z" fill="#FF0000"/>' +
      '</svg>';
    var QUEBEC_FLAG = '<svg viewBox="0 0 20 14" width="16" height="12" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="20" height="14" fill="#003DA5"/>' +
      '<rect x="8.5" width="3" height="14" fill="#fff"/>' +
      '<rect y="5.5" width="20" height="3" fill="#fff"/>' +
      '<path d="M4 2 L5 4 L4 6 L3 4 Z" fill="#fff"/>' +
      '<path d="M16 2 L17 4 L16 6 L15 4 Z" fill="#fff"/>' +
      '<path d="M4 8 L5 10 L4 12 L3 10 Z" fill="#fff"/>' +
      '<path d="M16 8 L17 10 L16 12 L15 10 Z" fill="#fff"/>' +
      '</svg>';

    if (flagToggle) {
      flagToggle.innerHTML = CANADA_FLAG;
      flagToggle.addEventListener('click', function(){
        isQuebecFlag = !isQuebecFlag;
        flagToggle.innerHTML = isQuebecFlag ? QUEBEC_FLAG : CANADA_FLAG;
      });
    }

    /* ---------- mobile layout (<=460px) ---------- */

    function extractCardBody(cardName){
      var tpl = document.querySelector('template[data-card="' + cardName + '"]');
      if (!tpl) return null;
      var frag = tpl.content.cloneNode(true);
      var titleEl = frag.querySelector('.win-title');
      var body = frag.querySelector('.object-editor') || frag.querySelector('.skills-body');
      if (!body) return null;
      return { titleHTML: titleEl ? titleEl.innerHTML : '', body: body };
    }

    function buildMobileWindow(cardName){
      var extracted = extractCardBody(cardName);
      if (!extracted) return null;
      var win = document.createElement('div');
      win.className = 'win-chrome m-window';
      win.innerHTML = '<div class="win-titlebar"><span class="win-title">' + extracted.titleHTML + '</span></div>';
      win.appendChild(extracted.body);
      return win;
    }

    function initMobileHome(){
      var container = document.getElementById('m-page-home');
      if (container.childElementCount) return;
      var win = buildMobileWindow('apropos');
      if (win) container.appendChild(win);
    }

    function initMobileXp(){
      var container = document.getElementById('m-page-xp');
      if (container.childElementCount) return;
      ['xp', 'teaching', 'competences', 'education'].forEach(function(cardName){
        var win = buildMobileWindow(cardName);
        if (win) container.appendChild(win);
      });
    }

    var MOBILE_PORTFOLIO = [
      ['indie_dev', 'dice_royal'],
      ['level_design', 'mighty_cuphead'],
      ['level_design', 'tmnt'],
      ['level_design', 'panzer_paladin'],
      ['indie_dev', 'aftergrinder'],
      ['game_design', 'ac_brotherhood'],
      ['level_design', 'shorts'],
      ['design_lead', 'petz_sports'],
      ['design_lead', 'weight_loss_coach'],
      ['game_design', 'thrillville'],
      ['design_lead', 'code_lyoko'],
      ['design_lead', 'hannah_montana'],
      ['dev_qa', 'whac_a_mole'],
      ['dev_qa', 'cinderella'],
      ['dev_qa', 'fear_factor'],
      ['dev_qa', 'winx_club'],
      ['dev_qa', 'rayman2']
    ];

    function buildMobileSpecCard(room, id){
      var data = ROOM_PROJECTS[room] && ROOM_PROJECTS[room][id];
      var specTpl = document.getElementById('specTemplate');
      if (!data || !specTpl) return null;

      var node = specTpl.content.cloneNode(true);
      var win = node.querySelector('.win-chrome');
      win.classList.remove('proto-subwindow');
      win.classList.add('m-window');

      var titleEl = node.querySelector('.spec-title-text');
      titleEl.textContent = data.title;
      if (data.titleStyle) titleEl.classList.add(data.titleStyle);

      var platformsEl = node.querySelector('.spec-platforms');
      data.platforms.forEach(function(p){
        var el = p.url ? document.createElement('a') : document.createElement('span');
        el.className = 'spec-platform';
        el.textContent = p.name;
        if (p.url) { el.href = p.url; el.target = '_blank'; el.rel = 'noopener'; }
        platformsEl.appendChild(el);
      });

      node.querySelector('.spec-date').textContent = data.date;

      if (id === 'dice_royal') {
        var imgEmbed = node.querySelector('.spec-trailer-embed');
        imgEmbed.hidden = false;
        imgEmbed.innerHTML = '<img src="img/sim-graveline-diceroyal_show.jpg" alt="Dice Royal">';
      } else if (data.trailer) {
        var trailerEmbed = node.querySelector('.spec-trailer-embed');
        trailerEmbed.hidden = false;
        trailerEmbed.querySelector('iframe').src = youtubeEmbedUrl(data.trailer);
      }

      function fillCredit(container, credit){
        if (!credit) return;
        if (credit.url) {
          var a = document.createElement('a');
          a.href = credit.url;
          a.target = '_blank';
          a.rel = 'noopener';
          a.textContent = credit.name;
          container.appendChild(a);
        } else {
          container.textContent = credit.name;
        }
      }

      if (data.publisher) {
        node.querySelector('.spec-publisher-row').hidden = false;
        fillCredit(node.querySelector('.spec-publisher'), data.publisher);
      }
      fillCredit(node.querySelector('.spec-developer'), data.developer);

      node.querySelector('.role').textContent = data.role;
      node.querySelector('.spec-desc').innerHTML = data.desc;

      var closeBtn = node.querySelector('.win-close');
      if (closeBtn) closeBtn.remove();

      return node;
    }

    function initMobilePortfolio(){
      var container = document.getElementById('m-page-portfolio');
      if (container.childElementCount) return;
      MOBILE_PORTFOLIO.forEach(function(pair){
        var node = buildMobileSpecCard(pair[0], pair[1]);
        if (node) container.appendChild(node);
      });
    }

    function initMobileContact(){
      var container = document.getElementById('m-page-contact');
      if (container.childElementCount) return;

      var win = document.createElement('div');
      win.className = 'win-chrome m-window';
      win.innerHTML =
        '<div class="win-titlebar"><span class="win-title"><span class="win-caret">▸</span> sh_contact</span></div>' +
        '<div class="m-contact-body">' +
          '<div class="m-contact-section"><div class="m-contact-label">// email</div><div class="m-contact-email"></div></div>' +
          '<div class="m-contact-section"><div class="m-contact-label">// socials</div><div class="m-social-list"></div></div>' +
          '<div class="m-contact-section"><a class="m-download-btn" href="files/Resume_-_SimonGraveline_G.pdf" download>⬇ Download Resume</a></div>' +
        '</div>';

      var contactTpl = document.querySelector('template[data-card="contact"]');
      var emailLink = contactTpl ? contactTpl.content.querySelector('a[href^="mailto:"]') : null;
      if (emailLink) {
        var emailClone = emailLink.cloneNode(true);
        emailClone.className = 'm-email-link';
        win.querySelector('.m-contact-email').appendChild(emailClone);
      }

      var badgeMap = { linkedin: 'in', github: 'gh', artstation: 'as', youtube: 'yt', itchio: 'itch', gamejolt: 'gj', gxgames: 'gx' };
      var socialsTpl = document.querySelector('template[data-card="socials"]');
      var socialLinks = socialsTpl ? socialsTpl.content.querySelectorAll('.uniform a') : [];
      var socialList = win.querySelector('.m-social-list');
      socialLinks.forEach(function(a){
        var uname = a.closest('.uniform').querySelector('.uname').textContent.trim();
        var key = uname.replace('u_', '');
        var row = document.createElement('a');
        row.className = 'm-social-row';
        row.href = a.href;
        row.target = '_blank';
        row.rel = 'noopener';
        row.innerHTML = '<span class="m-social-badge">' + (badgeMap[key] || key.slice(0, 2)) + '</span> ' + a.textContent;
        socialList.appendChild(row);
      });

      container.appendChild(win);
    }

    function showMobilePage(page){
      document.querySelectorAll('.m-page').forEach(function(el){
        el.classList.toggle('active', el.id === 'm-page-' + page);
      });
      document.querySelectorAll('.m-navbtn').forEach(function(btn){
        btn.classList.toggle('active', btn.dataset.mpage === page);
      });
    }

    var mobileInited = false;
    function initMobile(){
      if (mobileInited) return;
      mobileInited = true;

      initMobileHome();
      initMobileXp();
      initMobilePortfolio();
      initMobileContact();
      showMobilePage('home');

      document.querySelectorAll('.m-navbtn').forEach(function(btn){
        btn.addEventListener('click', function(){
          showMobilePage(btn.dataset.mpage);
          document.getElementById('mPages').scrollTop = 0;
          window.scrollTo(0, 0);
        });
      });
    }

    var mobileMql = window.matchMedia('(max-width: 460px)');
    mobileMql.addEventListener('change', function(e){
      if (e.matches) initMobile();
    });
    if (mobileMql.matches) initMobile();
