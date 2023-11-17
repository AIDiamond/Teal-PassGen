//Function to generate a single password based on all the character pools and their number inputs.
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

//Function to add a character pool.
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

//Function to remove a character pool.
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

//Function to generate and list however many passwords the user requested. Runs the generatePassword() per password requested.
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

//Function to copy all the listed passwords to the clipboard.
function copyPasswords() {
  let passwordList = document.getElementById("passwordList");
  let range = document.createRange();
  range.selectNodeContents(passwordList);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}

//Function to toggle dark mode.
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const isDarkModeEnabled = body.classList.contains('dark-mode');
  localStorage.setItem('darkModeEnabled', isDarkModeEnabled);
}

//Function and event listener to set the color mode at page load.
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

//Function to show the settings popup. Currently not in use since they're set to always show.
function showSettings() {
  const settingsPopups = document.getElementsByClassName('settings-popup');
  for (const settingsPopup of settingsPopups) {
    settingsPopup.classList.toggle('show');
  }
}

//Function to show the preset and prefill options.
function showPresetOptions() {
  const presetsPopups = document.getElementsByClassName('presets-popup');
  for (const presetsPopup of presetsPopups) {
    presetsPopup.classList.toggle('show');
  }
  const customPresetsPopup = document.getElementById('custom-presets-popup');
  customPresetsPopup.classList.remove('show');
}

//Function to create and show the various presets.
let presetButtonsExist = false;
function showPresetButtons() {
  const presetsPopup = document.getElementById('presets-popup');

  if (prefillButtonsExist) {
    const prefills = document.getElementById('prefills');
    presetsPopup.removeChild(prefills);
    prefillButtonsExist = false;
  }

  const presetsExist = document.getElementById('presets');

  if (presetsExist === null) {
    const presets = document.createElement('div');
    presets.id = "presets";
    presets.classList.add('presets','selection-buttons');
    presets.innerHTML = `
          <button id="cutomPresets" onclick="showCustomPresets()">Custom Presets</button>
          <button id="presetOne" onclick="applyPreset(1)" title="Example: ABCDEFGHIJ">Letters Uppercase</button>
          <button id="presetTwo" onclick="applyPreset(2)" title="Example: abcdefghij">Letters Lowercase</button>
          <button id="presetThree" onclick="applyPreset(3)" title="Example: AbcDeFGHIj">All Letters</button>
          <button id="presetFour" onclick="applyPreset(4)" title="Example: 0123456789">Numbers</button>
          <button id="presetFive" onclick="applyPreset(5)" title="Example: aBCde12345">Letters + Numbers</button>
          <button id="presetSix" onclick="applyPreset(6)" title="Example: AbcD1234!@">Letters + Numbers + Specials</button>
          `;
    presetsPopup.appendChild(presets);
    presetButtonsExist = true;
  }
  else {
    presetsPopup.removeChild(presetsExist);
    presetButtonsExist = false;
  }
}

