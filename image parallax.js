 document.addEventListener("DOMContentLoaded", function () {
      const parallaxContainers = document.querySelectorAll('[data-parallax="scroll"]');

      if (parallaxContainers.length === 0) return;

      const observerOptions = {
        root: null,
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const container = entry.target;
          const image = container.querySelector('.parallax-bg');

          if (entry.isIntersecting) {
            window.addEventListener('scroll', handleParallax, { passive: true });
            window.activeParallaxContainers = window.activeParallaxContainers || new Set();
            window.activeParallaxContainers.add({ container, image });
          } else {
            if (window.activeParallaxContainers) {
              window.activeParallaxContainers.forEach((item) => {
                if (item.container === container) {
                  window.activeParallaxContainers.delete(item);
                }
              });
            }
          }
        });
      }, observerOptions);

      parallaxContainers.forEach((container) => observer.observe(container));

      function handleParallax() {
        if (!window.activeParallaxContainers) return;

        window.activeParallaxContainers.forEach(({ container, image }) => {
          const containerRect = container.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const progress = (containerRect.top + containerRect.height / 2) / viewportHeight;
          const intensity = 25;
          const translateY = (progress - 0.8) * intensity;

          image.style.transform = `translateY(${translateY}%) scale(1.15)`;
        });
      }

      handleParallax();
    });