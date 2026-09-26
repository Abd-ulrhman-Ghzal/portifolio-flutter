// =============================================
//  Shared utilities — index.html (single-page portfolio)
// =============================================

// Toast helper
function showToast(msg, duration = 2800) {
  let t = document.getElementById('globalToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'globalToast';
    t.className = 'toast-custom';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

// Dark Mode
function initDarkMode() {
  const btn = document.getElementById('darkToggle');
  if (!btn) return;
  const saved = localStorage.getItem('darkMode') === 'true';
  if (saved) document.body.classList.add('dark-mode');
  updateToggleLabel(btn);
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    updateToggleLabel(btn);
  });
}
function updateToggleLabel(btn) {
  btn.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// Persist dark mode on page load
(function () {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
})();

// Active nav-link on scroll — highlights the current section as you scroll.
function initScrollSpy() {
  const links = document.querySelectorAll('.main-navbar .nav-link[href^="#"]');
  if (!links.length) return;

  const sections = Array.from(links)
    .map(l => document.getElementById(l.getAttribute('href').slice(1)))
    .filter(Boolean);
  if (!sections.length) return;

  const setActive = (id) => {
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
  };

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => spy.observe(s));
}

document.addEventListener('DOMContentLoaded', initScrollSpy);
