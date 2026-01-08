
const slider = document.getElementById('heroSlider');
const dots = document.querySelectorAll('.dot');
const total = dots.length;
let index = 0;

function updateSlider() {
  slider.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

document.getElementById('nextBtn').onclick = () => {
  index = (index + 1) % total;
  updateSlider();
};

document.getElementById('prevBtn').onclick = () => {
index = (index - 1 + total) % total;
  updateSlider();
};

dots.forEach((dot, i) => {
  dot.onclick = () => {
    index = i;
    updateSlider();
  };
});

