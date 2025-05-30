let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-img');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    nextSlide();
    const rightBtn = document.querySelector('.carousel-btn.next img');
    rightBtn.classList.add('active');
    setTimeout(() => rightBtn.classList.remove('active'), 200);
  }
  if (e.key === 'ArrowLeft') {
    prevSlide();
    const leftBtn = document.querySelector('.carousel-btn.prev img');
    leftBtn.classList.add('active');
    setTimeout(() => leftBtn.classList.remove('active'), 200);
  }
});
