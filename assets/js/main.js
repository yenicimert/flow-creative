// Flow-Creative

(function () {
  // Make sure background videos autoplay (some browsers need muted set in JS)
  document.querySelectorAll('video[autoplay]').forEach(function (v) {
    v.muted = true;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  });

  // Lens hover effect on work tiles
  document.querySelectorAll('.tile, .case-media').forEach(function (tile) {
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

  // Work: sticky stacking cards scale down as the next one slides over
  var stack = document.querySelector('[data-stack]');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (stack && !reduce) {
    var cards = [].slice.call(stack.querySelectorAll('.stack-card'));
    var n = cards.length;
    var ticking = false;
    var update = function () {
      ticking = false;
      var r = stack.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      cards.forEach(function (card, i) {
        var target = 1 - (n - 1 - i) * 0.025;
        var t = Math.min(1, Math.max(0, (p - i / n) / (1 - i / n)));
        card.style.transform = 'scale(' + (1 + (target - 1) * t).toFixed(4) + ')';
      });
    };
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

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
