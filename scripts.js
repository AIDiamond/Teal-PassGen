function generatePassword() {
  let password = "";
  let pools = [];
  let nums = [];
  const settingsPopup = document.getElementById("settings-popup");
  const poolCount = settingsPopup.querySelectorAll('.pool-row').length;
  for (let i = 1; i <= poolCount; i++) {
    pools.push(document.getElementById(`pool${i}`).value);
    nums.push(document.getElementById(`num${i}`).value);
  }

  for (let i = 0; i < pools.length; i++) {
    for (let j = 0; j < nums[i]; j++) {
      password += pools[i].charAt(Math.floor(Math.random() * pools[i].length));
    }
  }

  return password;
}

function addCharacterPool() {
  const settingsPopup = document.getElementById('settings-popup');
  const poolCount = settingsPopup.querySelectorAll('.pool-row').length + 1;

  const poolRow = document.createElement('div');
  poolRow.classList.add('pool-row');
  poolRow.id = "pool-row" + poolCount;
  poolRow.innerHTML = `
    <label for="pool${poolCount}">Pool ${poolCount}:</label>
    <input type="text" id="pool${poolCount}">
    <input type="number" id="num${poolCount}" min="0">
  `;

  settingsPopup.appendChild(poolRow);
}

function removeCharacterPool() {
  const settingsPopup = document.getElementById('settings-popup');
  const poolCount = settingsPopup.querySelectorAll('.pool-row').length;
  const lastPool = "pool-row" + poolCount;
  const removePool = document.getElementById(lastPool);

  if (poolCount > 3) {
    settingsPopup.removeChild(removePool);
  }
  else {}
}

function generateNewPasswords() {
  let numPasswords = document.getElementById("numPasswords").value;
  let passwordList = document.getElementById("passwordList");
  passwordList.innerHTML = "";

  for (let i = 0; i < numPasswords; i++) {
    let password = generatePassword();
    let listItem = document.createElement("li");
    listItem.innerHTML = password;
    passwordList.appendChild(listItem);
  }

  const passwordContainer = document.getElementById('password-container');
  passwordContainer.classList.add('show');
}

function copyPasswords() {
  let passwordList = document.getElementById("passwordList");
  let range = document.createRange();
  range.selectNodeContents(passwordList);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}

function generateNewPassword() {
  document.getElementById("password").innerHTML = generatePassword();
}

function copyPassword() {
  let passwordText = document.getElementById("password");
  let range = document.createRange();
  range.selectNode(passwordText);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const isDarkModeEnabled = body.classList.contains('dark-mode');
  localStorage.setItem('darkModeEnabled', isDarkModeEnabled);
}

function setColorMode() {
  const body = document.body;
  const darkModeEnabled = JSON.parse(localStorage.getItem('darkModeEnabled'));

  if (darkModeEnabled) {
      body.classList.add('dark-mode');
  } else {
      body.classList.remove('dark-mode');
  }
}

window.addEventListener('load', setColorMode);

function showSettings() {
  const settingsPopups = document.getElementsByClassName('settings-popup');
  for (const settingsPopup of settingsPopups) {
    settingsPopup.classList.toggle('show');
  }
}

function showPresetOptions() {
  const presetsPopups = document.getElementsByClassName('presets-popup');
  for (const presetsPopup of presetsPopups) {
    presetsPopup.classList.toggle('show');
  }
}

let presetButtonsExist = false;
function showPresetButtons() {
  const presetsPopup = document.getElementById('presets-popup');

  if (prefillButtonsExist) {
    const prefill = document.getElementById('prefills');
    presetsPopup.removeChild(prefill);
    prefillButtonsExist = false;
  }

  const presetsExist = document.getElementById('presets');

  if (presetsExist === null) {
    const presets = document.createElement('div');
    presets.id = "presets";
    presets.classList.add('presets','selection-buttons');
    presets.innerHTML = `
          <button id="presetOne" onclick="applyPreset()">Letters Uppercase</button>
          <button id="presetTwo" onclick="applyPreset()">Letters Lowercase</button>
          <button id="presetThree" onclick="applyPreset()">All Letters</button>
          <button id="presetFour" onclick="applyPreset()">Numbers</button>
          <button id="presetFive" onclick="applyPreset()">Letters + Numbers</button>
          <button id="presetSix" onclick="applyPreset()">Letters + Numbers + Specials</button>
          `;
    presetsPopup.appendChild(presets);
    presetButtonsExist = true;
  }
  else {
    presetsPopup.removeChild(presetsExist);
    presetButtonsExist = false;
  }
}

let prefillButtonsExist = false;
function showPrefillButtons() {
  const presetsPopup = document.getElementById('presets-popup');

  if (presetButtonsExist) {
    const presets = document.getElementById('presets');
    presetsPopup.removeChild(presets);
    presetButtonsExist = false;
  }

  const prefillsExist = document.getElementById('prefills');

  if (prefillsExist === null) {
    const prefills = document.createElement('div');
    prefills.id = "prefills";
    prefills.classList.add('prefills','selection-buttons');
    prefills.innerHTML = `
          <button id="prefillOne" onclick="copyPrefill()">abcdefghijklmnopqrstuvwxyz</button>
          <button id="prefillTwo" onclick="copyPrefill()">ABCDEFGHIJKLMNOPQRSTUVWXYZ</button>
          <button id="prefillThree" onclick="copyPrefill()">abcdefghijklmnopqrstuvwxyz&#013;ABCDEFGHIJKLMNOPQRSTUVWXYZ</button>
          <button id="prefillFour" onclick="copyPrefill()">0123456789</button>
          <button id="prefillFive" onclick="copyPrefill()">!@#$%^&*()</button>
          <button id="prefillSix" onclick="copyPrefill()">!@#$%^&*()_-+={}[]:;"'<>,.?/</button>
          `;
    presetsPopup.appendChild(prefills);
    prefillButtonsExist = true;
  }
  else {
    presetsPopup.removeChild(prefillsExist);
    prefillButtonsExist = false;
  }
}

const enterButton = document.getElementById('generateButton');
function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
        enterButton.click();
    }
}
document.addEventListener('keydown', handleEnterKeyPress);