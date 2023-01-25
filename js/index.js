const headerLinks = document.querySelectorAll(".nav__link");
const sliderLine = document.querySelector(".slider-line");
const images = document.querySelectorAll(".home__image");
const close = document.querySelector(".menu__btn");
const burger = document.querySelector("#burger");
const popup = document.querySelector("#popup");
const body = document.body;
const menu = document.querySelector("#menu").cloneNode(1);
const links = Array.from(menu.children);
const multiLangs = document.querySelectorAll(".home__language-link");

const allLang = ["ru", "en"];
let count = 0;
let width;

multiLangs.forEach((multiLang) => {
  multiLang.addEventListener("click", (e) => {
    multiLangs.forEach((el) => {
      el.classList.remove("home__language-link_active");
    });
    multiLang.classList.add("home__language-link_active");
  });
});

multiLangs.forEach((b) => b.addEventListener("click", setLang));

function setLang(e) {
  for (let key in langArr) {
    let elem = document.querySelector(".lng-" + key);
    let elemPopup = document.querySelector(".popup .menu .lng-" + key);
    if (elem) {
      elem.innerHTML = langArr[key][this.value];
    }
    if (elemPopup) {
      elemPopup.innerHTML = langArr[key][this.value];
    }
  }
  if (popup) {
    closeOnClick();
  } else {
    return;
  }
}

function init() {
  width = document.querySelector(".slider").offsetWidth;
  sliderLine.style.width = width * images.length + "px";
  images.forEach((item) => {
    item.style.width = width + "px";
    item.style.height = "auto";
  });
  rollSlider();
}

window.addEventListener("resize", init);
init();

document
  .querySelector(".slider__btn-prev")
  .addEventListener("click", function () {
    count--;
    if (count < 0) {
      count = images.length - 1;
    }
    rollSlider();
  });

document
  .querySelector(".slider__btn-next")
  .addEventListener("click", function () {
    count++;
    if (count >= images.length) {
      count = 0;
    }
    rollSlider();
  });

function rollSlider() {
  sliderLine.style.transform = "translate(-" + count * width + "px)";
}

document.querySelectorAll('a[href^="#"').forEach((link) => {
  link.addEventListener("click", (evt) => {
    evt.preventDefault();
    const href = link.getAttribute("href").substring(1);
    const scrollTarget = document.getElementById(href);
    const topOffset = document.querySelector(".nav").offsetHeight;
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

function removeHeaderLinks() {
  headerLinks.forEach((headerLink) =>
    headerLink.classList.remove("nav__link-active")
  );
}

function addHeaderLinks(evt) {
  evt.preventDefault();
  removeHeaderLinks();
  evt.currentTarget.classList.add("nav__link-active");
}

headerLinks.forEach((headerLink) =>
  headerLink.addEventListener("click", addHeaderLinks)
);

burger.addEventListener("click", burgerHandler);

function burgerHandler(e) {
  e.preventDefault();
  popup.classList.toggle("open");
  burger.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();
}

function renderPopup() {
  popup.appendChild(menu);
}

links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});

function closeOnClick(e) {
  popup.classList.remove("open");
  burger.classList.remove("active");
  body.classList.remove("noscroll");
}
