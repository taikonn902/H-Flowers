const slider = document.getElementById('heroSlider');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let slides = slider.children;
const realTotal = dots.length;
let index = 1;
let isAnimating = false;

/* ===== CLONE SLIDES ===== */
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

slides = slider.children;

/* ===== INIT ===== */
slider.style.transform = `translateX(-100%)`;
updateDots(0);

/* ===== DOT ===== */
function updateDots(realIndex) {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === realIndex);
  });
}

/* ===== MOVE ===== */
function moveSlider() {
  isAnimating = true;
  slider.style.transition = 'transform 0.7s ease';
  slider.style.transform = `translateX(-${index * 100}%)`;
}

/* ===== TRANSITION END (LOOP FIX ONLY) ===== */
slider.addEventListener('transitionend', () => {
  slider.style.transition = 'none';

  if (index === slides.length - 1) {
    index = 1;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  if (index === 0) {
    index = slides.length - 2;
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  isAnimating = false;
});

/* ===== NEXT ===== */
nextBtn.onclick = () => {
  if (isAnimating) return;

  index++;
  moveSlider();

  updateDots((index - 1) % realTotal);

  // 🔥 pulse NEXT
  pulseControls('next');
};


/* ===== PREV ===== */
prevBtn.onclick = () => {
  if (isAnimating) return;

  index--;
  moveSlider();

  updateDots((index - 1 + realTotal) % realTotal);

  // 🔥 pulse PREV
  pulseControls('prev');
};


/* ===== DOT CLICK ===== */
dots.forEach((dot, i) => {
  dot.onclick = () => {
    if (isAnimating) return;

    index = i + 1;
    moveSlider();

    // 🔥 DOT ACTIVE NGAY
    updateDots(i);
  };
});