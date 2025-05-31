document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtns = [
    document.getElementById('themeToggleBtn'),
    document.getElementById('themeToggleBtnMobile')
  ].filter(Boolean);
  const body = document.body;

  function setSwitchIcon() {
    const sliderElems = document.querySelectorAll('.slider');
    if (body.classList.contains('light-mode')) {
      sliderElems.forEach(slider => slider.style.setProperty('--switch-icon-bg', 'url("./icons/sun.svg")'));
    } else {
      sliderElems.forEach(slider => slider.style.setProperty('--switch-icon-bg', 'url("./icons/moon.svg")'));
    }
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light-mode') {
    body.classList.add('light-mode');
    themeToggleBtns.forEach(btn => btn.checked = true);
  } else {
    body.classList.remove('light-mode');
    themeToggleBtns.forEach(btn => btn.checked = false);
  }
  setSwitchIcon();

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('change', () => {
      if (btn.checked) {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
      } else {
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark-mode');
      }
      themeToggleBtns.forEach(otherBtn => {
        if (otherBtn !== btn) otherBtn.checked = btn.checked;
      });
      setSwitchIcon();
    });
  });

  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('show');
    });
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        mobileMenu.classList.remove('show');
      }
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function(e) {
        if (this.hash && document.querySelector(this.hash)) {
          e.preventDefault();
          const target = document.querySelector(this.hash);
          const topbarHeight = 64;
          const y = target.getBoundingClientRect().top + window.pageYOffset - topbarHeight;
          window.scrollTo({ top: y, behavior: 'smooth' });
          mobileMenu.classList.remove('show');
        }
      });
    });
  }

  const sidebar = document.querySelector('.sidebar');
  const sidebarNavLinks = document.querySelectorAll('.sidebar-nav a');
  const sidebarHamburger = document.getElementById('hamburger');
  if (sidebarHamburger && sidebar) {
    sidebarHamburger.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });
    sidebarNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (sidebar.classList.contains('show')) {
          sidebar.classList.remove('show');
        }
      });
    });
    document.addEventListener('click', (event) => {
      const isClickInsideSidebar = sidebar.contains(event.target);
      const isClickOnHamburger = sidebarHamburger.contains(event.target);
      if (!isClickInsideSidebar && !isClickOnHamburger && sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
      }
    });
  }

  const carouselImages = document.querySelectorAll('.carousel-img');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const projectInfoRows = document.querySelectorAll('.project-info-row');
  let currentIndex = 0;
  if (carouselImages.length && prevBtn && nextBtn && projectInfoRows.length) {
    function showSlide(index) {
      carouselImages.forEach((img) => img.classList.remove('active'));
      carouselImages[index].classList.add('active');
    }
    function changeSlide(direction) {
      currentIndex += direction;
      if (currentIndex >= carouselImages.length) {
        currentIndex = 0;
      } else if (currentIndex < 0) {
        currentIndex = carouselImages.length - 1;
      }
      showSlide(currentIndex);
    }
    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));
    showSlide(currentIndex);
  }

  document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    setTimeout(() => {
      trail.style.opacity = '0';
    }, 50);
    setTimeout(() => {
      trail.remove();
    }, 1250);
  });
});