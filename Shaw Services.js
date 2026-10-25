document.addEventListener("DOMContentLoaded", function() {
      const servicesTrack = document.getElementById('servicesTrack');
      if (!servicesTrack) return;

      const serviceGroups = servicesTrack.querySelectorAll('.services-group');
      const servicesPrevBtn = document.querySelector('.services-prev');
      const servicesNextBtn = document.querySelector('.services-next');
      
      let currentServiceGroup = 0;
      const totalServiceGroups = serviceGroups.length;
      let isHovered = false;

      function updateServicesSlide() {
        servicesTrack.style.transform = `translateX(-${currentServiceGroup * 100}%)`;
      }

      function nextServiceGroup() {
        currentServiceGroup = (currentServiceGroup + 1) % totalServiceGroups;
        updateServicesSlide();
      }

      function prevServiceGroup() {
        currentServiceGroup = (currentServiceGroup - 1 + totalServiceGroups) % totalServiceGroups;
        updateServicesSlide();
      }

      if (servicesNextBtn && servicesPrevBtn) {
        servicesNextBtn.addEventListener('click', () => {
          nextServiceGroup();
        });

        servicesPrevBtn.addEventListener('click', () => {
          prevServiceGroup();
        });
      }

      const container = servicesTrack.closest(".container") || servicesTrack.parentElement;

      container.addEventListener("mouseenter", () => {
        isHovered = true;
      });

      container.addEventListener("mouseleave", () => {
        isHovered = false;
      });

      setInterval(() => {
        if (!isHovered) {
          nextServiceGroup();
        }
      }, 4000); // 4 seconds
    });