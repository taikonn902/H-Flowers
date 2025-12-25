// // header.js
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const cartDropdown = document.getElementById('cartDropdown');

  let lastScrollY = window.scrollY;
  let ticking = false;

  // Biến global để các module khác tham chiếu
  window.headerState = {
    isHeaderHidden: false
  };

  function onScroll() {
    const currentScrollY = window.scrollY;

    // ===== Scroll xuống → ẩn header + đóng cart nếu đang mở =====
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      if (!window.headerState.isHeaderHidden) {
        header.classList.add('-translate-y-full');
        window.headerState.isHeaderHidden = true;

        // Đóng cart dropdown nếu mở
        if (cartDropdown && !cartDropdown.classList.contains('hidden')) {
          cartDropdown.classList.add('hidden');

          // Nếu cart.js đang dùng biến global window.cartState
          if (window.cartState) window.cartState.isCartOpen = false;
        }
      }
    }

    // ===== Scroll lên → hiện header =====
    if (currentScrollY < lastScrollY) {
      header.classList.remove('-translate-y-full');
      window.headerState.isHeaderHidden = false;
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });
});








