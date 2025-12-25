
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  const dots = document.querySelectorAll('.dot');

  let slides = Array.from(track.children);
  const realCount = slides.length;

  // Clone
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  slides = Array.from(track.children);

  let index = 1;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  const threshold = 60;

  function setTransform(i, transition = true) {
    track.style.transition = transition ? 'transform 0.5s ease' : 'none';
    track.style.transform = `translateX(-${i * 100}%)`;
  }

  function getRealIndex() {
    if (index === 0) return realCount - 1;
    if (index === realCount + 1) return 0;
    return index - 1;
  }

  function updateDots() {
    const realIndex = getRealIndex();
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-white', i === realIndex);
      dot.classList.toggle('bg-white/60', i !== realIndex);
    });
  }

  setTransform(index, false);
  updateDots();

  // ======================
  // Drag logic
  // ======================
  function dragMove(diff) {
    track.style.transform = `translateX(calc(-${index * 100}% + ${diff}px))`;
  }

  function dragEnd(diff) {
    if (diff < -threshold) index++;
    else if (diff > threshold) index--;

    setTransform(index, true);
    updateDots();
  }

  // ======================
  // Touch
  // ======================
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.transition = 'none';
  });

  track.addEventListener('touchmove', e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    dragMove(currentX - startX);
  });

  track.addEventListener('touchend', () => {
    isDragging = false;
    dragEnd(currentX - startX);
  });

  // ======================
  // Loop fix
  // ======================
  track.addEventListener('transitionend', () => {
    if (slides[index] === firstClone) {
      index = 1;
      setTransform(index, false);
    }

    if (slides[index] === lastClone) {
      index = slides.length - 2;
      setTransform(index, false);
    }
  });

  // ======================
  // Buttons
  // ======================
  document.getElementById('next')?.addEventListener('click', () => {
    index++;
    setTransform(index, true);
    updateDots();
  });

  document.getElementById('prev')?.addEventListener('click', () => {
    index--;
    setTransform(index, true);
    updateDots();
  });
});