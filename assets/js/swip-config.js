document.addEventListener('DOMContentLoaded', () => {
  const swiperEl = document.querySelector('.swiper');
  const wrapper = swiperEl.querySelector('.swiper-wrapper');
  const slides = swiperEl.querySelectorAll('.swiper-slide');

  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');

  let swiper = null;
  let isMobile = null; // ⚠️ quan trọng: KHÔNG set false sẵn
  let currentIndex = 0;

  const perView = 4;
  const gap = 24;

  /* ================= MOBILE ================= */
  const initMobile = () => {
    if (swiper) return;

    swiper = new Swiper(swiperEl, {
      slidesPerView: 1.5,
      spaceBetween: gap,
      loop: false,
    });

    btnPrev.style.display = 'none';
    btnNext.style.display = 'none';
  };

  const destroyMobile = () => {
    if (!swiper) return;

    swiper.destroy(true, true);
    swiper = null;
    wrapper.style.transform = '';
  };

  /* ================= DESKTOP ================= */
  const initDesktop = () => {
    currentIndex = 0;      // luôn bắt đầu từ sp đầu
    updateDesktop();       // ⚠️ disable nút NGAY tại đây

    btnPrev.style.display = 'flex';
    btnNext.style.display = 'flex';
  };

  const updateDesktop = () => {
    if (!slides.length) return;

    const slideWidth = slides[0].offsetWidth + gap;
    const maxIndex = Math.max(0, slides.length - perView);

    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
    wrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // ✅ DISABLE NGAY KHI Ở ĐẦU / CUỐI
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === maxIndex;
  };

  btnNext.addEventListener('click', () => {
    currentIndex++;
    updateDesktop();
  });

  btnPrev.addEventListener('click', () => {
    currentIndex--;
    updateDesktop();
  });

  /* ================= SWITCH ================= */
  const handleResize = () => {
    const shouldMobile = window.innerWidth < 1024;

    // LẦN ĐẦU LOAD
    if (isMobile === null) {
      isMobile = shouldMobile;
      shouldMobile ? initMobile() : initDesktop();
      return;
    }

    // CHUYỂN MODE
    if (shouldMobile !== isMobile) {
      destroyMobile();
      shouldMobile ? initMobile() : initDesktop();
      isMobile = shouldMobile;
    }
  };

  handleResize();
  window.addEventListener('resize', handleResize);
});
