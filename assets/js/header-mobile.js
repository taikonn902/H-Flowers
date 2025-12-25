document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = document.getElementById('closeMobileMenu');

  function openMenu() {
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
  }

  function closeMenu() {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('opacity-0', 'pointer-events-none');
  }

  menuBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  // Optional: liên kết với cart & search
  document.getElementById('mobileCartBtn')?.addEventListener('click', () => {
    closeMenu();
    document.getElementById('cartBtn')?.click();
  });

  document.getElementById('mobileSearchBtn')?.addEventListener('click', () => {
    closeMenu();
    document.getElementById('searchBtn')?.click();
  });
});
