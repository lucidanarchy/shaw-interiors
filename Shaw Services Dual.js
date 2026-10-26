 document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // --- 1. DESKTOP CAROUSEL & AUTOPLAY ---
  // ==========================================
  const desktopTrack = document.getElementById("desktopServicesTrack");
  const desktopPrev = document.getElementById("desktopPrev");
  const desktopNext = document.getElementById("desktopNext");
  const desktopWrapper = desktopTrack ? desktopTrack.closest(".services-carousel-wrapper") : null;
  
  let desktopIndex = 0;
  let desktopTimer = null;
  let isDesktopHovered = false; // Track hover state
  const desktopIntervalTime = 4000; // 4 seconds

  function moveDesktop(index) {
    if (!desktopTrack) return;
    desktopIndex = index;
    if (desktopIndex > 2) desktopIndex = 0;
    if (desktopIndex < 0) desktopIndex = 2;
    desktopTrack.style.transform = `translateX(-${desktopIndex * 100}%)`;
  }

  function startDesktopAutoplay() {
    stopDesktopAutoplay();
    // Only start timer if user is NOT hovering
    if (!isDesktopHovered) {
      desktopTimer = setInterval(() => {
        moveDesktop(desktopIndex + 1);
      }, desktopIntervalTime);
    }
  }

  function stopDesktopAutoplay() {
    if (desktopTimer) {
      clearInterval(desktopTimer);
      desktopTimer = null;
    }
  }

  if (desktopTrack && desktopNext && desktopPrev) {
    const targetArea = desktopWrapper || desktopTrack;

    targetArea.addEventListener("pointerenter", () => {
      isDesktopHovered = true;
      stopDesktopAutoplay();
    });

    targetArea.addEventListener("pointerleave", () => {
      isDesktopHovered = false;
      startDesktopAutoplay();
    });

    desktopNext.addEventListener("click", () => {
      moveDesktop(desktopIndex + 1);
      startDesktopAutoplay(); // Will respect isDesktopHovered
    });

    desktopPrev.addEventListener("click", () => {
      moveDesktop(desktopIndex - 1);
      startDesktopAutoplay(); // Will respect isDesktopHovered
    });

    // Failsafe: restart timer if document becomes visible again
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopDesktopAutoplay();
      } else {
        startDesktopAutoplay();
      }
    });

    startDesktopAutoplay();
  }


  // ==========================================
  // --- 2. MOBILE TICKER & AUTOPLAY ---
  // ==========================================
  const mobileSlider = document.getElementById("mobileServicesSlider");
  const mobilePrev = document.getElementById("mobilePrev");
  const mobileNext = document.getElementById("mobileNext");
  let mobileTimer = null;
  let isMobileHovered = false; // Track hover state
  const mobileIntervalTime = 3500; // 3.5 seconds
  const scrollAmount = 336; // Card width + gap

  function scrollMobileNext() {
    if (!mobileSlider) return;
    const maxScroll = mobileSlider.scrollWidth - mobileSlider.clientWidth;
    if (mobileSlider.scrollLeft >= maxScroll - 10) {
      mobileSlider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      mobileSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }

  function scrollMobilePrev() {
    if (!mobileSlider) return;
    if (mobileSlider.scrollLeft <= 0) {
      mobileSlider.scrollTo({ left: mobileSlider.scrollWidth, behavior: "smooth" });
    } else {
      mobileSlider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  }

  function startMobileAutoplay() {
    stopMobileAutoplay();
    // Only start timer if user is NOT hovering or touching
    if (!isMobileHovered) {
      mobileTimer = setInterval(scrollMobileNext, mobileIntervalTime);
    }
  }

  function stopMobileAutoplay() {
    if (mobileTimer) {
      clearInterval(mobileTimer);
      mobileTimer = null;
    }
  }

  if (mobileSlider && mobileNext && mobilePrev) {
    mobileSlider.addEventListener("pointerenter", () => {
      isMobileHovered = true;
      stopMobileAutoplay();
    });

    mobileSlider.addEventListener("pointerleave", () => {
      isMobileHovered = false;
      startMobileAutoplay();
    });

    mobileSlider.addEventListener("touchstart", () => {
      isMobileHovered = true;
      stopMobileAutoplay();
    }, { passive: true });

    mobileSlider.addEventListener("touchend", () => {
      isMobileHovered = false;
      startMobileAutoplay();
    }, { passive: true });

    mobileNext.addEventListener("click", () => {
      scrollMobileNext();
      startMobileAutoplay(); // Will respect isMobileHovered
    });

    mobilePrev.addEventListener("click", () => {
      scrollMobilePrev();
      startMobileAutoplay(); // Will respect isMobileHovered
    });

    startMobileAutoplay();
  }
});