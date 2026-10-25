document.addEventListener("DOMContentLoaded", function () {
      const slider = document.getElementById("testimonialSlider");
      const prevBtn = document.getElementById("testimonialPrev");
      const nextBtn = document.getElementById("testimonialNext");

      if (!slider) return;

      const cardScrollAmount = 336; 
      let isHovered = false;

      function scrollNext() {
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
        if (slider.scrollLeft >= maxScrollLeft - 10) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          slider.scrollBy({ left: cardScrollAmount, behavior: "smooth" });
        }
      }

      function scrollPrev() {
        if (slider.scrollLeft <= 10) {
          slider.scrollTo({ left: slider.scrollWidth, behavior: "smooth" });
        } else {
          slider.scrollBy({ left: -cardScrollAmount, behavior: "smooth" });
        }
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", scrollNext);
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", scrollPrev);
      }

      const container = slider.closest(".container") || slider.parentElement;

      container.addEventListener("mouseenter", () => {
        isHovered = true;
      });

      container.addEventListener("mouseleave", () => {
        isHovered = false;
      });

      setInterval(() => {
        if (!isHovered) {
          scrollNext();
        }
      }, 2000);
    });