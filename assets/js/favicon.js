// favicon.js
(function () {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');

  // ===== Background =====
  ctx.fillStyle = '#FF7AA2'; // primary
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  // ===== Text =====
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 34px Montserrat, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('H', size / 2, size / 2 + 1);

  // ===== Create favicon link =====
  const link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement('link');

  link.type = 'image/png';
  link.rel = 'icon';
  link.href = canvas.toDataURL('image/png');

  document.head.appendChild(link);
})();
