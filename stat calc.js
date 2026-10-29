 document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.getElementById('statsSection');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounters = () => {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        const prefix = stat.getAttribute('data-prefix') || '';
        const suffix = stat.getAttribute('data-suffix') || '';
        const duration = 2000; // Animation time in milliseconds (2 seconds)
        const frameRate = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameRate);
        let currentFrame = 0;

        const counterInterval = setInterval(() => {
          currentFrame++;
          // Smooth ease-out effect for a refined editorial feel
          const progress = currentFrame / totalFrames;
          const easeOutProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(easeOutProgress * target);

          // Format single digits with leading zero if specified
          let formattedValue = currentValue;
          if (prefix && currentValue < 10) {
            formattedValue = prefix + currentValue;
          }

          stat.textContent = `${formattedValue}${suffix}`;

          if (currentFrame >= totalFrames) {
            // Guarantee final exact number at end of animation
            let finalFormatted = target;
            if (prefix && target < 10) {
              finalFormatted = prefix + target;
            }
            stat.textContent = `${finalFormatted}${suffix}`;
            clearInterval(counterInterval);
          }
        }, frameRate);
      });
    };

    // Trigger counting animation only when visible on screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    if (statsSection) {
      observer.observe(statsSection);
    }
  });