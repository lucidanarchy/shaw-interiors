document.addEventListener('DOMContentLoaded', () => {
      // =========================================================
      // 1. FILTER BUTTONS LOGIC
      // =========================================================
      const filterBtns = document.querySelectorAll('#filterContainer .filter-btn');
      const portfolioItems = document.querySelectorAll('.portfolio-item');

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Remove active state from all buttons
          filterBtns.forEach(b => b.classList.remove('active'));
          // Add active state to clicked button
          btn.classList.add('active');

          const filterValue = btn.getAttribute('data-filter');

          portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    });

    // =========================================================
    // 2. HTML-DRIVEN LIGHTBOX & FULLSCREEN LOGIC
    // =========================================================
    let currentCardIndex = 0;

    function openLightboxFromElement(cardElement) {
      const cards = Array.from(document.querySelectorAll('.portfolio-card'));
      currentCardIndex = cards.indexOf(cardElement);
      updateModalContent(cardElement);
      
      const modal = new bootstrap.Modal(document.getElementById('portfolioModal'));
      modal.show();
    }

    function updateModalContent(cardElement) {
      const dataWrapper = cardElement.querySelector('.portfolio-img-wrapper');
      
      document.getElementById('modalImg').src = dataWrapper.getAttribute('data-img');
      document.getElementById('modalNumber').textContent = dataWrapper.getAttribute('data-number') || 'PROJECT';
      document.getElementById('modalTitle').textContent = dataWrapper.getAttribute('data-title') || '';
      document.getElementById('modalDesc').textContent = dataWrapper.getAttribute('data-desc') || '';
      document.getElementById('modalLocation').textContent = dataWrapper.getAttribute('data-location') || 'N/A';
      document.getElementById('modalYear').textContent = dataWrapper.getAttribute('data-year') || '2026';
      document.getElementById('modalMaterials').textContent = dataWrapper.getAttribute('data-materials') || 'Bespoke Finishes';
      document.getElementById('modalCategory').textContent = dataWrapper.getAttribute('data-category') || 'Architecture';
    }

    function navigateGallery(direction) {
      const visibleCards = Array.from(document.querySelectorAll('.portfolio-card')).filter(card => {
        return card.closest('.portfolio-item').style.display !== 'none';
      });

      if (visibleCards.length === 0) return;

      const currentVisibleIndex = visibleCards.indexOf(document.querySelectorAll('.portfolio-card')[currentCardIndex]);
      let nextVisibleIndex = currentVisibleIndex + direction;

      if (nextVisibleIndex >= visibleCards.length) nextVisibleIndex = 0;
      if (nextVisibleIndex < 0) nextVisibleIndex = visibleCards.length - 1;

      const nextCard = visibleCards[nextVisibleIndex];
      currentCardIndex = Array.from(document.querySelectorAll('.portfolio-card')).indexOf(nextCard);
      updateModalContent(nextCard);
    }

    function openFullscreenImage() {
      const currentImgSrc = document.getElementById('modalImg').src;
      document.getElementById('fullscreenImg').src = currentImgSrc;
      document.getElementById('fullscreenOverlay').style.display = 'flex';
    }

    function closeFullscreenImage() {
      document.getElementById('fullscreenOverlay').style.display = 'none';
    }