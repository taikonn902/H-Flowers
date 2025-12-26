const swiper = new Swiper('.swiper', {
  slidesPerView: 1.5,          // 1.5 sản phẩm trên mobile
  spaceBetween: 16,
  grabCursor: true,
  loop: true,
  breakpoints: {
    640: {
      slidesPerView: 2,        // Tablet
    },
    1024: {
      slidesPerView: 4,        // Desktop
      spaceBetween: 24,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
