const maps = [
  {
    name: "Rue du Faubourg Saint-Antoine",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.4130864910135!2d2.379785676891354!3d48.85033280127298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e67209503b9401%3A0xa0063dbb0d63ac2c!2sRue%20du%20Faubourg%20Saint-Antoine%2C%20Paris%2C%20Francuska!5e0!3m2!1shr!2sba!4v1759575731155!5m2!1shr!2sba",
  },
  {
    name: "Rue de la Paix",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.4034905158815!2d2.3289593768921866!3d48.869584199918066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e3101dcc2bb%3A0x2bc3eaa1f0003cb9!2sRue%20de%20la%20Paix%2C%2075002%20Paris%2C%20Francuska!5e0!3m2!1shr!2sba!4v1759575661707!5m2!1shr!2sba",
  },
  {
    name: "Avenue des Champs-Élysées",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.226229735122!2d2.295277676892332!3d48.872963699680305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8007851%3A0x5aa1a787f38f64f6!2sAv.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris%2C%20Francuska!5e0!3m2!1shr!2sba!4v1759575580467!5m2!1shr!2sba",
  },
  {
    name: "Rue de Rivoli",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.6374278130675!2d2.32704615623768!3d48.865123888540886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e21852883b7%3A0x88f8c24b3bea7b50!2sRue%20de%20Rivoli%2C%20Paris%2C%20Francuska!5e0!3m2!1shr!2sba!4v1759574579937!5m2!1shr!2sba",
  },
];

const sities = [
  {
    name: "Paris",
    description:
      "The City of Light and love, home to the Eiffel Tower, the Louvre, and charming Montmartre. A place of elegance, romance, and art at every step.",
  },
  {
    name: "Lyon",
    description:
      "France's culinary heart, blending rich history, art, and modern life. Perfect for food lovers and culture seekers alike.",
  },
  {
    name: "Marseille",
    description:
      "A Mediterranean gem filled with warmth, culture, and sea breeze. Its Old Port and lively streets capture true southern charm.",
  },
  {
    name: "Lille",
    description:
      "A vibrant northern city known for Flemish charm, art, and friendly spirit. Lively cafés and colorful streets make it unforgettable.",
  },
  {
    name: "Toulouse",
    description:
      "The 'Pink City' glows with sunny charm and creativity. Famous for its brick architecture, aerospace heritage, and relaxed lifestyle.",
  },
  {
    name: "Nice",
    description:
      "The jewel of the French Riviera, where beaches meet elegance. A sunny mix of culture, color, and timeless Mediterranean style.",
  },
  {
    name: "Nantes",
    description:
      "A creative city on the Loire River, blending history and innovation. Known for its imagination, art, and playful attractions.",
  },
  {
    name: "Bordeaux",
    description:
      "The capital of wine and elegance, filled with beauty and flavor. A paradise for romantics and lovers of the good life.",
  },
];

// DOM elementi
const h2 = document.querySelector("h2.sevillla");
const desc = document.querySelector(".left-side p");
const links = document.querySelectorAll(".right-side a");
const main = document.querySelector("main");
const leftside = document.querySelector(".left-side");
const nav = document.querySelector("nav");
const burger = document.querySelector(".burger");
const body = document.querySelector("html");
const closeModal = document.querySelector(".first-row img");
const modalItem = document.querySelectorAll(".second-row ul li a");
const mapIframe = document.querySelector(".mapframe iframe");
const frame = document.querySelector(".mapframe");
const locationItem = document.querySelectorAll(".item");
const burgerScreen = document.querySelector(".burger-screen");
const photoChange = document.querySelector(".photo-change");
const buyTicketsBtn = document.querySelector(".buy-tickets");

// Dinamičko učitavanje slika
let currentMap = null;

// Buy Tickets button
buyTicketsBtn.addEventListener("click", () => {
  window.location.href = "tickets.html"; // Promijeni putanju gdje želiš
});

// Location items i mape
locationItem.forEach((e) => {
  e.addEventListener("click", () => {
    const street = e.querySelector("p.street-item").textContent.trim();
    const mapData = maps.find((map) => map.name === street);

    if (currentMap === mapData.name) {
      frame.style.display = "none";
      currentMap = null;
    } else {
      mapIframe.src = mapData.src;
      frame.style.display = "flex";
      currentMap = mapData.name;
    }

    e.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Promjena gradova
// Dinamičko učitavanje slika (optimizirano)
const loadedImages = new Map(); // mapa umjesto seta, čuvamo DOM element

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const cityName = link.textContent.trim();
    const imagePath = link.getAttribute("data-img");

    // Update selected link
    links.forEach((el) => el.classList.remove("selected"));
    link.classList.add("selected");

    // Sakrij sve ostale slike osim trenutne
    loadedImages.forEach((img, name) => {
      if (name !== cityName) {
        img.classList.remove("current");
      }
    });

    // Ako slika već postoji, samo je prikaži
    if (loadedImages.has(cityName)) {
      loadedImages.get(cityName).classList.add("current");
    } else if (imagePath) {
      const img = document.createElement("img");
      img.className = `changephoto current`;
      img.alt = `${cityName} cityscape`;
      img.loading = "lazy"; // lazy load!
      img.style.width = "100%"; // skaliranje preko CSS-a
      img.style.height = "1080";
      img.style.objectFit = "cover";

      img.src = imagePath;

      photoChange.appendChild(img);
      loadedImages.set(cityName, img);
    }

    // Update tekst
    const grad = sities.find((city) => city.name === cityName);
    if (grad) {
      h2.textContent = grad.name;
      desc.textContent = grad.description;
      h2.style.color = "#fff";
      h2.style.textAlign = "left";
      h2.style.padding = "5px 20px";
      leftside.style.backdropFilter = "blur(2px)";
    }
  });
});

// Scroll effect za nav
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

// Burger menu
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
