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

// OPTIMIZACIJA: Dinamičko učitavanje slika
const photoChange = document.querySelector(".photo-change");
const loadedImages = new Set(["Paris"]); // Paris je već učitan na startu

let currentMap = null;

locationItem.forEach((e) => {
  e.addEventListener("click", () => {
    const street = e.querySelector("p.street-item").textContent.trim();
    const mapData = maps.find((map) => map.name === street);

    // toggle logika
    if (currentMap === mapData.name) {
      frame.style.display = "none";
      currentMap = null;
    } else {
      mapIframe.src = mapData.src;
      frame.style.display = "flex";
      currentMap = mapData.name;
    }

    // glatki scroll do elementa
    e.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Spriječi default ponašanje

    const cityName = link.textContent.trim();
    const imagePath = link.getAttribute("data-img");

    // Ukloni "selected" sa svih linkova i dodaj na kliknuti
    links.forEach((el) => el.classList.remove("selected"));
    link.classList.add("selected");

    // OPTIMIZACIJA: Učitaj sliku samo ako već nije učitana
    if (!loadedImages.has(cityName) && imagePath) {
      const img = document.createElement("img");
      img.src = imagePath;
      img.className = `changephoto ${cityName}`;
      img.alt = `${cityName} cityscape`;
      img.width = 1920;
      img.height = 1080;

      // Dodaj event listener da čeka dok se slika učita
      img.addEventListener("load", () => {
        // Ukloni .current sa svih slika
        const allImages = photoChange.querySelectorAll(".changephoto");
        allImages.forEach((el) => el.classList.remove("current"));
        // Dodaj .current na novu sliku
        img.classList.add("current");
      });

      photoChange.appendChild(img);
      loadedImages.add(cityName);
    } else {
      // Slika već postoji, samo je prikaži
      const allImages = photoChange.querySelectorAll(".changephoto");
      allImages.forEach((element) => {
        element.classList.remove("current");
        if (element.classList.contains(cityName)) {
          element.classList.add("current");
        }
      });
    }

    // Pronađi grad u nizu sities
    const grad = sities.find((city) => city.name === cityName);

    // Ako grad postoji
    if (grad) {
      h2.textContent = grad.name;
      desc.textContent = grad.description;
      h2.style.color = "#fff";
      h2.style.textAlign = "left";
      h2.style.padding = "5px 20px";
      leftside.style.backdropFilter = "blur(2px)";

      // (Ako želiš i opis grada)
      const p = document.querySelector(".city-description");
      if (p) p.textContent = grad.description;
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
