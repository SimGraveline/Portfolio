    var tabstrip = document.querySelector('.tabstrip');
    var windowStack = document.getElementById('windowStack');
    var treeItems = document.querySelectorAll('.tree-item');
    var statusRight = document.getElementById('statusRight');

    var statusMap = {
      hero: 'rm_intro: room loaded',
      travaux: 'rm_work: 3 instances',
      apropos: 'obj_sim: 2 events',
      competences: 'scr_skills.gml: 14 lines',
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

    function scrollToSection(target){
      var el = document.getElementById('window-' + target) || document.getElementById(target);
      if (!el) return;

      var rootStyle = getComputedStyle(document.documentElement);
      var headerH = parseFloat(rootStyle.getPropertyValue('--h-title')) + parseFloat(rootStyle.getPropertyValue('--h-menu'));
      var footerH = parseFloat(rootStyle.getPropertyValue('--h-status'));
      var available = window.innerHeight - headerH - footerH;

      var rect = el.getBoundingClientRect();
      var elTopDoc = rect.top + window.scrollY;
      var targetScroll = rect.height <= available
        ? elTopDoc - headerH - (available - rect.height) / 2
        : elTopDoc - headerH;

      window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
            src: 'https://itch.io/embed-upload/18217270?color=000137',
            width: 384,
            height: 852,
            fallbackUrl: 'https://simgraveline.itch.io/dice-royal-mobile',
            fallbackText: 'Play Dice Royal Mobile on itch.io'
          },
          role: 'Solo developer',
          desc: 'Game Design, Programming, Art'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Enemy AI design and prototyping in Unreal Engine, documentation of gameplay and narrative beats for the vertical slice.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
      }
    };

    function youtubeEmbedUrl(watchUrl){
      var match = watchUrl.match(/[?&]v=([^&]+)/);
      var id = match ? match[1] : '';
      return 'https://www.youtube.com/embed/' + id + '?mute=1';
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
        node.querySelector('.spec-desc').textContent = data.desc;
        node.querySelector('.win-close').addEventListener('click', function(){ closeSpec(id); });

        subwindows.appendChild(node);
        openOrder.push(id);
        proto.querySelector('.proto-thumb[data-proj="' + id + '"]').classList.add('is-open');
        layout();
        document.getElementById(domId).scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      function closeSpec(id){
        var w = document.getElementById('spec-' + roomKey + '-' + id);
        if (w) w.remove();
        openOrder = openOrder.filter(function(x){ return x !== id; });
        proto.querySelector('.proto-thumb[data-proj="' + id + '"]').classList.remove('is-open');
        layout();
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

      var closeWindowBtn = win.querySelector('[data-close-window]');
      if (closeWindowBtn) {
        closeWindowBtn.addEventListener('click', function(){ closeTab(target); });
      }
    }

    function scrollToWindowTop(win){
      var rootStyle = getComputedStyle(document.documentElement);
      var headerH = parseFloat(rootStyle.getPropertyValue('--h-title')) + parseFloat(rootStyle.getPropertyValue('--h-menu'));
      var rect = win.getBoundingClientRect();
      var targetScroll = rect.top + window.scrollY - headerH;
      window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
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
        scrollToWindowTop(prevWin);
      } else {
        setActiveClasses('apropos');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      setTimeout(function(){
        if (win) win.remove();
      }, 450);
    }

    function openTab(target, label){
      var tab = tabstrip.querySelector('.tab[data-target="' + target + '"]');
      if (!tab) {
        tab = document.createElement('a');
        tab.className = 'tab';
        tab.dataset.target = target;
        tab.textContent = label;

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
