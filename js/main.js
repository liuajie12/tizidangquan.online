/**
 * tizidangquan.online - Main Interactive Scripts
 * Fluent UI Behaviors & Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isExpanded = navMenu.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Back to Top button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Toast System
  window.showToast = function (message, icon = '✓') {
    let toast = document.getElementById('fluentToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'fluentToast';
      toast.className = 'fluent-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span style="color:#00b7c3;font-weight:bold;">${icon}</span> <span>${message}</span>`;
    toast.classList.add('show');

    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // Copy Coupon Code Trigger
  document.querySelectorAll('[data-copy-coupon]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const code = elem.getAttribute('data-copy-coupon');
      if (navigator.clipboard && code) {
        navigator.clipboard.writeText(code).then(() => {
          showToast(`已成功复制优惠码: ${code}`);
        }).catch(() => {
          showToast(`优惠码: ${code}`);
        });
      }
    });
  });

  // Filter Chips Functionality
  const filterChips = document.querySelectorAll('.filter-chip');
  if (filterChips.length > 0) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        // Find sibling chips within same filter bar
        const parent = chip.closest('.filter-bar');
        if (parent) {
          parent.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        }
        chip.classList.add('active');

        const filterValue = chip.getAttribute('data-filter') || 'all';
        const targetCards = document.querySelectorAll('[data-category]');

        targetCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category.includes(filterValue)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Quick Search Box Functionality
  const searchInput = document.getElementById('siteSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      const searchableCards = document.querySelectorAll('.airport-card, .fluent-card, tr[data-name]');

      searchableCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (!query || text.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const arrow = trigger.querySelector('.faq-arrow');
      if (content) {
        const isHidden = content.style.display === 'none';
        content.style.display = isHidden ? 'block' : 'none';
        if (arrow) {
          arrow.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });
});
