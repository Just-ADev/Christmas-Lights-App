//--------------------
// MODEL
//--------------------

const state = {
  bulb: "",
};

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max + 1)) + min;

const setRandomBulbSettings = (bulb) => {
  let r = getRandomNumber(0, 255);
  let g = getRandomNumber(0, 255);
  let b = getRandomNumber(0, 255);

  let time = Math.random() + 1;
  bulb.style.background = `rgb(${r}, ${g}, ${b})`;
  bulb.style.animationDuration = `${time}s`;
};

//--------------------
// VIEW
//--------------------

const nodes = {
  bulbs: document.querySelectorAll(".lights__bulb"),
  startButton: document.querySelector(".fa-play"),
  stopButton: document.querySelector(".fa-stop"),
};

const controlBulbsAnimation = (animation) => {
  nodes.bulbs.forEach((bulb) => {
    bulb.style.animationName = animation;
  });
};

const switchControlButton = () => {
  nodes.startButton.classList.toggle("active");
  nodes.stopButton.classList.toggle("active");
};

//--------------------
// CONTROLLER
//--------------------

window.addEventListener("load", () => {
  nodes.bulbs.forEach((bulb) => setRandomBulbSettings(bulb));
});

nodes.startButton.addEventListener("click", () => {
  controlBulbsAnimation("pulsate");
  switchControlButton();
});

nodes.stopButton.addEventListener("click", () => {
  controlBulbsAnimation("none");
  switchControlButton();
});

// https://www.frontendmentor.io/
// https://stylestage.dev/
// https://cssbattle.dev/
// https://www.codewars.com/
// https://www.frontendpractice.com/
// https://www.firsttimersonly.com/
