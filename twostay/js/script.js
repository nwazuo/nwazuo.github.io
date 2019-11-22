let triggers = document.querySelectorAll(".drop");
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
  console.log("Left");
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
