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
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      lvl_design: {
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
        node.querySelector('.spec-title-text').textContent = 'Room: ' + data.title;

        var platformsEl = node.querySelector('.spec-platforms');
        data.platforms.forEach(function(p){
          var el = p.url ? document.createElement('a') : document.createElement('span');
          el.className = 'spec-platform';
          el.textContent = p.name;
          if (p.url) { el.href = p.url; el.target = '_blank'; el.rel = 'noopener'; }
          platformsEl.appendChild(el);
        });

        node.querySelector('.spec-date').textContent = data.date;
        node.querySelector('.spec-trailer-embed iframe').src = youtubeEmbedUrl(data.trailer);

        if (data.publisher) {
          var pubRow = node.querySelector('.spec-publisher-row');
          pubRow.hidden = false;
          var pubLink = node.querySelector('.spec-publisher');
          pubLink.textContent = data.publisher.name;
          pubLink.href = data.publisher.url;
        }
        var devLink = node.querySelector('.spec-developer');
        devLink.textContent = data.developer.name;
        devLink.href = data.developer.url;

        node.querySelector('.role').textContent = data.role;
        node.querySelector('.spec-desc').textContent = data.desc;
        node.querySelector('.win-close').addEventListener('click', function(){ closeSpec(id); });

        subwindows.appendChild(node);
        openOrder.push(id);
        proto.querySelector('.proto-thumb[data-proj="' + id + '"]').classList.add('is-open');
        layout();
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

    function closeWindow(target){
      var win = document.getElementById('window-' + target);
      if (win) win.remove();
    }

    function closeTab(target){
      var tab = tabstrip.querySelector('.tab[data-target="' + target + '"]');
      if (!tab) return;
      var wasActive = tab.classList.contains('active');
      tab.remove();
      closeWindow(target);
      if (wasActive) activateTab('apropos');
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
