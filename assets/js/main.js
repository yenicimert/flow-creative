// Flow-Creative

(function () {
  // Make sure background videos autoplay (some browsers need muted set in JS)
  document.querySelectorAll('video[autoplay]').forEach(function (v) {
    v.muted = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  });

  // Lens hover effect on work tiles
  document.querySelectorAll('.tile').forEach(function (tile) {
    var videos = tile.querySelectorAll('video');
    var base = videos[0];
    var lens = videos[1];
    var radius = (tile.getAttribute('data-lens') || '130') + 'px';

    tile.addEventListener('mouseenter', function () {
      if (lens && base) {
        lens.currentTime = base.currentTime;
        var p = lens.play();
        if (p && p.catch) p.catch(function () {});
      }
      tile.style.setProperty('--r', radius);
    });

    tile.addEventListener('mousemove', function (e) {
      var b = tile.getBoundingClientRect();
      tile.style.setProperty('--x', (e.clientX - b.left) + 'px');
      tile.style.setProperty('--y', (e.clientY - b.top) + 'px');
    });

    tile.addEventListener('mouseleave', function () {
      tile.style.setProperty('--r', '0px');
      if (lens) lens.pause();
    });
  });

  // Legal pop-ups (Privacy, Cookies, Terms)
  var overlay = document.getElementById('modal');
  var titleEl = document.getElementById('modal-title');
  var bodyEl = document.getElementById('modal-body');
  var lastFocus = null;

  function openModal(type) {
    var tpl = document.getElementById('tpl-' + type);
    if (!tpl || !overlay) return;
    lastFocus = document.activeElement;
    titleEl.textContent = tpl.getAttribute('data-title');
    bodyEl.innerHTML = '';
    bodyEl.appendChild(tpl.content.cloneNode(true));
    bodyEl.scrollTop = 0;
    overlay.hidden = false;
    document.body.classList.add('modal-open');
    overlay.querySelector('.modal-close').focus();
  }

  function closeModal() {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('[data-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () { openModal(btn.getAttribute('data-modal')); });
  });
  if (overlay) {
    overlay.querySelector('.modal-close').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
