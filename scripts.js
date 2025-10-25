document.addEventListener('DOMContentLoaded', () => {


  const menuToggle = document.getElementById('menuToggle');
  const sideNav = document.getElementById('sideNav');

  if (menuToggle && sideNav) {
    menuToggle.addEventListener('click', () => {
      sideNav.classList.toggle('collapsed');
    });
  }


  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.1, 
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

 
  const initSlider = (wrapperId, prevId, nextId) => {
    const wrapper = document.getElementById(wrapperId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);

    
    if (!wrapper || !prevBtn || !nextBtn) return;

    const slides = Array.from(wrapper.children);
    if (slides.length === 0) return;

    let currentIndex = 0;

    slides[currentIndex].classList.add('active');

    function goToSlide(index) {
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }

      const offsetPercent = index * 100;
      wrapper.style.transform = `translateX(-${offsetPercent}%)`;


      slides.forEach((slide, i) => {
        if(i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
      currentIndex = index;
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  };

  initSlider('charWrapper', 'charPrev', 'charNext');
  initSlider('gameWrapper', 'gamePrev', 'gameNext');


 
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeLightbox = document.getElementById('closeLightbox');

  if (galleryItems.length > 0 && lightbox && lightboxImg && closeLightbox) {
    
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img'); 
        if (img) {
          lightboxImg.src = img.src;       
          lightboxImg.alt = img.alt;       
          lightbox.classList.remove('hidden'); 
        }
      });
    });

    
    const close = () => {
      lightbox.classList.add('hidden');
      lightboxImg.src = ''; 
    };

    
    closeLightbox.addEventListener('click', close);

   
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) { 
        close();
      }
    });
    
    
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && !lightbox.classList.contains('hidden')) {
        close();
      }
    });
  }
});