const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar-nav a");

function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("show-sidebar");
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}


window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

function toggleTheme() {
  document.body.classList.toggle("light-mode");

  const slider = document.querySelector(".slider::before"); // pseudo element'e doğrudan müdahale edemeyiz!
  const sliderElem = document.querySelector(".slider");

  if (document.body.classList.contains("light-mode")) {
    sliderElem.style.setProperty('--switch-icon', "'☀️'");
  } else {
    sliderElem.style.setProperty('--switch-icon', "'🌙'");
  }
}
