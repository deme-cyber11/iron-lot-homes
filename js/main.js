/* ============================================
   Iron Lot Homes - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile Menu ---
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Language Toggle ---
  const langToggles = document.querySelectorAll('.lang-toggle');
  const currentLangSpans = document.querySelectorAll('.current-lang');

  langToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('lang-es');
      var isSpanish = document.body.classList.contains('lang-es');

      currentLangSpans.forEach(function (span) {
        span.textContent = isSpanish ? 'ES' : 'EN';
      });

      localStorage.setItem('lang', isSpanish ? 'es' : 'en');
    });
  });

  // Restore language preference
  if (localStorage.getItem('lang') === 'es') {
    document.body.classList.add('lang-es');
    currentLangSpans.forEach(function (span) {
      span.textContent = 'ES';
    });
  }

  // --- Form Handling (Web3Forms) ---
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      var formData = new FormData(form);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          var successEl = form.parentElement.querySelector('.form-success');
          if (successEl) {
            form.style.display = 'none';
            successEl.classList.add('show');
          } else {
            btn.textContent = 'Sent!';
            btn.style.background = '#2d8a4e';
            form.reset();
            setTimeout(function () {
              btn.textContent = originalText;
              btn.style.background = '';
              btn.disabled = false;
            }, 3000);
          }
        } else {
          btn.textContent = 'Error - Try Again';
          btn.disabled = false;
          setTimeout(function () {
            btn.textContent = originalText;
          }, 3000);
        }
      })
      .catch(function () {
        btn.textContent = 'Error - Try Again';
        btn.disabled = false;
        setTimeout(function () {
          btn.textContent = originalText;
        }, 3000);
      });
    });
  });

  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Active nav link ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
