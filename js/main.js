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

  // --- Mobile Dropdown Toggle ---
  var mobileDropdowns = document.querySelectorAll('.mobile-dropdown-toggle');
  mobileDropdowns.forEach(function (toggle) {
    // Create dropdown content if it doesn't exist
    var dropdownContent = toggle.nextElementSibling;
    if (!dropdownContent || !dropdownContent.classList.contains('mobile-dropdown-content')) {
      dropdownContent = document.createElement('div');
      dropdownContent.className = 'mobile-dropdown-content';
      dropdownContent.style.display = 'none';
      dropdownContent.style.padding = '0 0 12px 16px';

      // Get links from desktop dropdown
      var desktopDropdown = document.querySelector('.dropdown-menu');
      if (desktopDropdown) {
        var links = desktopDropdown.querySelectorAll('a');
        links.forEach(function (link) {
          var mobileLink = document.createElement('a');
          mobileLink.href = link.href;
          mobileLink.textContent = link.textContent;
          mobileLink.style.display = 'block';
          mobileLink.style.padding = '10px 0';
          mobileLink.style.fontSize = '1rem';
          mobileLink.style.fontWeight = '500';
          mobileLink.style.borderBottom = '1px solid var(--color-border, #D1CBC2)';
          mobileLink.addEventListener('click', function () {
            if (mobileNav) {
              mobileNav.classList.remove('open');
              document.body.style.overflow = '';
            }
          });
          dropdownContent.appendChild(mobileLink);
        });
      }
      toggle.parentNode.insertBefore(dropdownContent, toggle.nextSibling);
    }

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var content = this.nextElementSibling;
      if (content && content.classList.contains('mobile-dropdown-content')) {
        var isOpen = content.style.display !== 'none';
        content.style.display = isOpen ? 'none' : 'block';
        this.textContent = isOpen ? 'Areas / Áreas ▾' : 'Areas / Áreas ▴';
      }
    });
  });

  // --- Desktop Dropdown Click Toggle ---
  var dropdowns = document.querySelectorAll('.nav-links .dropdown > a');
  dropdowns.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      var parent = this.closest('.dropdown');
      if (parent) {
        parent.classList.toggle('active');
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.active').forEach(function (d) {
        d.classList.remove('active');
      });
    }
  });

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
