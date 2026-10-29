<script>
  
  document.addEventListener('DOMContentLoaded', () => {
  // Reveal page on load
  document.body.classList.add('loaded');

  // Intercept internal link clicks for smooth fade-out
  const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Ensure link is valid internal URL
      if (href && !href.startsWith('javascript:') && !href.startsWith('mailto:')) {
        e.preventDefault();
        document.body.classList.remove('loaded');
        document.body.classList.add('is-exiting');

        setTimeout(() => {
          window.location.href = href;
        }, 600); // Matches CSS transition duration
      }
    });
  });
});
  
  
  
  
  
  </script>
  