document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lenis with luxury inertial deceleration
  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
    // Catch-all prevent for custom menus, dropdowns, and checkboxes
    prevent: (node) => {
      return Boolean(
        node.closest(
          ".dropdown-menu-box, .has-dropdown, .menu, .navbar-collapse, .offcanvas, .modal-body, [data-lenis-prevent]"
        )
      );
    },
  });

  // Expose globally
  window.lenis = lenis;

  // 2. Automatically sync with GSAP & ScrollTrigger if loaded on the page
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 3. Extra safeguard: Stop Lenis entirely whenever the mouse enters your dropdown menu box
  document.querySelectorAll('.has-dropdown, .dropdown-menu-box').forEach(menuBox => {
    menuBox.addEventListener('mouseenter', () => lenis.stop());
    menuBox.addEventListener('mouseleave', () => lenis.start());
  });

  // 4. Smooth scroll for all internal anchor links (e.g., href="#contact")
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, {
            offset: -40,
            duration: 1.4,
          });
        }
      }
    });
  });

  // 5. Pause background scroll when modals/offcanvas open
  document.addEventListener("show.bs.modal", () => lenis.stop());
  document.addEventListener("hidden.bs.modal", () => lenis.start());
  document.addEventListener("show.bs.offcanvas", () => lenis.stop());
  document.addEventListener("hidden.bs.offcanvas", () => lenis.start());
});