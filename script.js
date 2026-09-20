const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

const closeMenu = () => {
  document.body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.querySelector('.menu-label').textContent = 'Menu';
};

menuToggle?.addEventListener('click', () => {
  const open = !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const showreel = document.querySelector('[data-showreel]');

if (showreel) {
  const loadShowreel = () => {
    if (showreel.dataset.loaded) return;
    showreel.dataset.loaded = 'true';
    showreel.play().catch(() => {});
  };

  const reelObserver = new IntersectionObserver(
    (entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      loadShowreel();
      observer.disconnect();
    },
    { rootMargin: '240px 0px' }
  );
  reelObserver.observe(showreel);

  const playButton = document.querySelector('[data-reel-play]');
  const soundButton = document.querySelector('[data-reel-sound]');

  playButton?.addEventListener('click', () => {
    if (showreel.paused) {
      loadShowreel();
      showreel.play().catch(() => {});
      playButton.textContent = 'Pause';
      playButton.setAttribute('aria-label', 'Pause showreel');
    } else {
      showreel.pause();
      playButton.textContent = 'Play';
      playButton.setAttribute('aria-label', 'Play showreel');
    }
  });

  soundButton?.addEventListener('click', () => {
    showreel.muted = !showreel.muted;
    soundButton.textContent = showreel.muted ? 'Sound on' : 'Sound off';
    soundButton.setAttribute('aria-label', showreel.muted ? 'Turn showreel sound on' : 'Mute showreel');
  });
}

document.querySelectorAll('a[href]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const url = new URL(link.href, window.location.href);
    const isSamePageAnchor = url.pathname === window.location.pathname && url.hash;
    if (url.origin !== window.location.origin || isSamePageAnchor || link.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    document.body.classList.add('page-leaving');
    window.setTimeout(() => { window.location.href = url.href; }, 220);
  });
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('video[data-hls]').forEach((video) => {
  const source = video.dataset.hls;
  if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = source;
  } else if (window.Hls?.isSupported()) {
    const hls = new window.Hls({
      capLevelToPlayerSize: true,
      startLevel: -1,
      maxBufferLength: 12,
    });
    hls.loadSource(source);
    hls.attachMedia(video);
  }
});
