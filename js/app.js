const cities = {
  Paris: "../imgs/paris.jpg",
  Lyon: "../imgs/lyon.jpg",
  Marseille: "../imgs/marsej.jpg",
  Lille: "../imgs/lile.webp",
  Toulouse: "../imgs/tuluz.jpg",
  Nice: "../imgs/nica.jpg",
  Nantes: "../imgs/nantes.jpg",
  Bordeaux: "../imgs/bordo.jpg",
};

const h2 = document.querySelector("h2.sevillla");
const links = document.querySelectorAll(".right-side a");
const main = document.querySelector("main");
const leftside = document.querySelector(".left-side");
const nav = document.querySelector("nav");
const burger = document.querySelector(".burger");
const body = document.querySelector("html");
const closeModal = document.querySelector(".first-row img");
const modalItem = document.querySelectorAll(".second-row ul li a");

const burgerScreen = document.querySelector(".burger-screen");

links.forEach((link) => {
  link.addEventListener("click", () => {
    const cityName = link.textContent;

    links.forEach((el) => {
      el.classList.remove("selected");
    });
    link.classList.add("selected");
    if (cities[cityName]) {
      h2.textContent = cityName;
      h2.style.color = "#fff";
      h2.style.textAlign = "left";
      h2.style.padding = "5px 20px";
      leftside.style.backdropFilter = "blur(2px)";
      main.style.background = `url('${cities[cityName]}') no-repeat center/cover`;
    }
  });
});

window.addEventListener("scroll", () => {
  const mainHeight = main.offsetHeight;
  const scrollPosition = window.scrollY || window.pageYOffset;
  if (scrollPosition + 800 > mainHeight) {
    nav.style.backdropFilter = "blur(10px)";
  } else {
    nav.style.backdropFilter = "blur(0px)";
    nav.style.backgroundColor = "transparent";
  }
});

burger.addEventListener("click", () => {
  body.style.overflow = "hidden";
  burgerScreen.style.display = "flex";
});
closeModal.addEventListener("click", () => {
  body.style.overflow = "auto";
  burgerScreen.style.display = "none";
});

modalItem.forEach((element) => {
  element.addEventListener("click", () => {
    body.style.overflow = "auto";
    burgerScreen.style.display = "none";
  });
});

const preloadedImages = [];

cities.forEach((src) => {
  const img = new Image();
  img.src = src;
  preloadedImages.push(img);
});
