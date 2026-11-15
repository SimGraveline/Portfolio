/* Trailer: load the YouTube player on click when served over http(s);
   opened from a local file, YouTube refuses to embed, so the link opens YouTube instead. */
(function(){
  var box = document.getElementById('dbVideo');
  var link = document.getElementById('dbVideoLink');
  if (!box || !link || location.protocol.indexOf('http') !== 0) return;
  link.addEventListener('click', function(e){
    e.preventDefault();
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube.com/embed/O4KDZM_nR6I?autoplay=1&rel=0';
    f.title = 'DICEBITS trailer';
    f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    f.setAttribute('allowfullscreen', '');
    box.innerHTML = '';
    box.appendChild(f);
  });
})();
