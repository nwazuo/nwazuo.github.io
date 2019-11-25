//stripe style navigation follow-along
let triggers = document.querySelectorAll(".large-menu .drop");
let dropdownBg = document.querySelector(".dropdownBg");
const nav = document.querySelector("nav.large-menu");

function handleEnter() {
  if (window.matchMedia("(max-width: 900px)").matches) {
    return;
  }
  console.log("Entered");
  this.classList.add("trigger-enter");
  setTimeout(() => {
    this.classList.contains("trigger-enter") &&
      this.classList.add("trigger-open");
  }, 150);
  dropdownBg.classList.add("open");

  const dropdown = this.querySelector(".dropdown");
  const coords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();
  const pos = {
    width: coords.width,
    height: coords.height,
    top: coords.top - navCoords.top,
    left: coords.left - navCoords.left
  };

  dropdownBg.style.setProperty("width", `${pos.width}px`);
  dropdownBg.style.setProperty("height", `${pos.height}px`);
  dropdownBg.style.setProperty(
    "transform",
    `translate(${pos.left}px, ${pos.top}px)`
  );
}

function handleLeave() {
  this.classList.remove("trigger-enter");
  this.classList.remove("trigger-open");
  dropdownBg.classList.remove("open");
}

triggers.forEach(trigger =>
  trigger.addEventListener("mouseenter", handleEnter)
);
triggers.forEach(trigger =>
  trigger.addEventListener("mouseleave", handleLeave)
);

//mobile menu
const trigger = document.querySelector(".hamburger");
const navMobile = document.querySelector(".collapsed-menu");

function triggerMenu() {
  if (!trigger.classList.contains("close")) {
    trigger.classList.add("close");
  } else {
    trigger.classList.remove("close");
  }

  if (!navMobile.classList.contains("hide-menu")) {
    navMobile.classList.add("hide-menu");
  } else {
    navMobile.classList.remove("hide-menu");
  }
}

trigger.addEventListener("click", triggerMenu);

//Mobile menu navigation options
const drop = document.querySelector(".collapsed-menu .dropdown");
const subTriggers = document.querySelectorAll(".collapsed-menu .drop > a ");

function hideSubmenu(e) {
  e.preventDefault();
  console.log(this);
  if (this.parentNode.querySelector(".dropdown").classList.contains("hide")) {
    this.parentNode.querySelector(".dropdown").classList.remove("hide");
    drop.ontouchend = e => {
      e.preventDefault();
    };
  } else {
    this.parentNode.querySelector(".dropdown").classList.add("hide");
    drop.ontouchend = e => {
      return;
    };
  }
}
subTriggers.forEach(subTrigger => {
  subTrigger.addEventListener("click", hideSubmenu);
});
