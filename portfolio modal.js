
    const portfolioData = [
      {
        number: "01 Residential",
        title: "The Master Suite Sanctuary",
        img: "build40.jpg",
        desc: "Restorative acoustic sanctuary featuring recessed linear lighting, raw travertine walls, and rich dark orange velvet accents.",
        location: "Cape Town, SA",
        year: "2026",
        materials: "Raw Travertine, Lime-Wash Plaster, Velvet Textiles",
        category: "Residential"
      },
      {
        number: "02 Residential",
        title: "Architectural Lounge & Living",
        img: "build13.jpg",
        desc: "Deep burgundy seating amidst raw exposed concrete walls, floor-to-ceiling glazing, and structured low-profile furniture.",
        location: "Constantia, SA",
        year: "2025",
        materials: "Board-Formed Concrete, Polished Screed, Burgundy Leather",
        category: "Residential"
      },
      {
        number: "03 Residential",
        title: "Culinary Architecture Suite",
        img: "build26.png",
        desc: "Monolithic marble island, suspended brass pan rack, and concealed dark oak cabinetry facing an expansive dining space.",
        location: "Camps Bay, SA",
        year: "2026",
        materials: "Nero Marquina Marble, Brushed Brass, Dark Oak",
        category: "Residential"
      },
      {
        number: "04 Residential",
        title: "Spa Sanctuary Bathroom",
        img: "build35.jpg",
        desc: "Single-perspective open bathroom with freestanding oval soaking tub, marble double vanity, and wall-hung toilet alcove.",
        location: "Clifton, SA",
        year: "2026",
        materials: "Carrara Marble, Matte Black Hardware, Micro-Cement",
        category: "Residential"
      },
      {
        number: "PROJECT 05",
        title: "Commercial Metro Lounge",
        img: "build36.jpg",
        desc: "High-end commercial interior with lush dark green velvet curved sectional sofa, terrazzo floors, and expansive high-rise views.",
        location: "Johannesburg, SA",
        year: "2026",
        materials: "Terrazzo, Dark Green Velvet, Anodized Steel",
        category: "Commercial"
      },
      {
        number: "PROJECT 06",
        title: "Atmospheric Lighting Pavilion",
        img: "build30.jpg",
        desc: "Architectural illumination study using concealed cove lighting and dramatic linear pendants over raw grey plaster surfaces.",
        location: "Franschhoek, SA",
        year: "2026",
        materials: "Soft Grey Plaster, Linear Brass Luminaires, Glass",
        category: "Commercial"
      },
      {
        number: "PROJECT 07",
        title: "Hospitality Atrium Lounge",
        img: "build58.jpg",
        desc: "Soaring triple-height atrium featuring bespoke modular lounge seating, acoustic ceiling slates, and warm timber fins.",
        location: "Durban, SA",
        year: "2026",
        materials: "Structural Glass, Fluted Oak, Anodized Bronze",
        category: "Commercial"
      },
      {
        number: "PROJECT 08",
        title: "Metropolitan Hotel Gallery",
        img: "build24.png",
        desc: "Bespoke guest reception hall integrating tactile textile installations, burnished brass accents, and custom terrazzo seating.",
        location: "Waterfront, SA",
        year: "2025",
        materials: "Burnished Brass, Terrazzo, Woven Wool",
        category: "Commercial"
      },
      {
        number: "PROJECT 09",
        title: "Executive Corporate Suite",
        img: "build21.png",
        desc: "Modern corporate workplace integrating custom oak joinery, acoustic dark blue textiles, and minimal ambient lighting.",
        location: "Sandton, SA",
        year: "2026",
        materials: "Smoked Oak, Acoustic Wool, Matte Stainless Steel",
        category: "Corporate"
      },
      {
        number: "PROJECT 10",
        title: "Spatial Material Showcase",
        img: "build28.jpg",
        desc: "Materiality showcase displaying raw travertine slabs, patinated metalwork, fluted concrete, and rich textile swatches.",
        location: "Cape Town, SA",
        year: "2025",
        materials: "Travertine, Patinated Bronze, Raw Linen, Concrete",
        category: "Corporate"
      },
      {
        number: "PROJECT 11",
        title: "Private Library Millwork",
        img: "build32.jpg",
        desc: "Custom fluted timber paneling, concealed storage portals, and integrated floor-to-ceiling library joinery.",
        location: "Bishopscourt, SA",
        year: "2025",
        materials: "Fluted American Walnut, Patinated Brass, Leather",
        category: "Corporate"
      },
      {
        number: "PROJECT 12",
        title: "Financial Boardroom Pavilion",
        img: "build13.jpg",
        desc: "Monolithic solid oak conference table paired with concealed state-of-the-art AV integration and raw granite wall panels.",
        location: "Pretoria, SA",
        year: "2026",
        materials: "Solid American Oak, Leather, Honed Granite",
        category: "Corporate"
      }
    ];

    let currentIndex = 0;

    // Lightbox Modal Opener
    function openLightbox(index) {
      currentIndex = index;
      updateModalContent();
      const modalElement = new bootstrap.Modal(document.getElementById('portfolioModal'));
      modalElement.show();
    }

    // Cycle through images (-1 for prev, +1 for next)
    function navigateGallery(direction) {
      currentIndex += direction;
      if (currentIndex < 0) {
        currentIndex = portfolioData.length - 1;
      } else if (currentIndex >= portfolioData.length) {
        currentIndex = 0;
      }
      updateModalContent();
    }

    // Update Modal Information
    function updateModalContent() {
      const data = portfolioData[currentIndex];
      if (!data) return;

      document.getElementById('modalNumber').textContent = data.number;
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalImg').src = data.img;
      document.getElementById('modalDesc').textContent = data.desc;
      document.getElementById('modalLocation').textContent = data.location;
      document.getElementById('modalYear').textContent = data.year;
      document.getElementById('modalMaterials').textContent = data.materials;
      document.getElementById('modalCategory').textContent = data.category;
    }

    // Open Fullscreen Image Mode
    function openFullscreenImage() {
      document.getElementById('fullscreenImg').src = document.getElementById('modalImg').src;
      document.getElementById('fullscreenOverlay').style.display = 'flex';
    }

    // Close Fullscreen Overlay
    function closeFullscreenImage() {
      document.getElementById('fullscreenOverlay').style.display = 'none';
    }

    // Keyboard navigation (Left/Right arrow keys)
    document.addEventListener('keydown', function(event) {
      const modal = document.getElementById('portfolioModal');
      if (modal && modal.classList.contains('show')) {
        if (event.key === 'ArrowLeft') {
          navigateGallery(-1);
        } else if (event.key === 'ArrowRight') {
          navigateGallery(1);
        }
      }
    });

    // Category Filter Functionality
    document.addEventListener('DOMContentLoaded', function () {
      const filterBtns = document.querySelectorAll('.filter-btn');
      const items = document.querySelectorAll('.portfolio-item');

      filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
          filterBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');

          const filter = this.getAttribute('data-filter');

          items.forEach(item => {
            const cat = item.getAttribute('data-category');
            if (filter === 'all' || cat === filter) {
              item.style.display = 'block';
              item.classList.add('fade-in', 'visible');
            } else {
              item.style.display = 'none';
            }
          });
        });
      });

      // Query Parameter Filter Auto-Check
      const urlParams = new URLSearchParams(window.location.search);
      const filterParam = urlParams.get('filter');
      if (filterParam) {
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${filterParam}"]`);
        if (targetBtn) {
          targetBtn.click();
        }
      }
    });