//Function to create and show the various prefills.
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
          <button id="prefillOne" onclick="copyPrefill(1)" title="Click to copy">abcde...</button>
          <button id="prefillTwo" onclick="copyPrefill(2)" title="Click to copy">ABCDE...</button>
          <button id="prefillThree" onclick="copyPrefill(3)" title="Click to copy">abcde...&#013;ABCDE...</button>
          <button id="prefillFour" onclick="copyPrefill(4)" title="Click to copy">0123456789</button>
          <button id="prefillFive" onclick="copyPrefill(5)" title="Click to copy">!@#$%^&*()</button>
          <button id="prefillSix" onclick="copyPrefill(6)" title="Click to copy">!@#$%^&*()_-+={}[]:;"'<>,.?/|\\</button>
          `;
    presetsPopup.appendChild(prefills);
    prefillButtonsExist = true;
  }
  else {
    presetsPopup.removeChild(prefillsExist);
    prefillButtonsExist = false;
  }
}

//Function to apply a preset.
function applyPreset(presetNumber) {
  const settingsPopup = document.getElementById('settings-popup');
  let currentPoolCount = settingsPopup.querySelectorAll('.pool-row').length;
  while (currentPoolCount > 3) {
    removeCharacterPool();
    currentPoolCount--;
  }
  const poolOne = document.getElementById('pool1');
  const poolTwo = document.getElementById('pool2');
  const poolThree = document.getElementById('pool3');
  const numOne = document.getElementById('num1');
  const numTwo = document.getElementById('num2');
  const numThree = document.getElementById('num3');
  switch (presetNumber) {
    case 1:
      {
        poolOne.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        poolTwo.value = "";
        poolThree.value = "";
        numOne.value = "10";
        numTwo.value = "0";
        numThree.value = "0";
        break;
      }
    case 2:
      {
        poolOne.value = "abcdefghijklmnopqrstuvwxyz";
        poolTwo.value = "";
        poolThree.value = "";
        numOne.value = "10";
        numTwo.value = "0";
        numThree.value = "0";
        break;
      }
    case 3:
      {
        poolOne.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        poolTwo.value = "";
        poolThree.value = "";
        numOne.value = "10";
        numTwo.value = "0";
        numThree.value = "0";
        break;
      }
    case 4:
      {
        poolOne.value = "0123456789";
        poolTwo.value = "";
        poolThree.value = "";
        numOne.value = "10";
        numTwo.value = "0";
        numThree.value = "0";
        break;
      }
    case 5:
      {
        poolOne.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        poolTwo.value = "0123456789";
        poolThree.value = "";
        numOne.value = "5";
        numTwo.value = "5";
        numThree.value = "0";
        break;
      }
    case 6:
      {
        poolOne.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        poolTwo.value = "0123456789";
        poolThree.value = "!@#$%^&*()";
        numOne.value = "4";
        numTwo.value = "4";
        numThree.value = "2";
        break;
      }
  }
}

//Function to show custom presets.
function showCustomPresets() {
  const customPresetsPopups = document.getElementsByClassName('custom-presets-popup');
  for (const customPresetsPopup of customPresetsPopups) {
    customPresetsPopup.classList.toggle('show');
  }
}

let customPresets = {};
window.addEventListener('load', loadSavedPresets);

//Function to load custom presets made in previous sessions.
function loadSavedPresets() {
  if (localStorage.getItem('savedPresets') === null) {
    console.log("There are no custom presets in local storage.")
  }
  else {
    customPresets = JSON.parse(localStorage.getItem('savedPresets'));

    const customPresetCount = Object.keys(customPresets).length;
    const customPresetsButtons = document.getElementById('customPresetsButtons');

    for (let i = 1; i <= customPresetCount; i++) {
      const newPreset = document.createElement('button');
      newPreset.id = `customPreset${i}`;
      newPreset.classList.add('custom-presets');
      newPreset.onclick = (function(count) {
        return function() {
          applyCustomPreset(count);
        };
      })(i);
      newPreset.innerHTML = customPresets[`preset${i}`]['name'];
      customPresetsButtons.appendChild(newPreset);
    }
  }
}

//Function to create the name form.
function createNameForm() {
  const formExists = document.querySelectorAll('.name-form').length;
  if (formExists < 1) {
    const container = document.getElementById('createPresetContainer');

    const nameForm = document.createElement('div');
    nameForm.innerHTML = `<input type="text" id="customPresetName" placeholder="Enter name for new preset"></input>
                          <button onclick="deleteNameForm()">Cancel</button>
                          <button onclick="createPreset()">Confirm</button>
                          `;
    nameForm.id = "nameForm";
    nameForm.classList.add('name-form');
    container.appendChild(nameForm);
  }
  else {}
}

//Function to delete the name form.
function deleteNameForm() {
  const container = document.getElementById('createPresetContainer');
  const nameForm = document.getElementById('nameForm');
  container.removeChild(nameForm);
}

//Function to create a preset.
function createPreset() {
  const settingsPopup = document.getElementById('settings-popup');
  const poolCount = settingsPopup.querySelectorAll('.pool-row').length + 1;
  const customPresetsPopup = document.getElementById('custom-presets-popup');
  const customPresetsButtons = document.getElementById('customPresetsButtons');
  const newPresetName = document.getElementById('customPresetName').value;
  deleteNameForm();

  let customPresetsCount = customPresetsPopup.querySelectorAll('.custom-presets').length + 1;
  customPresets[`preset${customPresetsCount}`] = {};

  for ( let i = 1; i < poolCount; i++ ) {
    customPresets[`preset${customPresetsCount}`][`pool${i}`] = "";
    customPresets[`preset${customPresetsCount}`][`num${i}`] = "";
    customPresets[`preset${customPresetsCount}`][`pool${i}`] = document.getElementById(`pool${i}`).value;
    customPresets[`preset${customPresetsCount}`][`num${i}`] = document.getElementById(`num${i}`).value;
    customPresets[`preset${customPresetsCount}`]['name'] = newPresetName;
  }

  const newPreset = document.createElement('button');
  newPreset.id = `customPreset${customPresetsCount}`;
  newPreset.classList.add('custom-presets');
  newPreset.onclick = (function(count) {
    return function() {
      applyCustomPreset(count);
    };
  })(customPresetsCount);
  newPreset.innerHTML = newPresetName;
  customPresetsButtons.appendChild(newPreset);

  let savedPresets = JSON.stringify(customPresets);
  localStorage.setItem('savedPresets', savedPresets);
}

//Function to apply a custom preset.
function applyCustomPreset(customPresetNumber) {
  const customPoolCount = Object.keys(customPresets[`preset${customPresetNumber}`]).length / 2;
  const settingsPopup = document.getElementById('settings-popup');
  let currentPoolCount = settingsPopup.querySelectorAll('.pool-row').length;

  while (currentPoolCount < customPoolCount) {
    addCharacterPool();
    currentPoolCount++;
  }
  while (currentPoolCount > customPoolCount) {
    removeCharacterPool();
    currentPoolCount--;
  }

  for ( let i = 1; i <= customPoolCount; i++ ) {
    document.getElementById(`pool${i}`).value = customPresets[`preset${customPresetNumber}`][`pool${i}`];
    document.getElementById(`num${i}`).value = customPresets[`preset${customPresetNumber}`][`num${i}`];
  }
}

//Function to copy a prefill to the clipboard.
function copyPrefill(prefillNumber) {
  switch (prefillNumber) {
    case 1:
      navigator.clipboard.writeText('abcdefghijklmnopqrstuvwxyz');
      break;
    case 2:
      navigator.clipboard.writeText('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
      break;
    case 3:
      navigator.clipboard.writeText('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      break;
    case 4:
      navigator.clipboard.writeText('0123456789');
      break;
    case 5:
      navigator.clipboard.writeText('!@#$%^&*()');
      break;
    case 6:
      navigator.clipboard.writeText('!@#$%^&*()_-+={}[]:;"\'<>,.?/|\\');
      break;
  }
}

//Function and event listener for the enter key to click the generate button.
const enterButton = document.getElementById('generateButton');
function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
        enterButton.click();
    }
}
document.addEventListener('keydown', handleEnterKeyPress);