document.addEventListener("DOMContentLoaded", function () {
    let lastScrollY = window.scrollY;
    let isScrollingDown = true;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;
    }, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          const rect = entry.boundingClientRect;
          if (!isScrollingDown && rect.top > 0) {
            entry.target.classList.remove('visible');
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
      observer.observe(element);
    });
  });