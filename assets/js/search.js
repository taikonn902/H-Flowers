document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const searchBox = document.getElementById('searchBox');
  const searchOverlay = document.getElementById('searchOverlay');

  function openSearch() {
    searchBox.classList.remove('opacity-0', 'scale-75', 'w-0', 'pointer-events-none');
    searchBox.classList.add('opacity-100', 'scale-100');
    searchOverlay.classList.remove('hidden');
    searchBox.querySelector('input').focus();
  }

  function closeSearch() {
    searchBox.classList.add('opacity-0', 'scale-75', 'w-0', 'pointer-events-none');
    searchBox.classList.remove('opacity-100', 'scale-100');
    searchOverlay.classList.add('hidden');
    searchBox.querySelector('input').value = '';
  }

  // Mở search khi nhấn icon
  searchBtn.addEventListener('click', openSearch);

  // Đóng khi nhấn overlay
  searchOverlay.addEventListener('click', closeSearch);

  // Đóng khi nhấn Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });
});
    

// Tìm kiếm gợi ý
