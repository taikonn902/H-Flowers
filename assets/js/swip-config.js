document.addEventListener('DOMContentLoaded', () => {
  const swiperEl = document.querySelector('.swiper');
  const wrapper = swiperEl.querySelector('.swiper-wrapper');

  /* =========================
     CLONE ĐÚNG THỨ TỰ
  ========================= */
  const originalSlides = Array.from(wrapper.children);
  const slideCount = originalSlides.length;

  // clone sau (1 2 3 4 5)
  originalSlides.forEach(slide => {
    wrapper.appendChild(slide.cloneNode(true));
  });

  // clone trước (5 4 3 2 1)
  [...originalSlides].reverse().forEach(slide => {
    wrapper.insertBefore(slide.cloneNode(true), wrapper.firstChild);
  });

  /* =========================
     INIT SWIPER
  ========================= */
  const swiper = new Swiper(swiperEl, {
    loop: false,
    speed: 400,
    spaceBetween: 24,

    slidesPerView: 1.5,
    slidesPerGroup: 1,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 2,
        allowTouchMove: false,
      }
    },

    initialSlide: slideCount,
    watchSlidesProgress: true,
  });

  /* =========================
     REWIND CHUẨN THEO GROUP
  ========================= */
  swiper.on('transitionEnd', () => {
    const active = swiper.activeIndex;
    const group = swiper.params.slidesPerGroup;
    const min = slideCount;
    const max = slideCount * 2;

    // 👉 NEXT quá phải
    if (active >= max) {
      const offset = (active - slideCount) % slideCount;
      const aligned = slideCount + Math.floor(offset / group) * group;
      swiper.slideTo(aligned, 0, false);
    }

    // 👉 PREV quá trái
    if (active < min) {
      const offset = (active - slideCount + slideCount) % slideCount;
      const aligned = slideCount + Math.floor(offset / group) * group;
      swiper.slideTo(aligned, 0, false);
    }
  });
});
