const morse = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",

    0: "-----",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",

    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
    "/": "-..-.",
    "(": "-.--.",
    ")": "-.--.-",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    "_": "..--.-",
    '"': ".-..-.",
    "$": "...-..-",
    "@": ".--.-.",
    " ": "/"
};

const reverseMorse = {};

for (const key in morse) {
    reverseMorse[morse[key]] = key;
}

const inputBox = document.getElementById("inputBox");
const outputBox = document.getElementById("outputBox");

const inputLabel = document.getElementById("inputLabel");
const outputLabel = document.getElementById("outputLabel");

const switchButton = document.getElementById("switchButton");

const copyBtn = document.getElementById("copyBtn");
const pasteBtn = document.getElementById("pasteBtn");

let mode = "textToMorse";

function textToMorse(text) {
    return text
    .toUpperCase()
    .split("")
    .map(char => morse[char] || "")
    .join(" ");
}

function morseToText(code) {
  return code
    .replace(/\//g, " / ")
    .trim()
    .split(/\s+/)
    .map(symbol => reverseMorse[symbol] || "")
    .join("");
}

function updateOutput() {
    const value = inputBox.value;

    if (mode === "textToMorse") {
    outputBox.value = textToMorse(value);
    } else {
    outputBox.value = morseToText(value);
    }
}

let currentRotation = 0;

inputBox.addEventListener("input", updateOutput);

switchButton.addEventListener("click", () => {
  currentRotation = currentRotation == 180 ? 0 : 180;
  switchButton.style.transform = `rotate(${currentRotation}deg)`;

  // Save current values
  const oldInput = inputBox.value;
  const oldOutput = outputBox.value;

  if (mode === "textToMorse") {
    mode = "morseToText";

    inputLabel.textContent = "Morse";
    outputLabel.textContent = "Text";

    inputBox.placeholder = "-..../--...";

  } else {
    mode = "textToMorse";

    inputLabel.textContent = "Text";
    outputLabel.textContent = "Morse";

    inputBox.placeholder = "Type here...";
  }

  // Swap text instead of clearing
  inputBox.value = oldOutput;
  outputBox.value = oldInput;
});

copyBtn.addEventListener("click", async () => {

    try {
    await navigator.clipboard.writeText(outputBox.value);

    copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="rgb(245, 245, 245)" d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>';

    setTimeout(() => {
        copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="rgb(245, 245, 245)" d="M480 400L288 400C279.2 400 272 392.8 272 384L272 128C272 119.2 279.2 112 288 112L421.5 112C425.7 112 429.8 113.7 432.8 116.7L491.3 175.2C494.3 178.2 496 182.3 496 186.5L496 384C496 392.8 488.8 400 480 400zM288 448L480 448C515.3 448 544 419.3 544 384L544 186.5C544 169.5 537.3 153.2 525.3 141.2L466.7 82.7C454.7 70.7 438.5 64 421.5 64L288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L368 496L368 512C368 520.8 360.8 528 352 528L160 528C151.2 528 144 520.8 144 512L144 256C144 247.2 151.2 240 160 240L176 240L176 192L160 192z"/></svg>';
    }, 1000);

    } catch {
    alert("Copy failed");
    }

});

pasteBtn.addEventListener("click", async () => {

    try {
    const text = await navigator.clipboard.readText();

    inputBox.value = text;

    updateOutput();

    pasteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="rgb(245, 245, 245)" d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>';

    setTimeout(() => {
        pasteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="rgb(245, 245, 245)" d="M360 160L280 160C266.7 160 256 149.3 256 136C256 122.7 266.7 112 280 112L360 112C373.3 112 384 122.7 384 136C384 149.3 373.3 160 360 160zM360 208C397.1 208 427.6 180 431.6 144L448 144C456.8 144 464 151.2 464 160L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 160C176 151.2 183.2 144 192 144L208.4 144C212.4 180 242.9 208 280 208L360 208zM419.9 96C407 76.7 385 64 360 64L280 64C255 64 233 76.7 220.1 96L192 96C156.7 96 128 124.7 128 160L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 160C512 124.7 483.3 96 448 96L419.9 96z"/></svg>';
    }, 1000);

    } catch {
    alert("Paste failed");
    }

});

const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", () => {
  inputBox.value = "";
  outputBox.value = "";
});