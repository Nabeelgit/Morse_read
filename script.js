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
    .trim()
    .split(" ")
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

inputBox.addEventListener("input", updateOutput);

switchButton.addEventListener("click", () => {

  // Save current values
  const oldInput = inputBox.value;
  const oldOutput = outputBox.value;

  if (mode === "textToMorse") {
    mode = "morseToText";

    inputLabel.textContent = "Morse";
    outputLabel.textContent = "Text";

    inputBox.placeholder = "... --- ...";

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

    copyBtn.textContent = "✓";

    setTimeout(() => {
        copyBtn.textContent = "⧉";
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

    pasteBtn.textContent = "✓";

    setTimeout(() => {
        pasteBtn.textContent = "📋";
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