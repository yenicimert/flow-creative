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

  // Cookie banner (remembers the choice in this browser)
  var KEY = 'fc-cookie-consent';
  var banner = document.getElementById('cookie-banner');
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (banner && !saved) banner.hidden = false;

  document.querySelectorAll('[data-cookie]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      try { localStorage.setItem(KEY, btn.getAttribute('data-cookie')); } catch (e) {}
      banner.hidden = true;
    });
  });

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
