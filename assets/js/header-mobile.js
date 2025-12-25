
  const menuBtn = document.getElementById('menuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const closeMobileMenu = document.getElementById('closeMobileMenu');

  function openMobileMenu() {
    mobileDrawer.classList.remove('translate-x-full');
    mobileOverlay.classList.remove('opacity-0', 'pointer-events-none');

    document.body.classList.add('no-scroll');
  }

  function closeMobileMenuFn() {
    mobileDrawer.classList.add('translate-x-full');
    mobileOverlay.classList.add('opacity-0', 'pointer-events-none');

    document.body.classList.remove('no-scroll');
  }

  menuBtn?.addEventListener('click', openMobileMenu);
  closeMobileMenu?.addEventListener('click', closeMobileMenuFn);
  mobileOverlay?.addEventListener('click', closeMobileMenuFn);

