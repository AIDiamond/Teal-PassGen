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
  const settingsPopups = document.getElementsByClassName("settings-popup");
  for (const settingsPopup of settingsPopups) {
    settingsPopup.classList.toggle("show");
  }
}

function showPresetOptions() {
  const presetsPopups = document.getElementsByClassName("presets-popup");
  for (const presetsPopup of presetsPopups) {
    presetsPopup.classList.toggle("show");
  }
}

const enterButton = document.getElementById("generateButton");
function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
        enterButton.click();
    }
}
document.addEventListener('keydown', handleEnterKeyPress);