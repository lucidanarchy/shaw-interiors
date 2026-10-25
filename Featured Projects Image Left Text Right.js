 document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll("#imageLeftSlider .project-slide");
    const nextBtn = document.querySelector(".imgleft-next");
    const prevBtn = document.querySelector(".imgleft-prev");
    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
      });
    }

    if (nextBtn && prevBtn && slides.length > 0) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      });

      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
      });
    }
  });