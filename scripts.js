const state = {
  bulb: "",
};

//--------------------
// UTILITIES
//--------------------

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max + 1)) + min;

const hexValues = {
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F",
};

const getHexValue = (value) => {
  let hexValue = "";

  do {
    hexValue += hexValues[value % 16] || value % 16;
    value = Math.floor(value / 16);
  } while (value > 0);

  if (hexValue.length === 1) {
    hexValue = hexValue + "0";
  }

  return hexValue.split("").reverse().join("");
};

const convertRgbToHex = (rgb) => {
  const [red, green, blue] = rgb
    .replace("rgb(", "")
    .replace(")", "")
    .split(", ");

  let hexCode = "#";

  hexCode += getHexValue(red);
  hexCode += getHexValue(green);
  hexCode += getHexValue(blue);

  return hexCode;
};

//--------------------
// VIEW
//--------------------

const nodes = {
  bulbs: document.querySelectorAll(".lights__bulb"),
  startButton: document.querySelector(".fa-play"),
  stopButton: document.querySelector(".fa-stop"),
  settings: document.querySelector(".settings"),
  colorSetting: document.querySelector(".settings__color"),
  sizeSetting: document.querySelector(".settings__size"),
  intensitySetting: document.querySelector(".settings__intensity"),
  closeSettingsButton: document.querySelector(".settings__close"),
};

const setRandomBulbSettings = (bulb) => {
  const red = getRandomNumber(0, 255);
  const green = getRandomNumber(0, 255);
  const blue = getRandomNumber(0, 255);

  bulb.style.background = `rgb(${red}, ${green}, ${blue})`;
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

const openBulbSettings = (bulb) => {
  nodes.settings.classList.add("active");
  nodes.colorSetting.value = convertRgbToHex(bulb.style.background);
  nodes.sizeSetting.value = bulb.offsetWidth / 10;
  nodes.sizeSetting.value = bulb.offsetHeight / 10;
  nodes.intensitySetting.value = bulb.style.animationDuration.slice(0, -1);
};

const changeBulbSettings = (bulb) => {
  bulb.style.background = nodes.colorSetting.value;
  bulb.style.width = `${nodes.sizeSetting.value}rem`;
  bulb.style.height = `${nodes.sizeSetting.value}rem`;
  bulb.style.animationDuration = `${nodes.intensitySetting.value}s`;
};

const closeBulbSettings = () => {
  nodes.settings.classList.remove("active");
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

nodes.bulbs.forEach((bulb) =>
  bulb.addEventListener("click", () => {
    state.bulb = bulb;
    openBulbSettings(state.bulb);
  })
);

nodes.colorSetting.addEventListener("input", () =>
  changeBulbSettings(state.bulb)
);

nodes.sizeSetting.addEventListener("input", () =>
  changeBulbSettings(state.bulb)
);

nodes.intensitySetting.addEventListener("input", () =>
  changeBulbSettings(state.bulb)
);

nodes.closeSettingsButton.addEventListener("click", () => closeBulbSettings());

// https://www.frontendmentor.io/
// https://stylestage.dev/
// https://cssbattle.dev/
// https://www.codewars.com/
// https://www.frontendpractice.com/
// https://www.firsttimersonly.com/
