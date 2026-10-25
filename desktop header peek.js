document.addEventListener('DOMContentLoaded', function () {
      let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const navbar = document.querySelector('.bg');

      if (!navbar) return;

      window.addEventListener('scroll', function () {
        if (window.innerWidth > 768) {
          const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.classList.add('nav-hidden');
          } 
          else if (currentScrollY < lastScrollY) {
            navbar.classList.remove('nav-hidden');
          }

          lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
        } else {
          navbar.classList.remove('nav-hidden');
        }
      }, { passive: true });
    });