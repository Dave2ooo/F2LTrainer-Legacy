// Source https://github.com/Dave2ooo/F2LTrainer

//#region Variables
// Basic
let basicTrash = [];
let basicCaseSelection = [];
let basicAlgorithmSelectionRight = [];
let basicAlgorithmSelectionLeft = [];
let basicIdenticalAlgorithm = [];
let basicCustomAlgorithmsRight = [];
let basicCustomAlgorithmsLeft = [];
let basicCollapse = [];
let basicSolveCounter = [];

// Basic Back
let basicBackTrash = [];
let basicBackCaseSelection = [];
let basicBackAlgorithmSelectionRight = [];
let basicBackAlgorithmSelectionLeft = [];
let basicBackIdenticalAlgorithm = [];
let basicBackCustomAlgorithmsRight = [];
let basicBackCustomAlgorithmsLeft = [];
let basicBackCollapse = [];
let basicBackSolveCounter = [];

// Advanced
let advancedTrash = [];
let advancedCaseSelection = [];
let advancedAlgorithmSelectionRight = [];
let advancedAlgorithmSelectionLeft = [];
let advancedIdenticalAlgorithm = [];
let advandedCustomAlgorithmsRight = [];
let advandedCustomAlgorithmsLeft = [];
let advancedCollapse = [];
let advancedSolveCounter = [];

// Expert
let expertTrash = [];
let expertCaseSelection = [];
let expertAlgorithmSelectionRight = [];
let expertAlgorithmSelectionLeft = [];
let expertIdenticalAlgorithm = [];
let expertCustomAlgorithmsRight = [];
let expertCustomAlgorithmsLeft = [];
let expertCollapse = [];
let expertSolveCounter = [];

// View selection
let viewSelection = 0;

// 0 -> unlearned
// 1 -> learning
// 2 -> finished
let trainStateSelection = [false, true, false];

// 0 -> basic
// 1 -> basic back
// 2 -> advanced
// 3 -> expert
let trainGroupSelection = [true, true, true, true];

let leftSelection = true;
let rightSelection = true;
let aufSelection = true;
let considerAUFinAlg = true;
let hintImageSelection = 2;
let hintAlgSelection = 0;
let stickeringSelection = 0
// let crossColorSelection = 0;
let timerEnabled = false;

let firstVisit = true;
let firstVisitTrain = true;

// Character set for Base62 encoding
const BASE62_CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE = 62;

//#endregion

/**
 * Saves all user data to localStorage.
 * This function is called when the user wants to save his data.
 */
function saveUserData() {
  console.log("Saving User Data");

  localStorage.setItem("trainStateSelection", JSON.stringify(trainStateSelection));
  localStorage.setItem("trainGroupSelection", JSON.stringify(trainGroupSelection));

  // Saving viewSelection (Basic, Basic Back, Advanced, Expert)
  localStorage.setItem("viewSelection", viewSelection);

  // Saving left right train selection
  localStorage.setItem("leftSelection", leftSelection);
  localStorage.setItem("rightSelection", rightSelection);

  // Saving other settings
  localStorage.setItem("aufSelection", aufSelection);
  localStorage.setItem("considerAUFinAlg", considerAUFinAlg);
  localStorage.setItem("hintImageSelection", hintImageSelection);
  localStorage.setItem("hintAlgSelection", hintAlgSelection);
  localStorage.setItem("stickeringSelection", stickeringSelection);
  // localStorage.setItem("crossColorSelection", crossColorSelection);
  localStorage.setItem("timerEnabled", timerEnabled);

  // Saving that the user just visited the site
  localStorage.setItem("firstVisit", false);

  for (const GROUP of GROUPS) {
    // Save Collapse
    localStorage.setItem(GROUP.saveName + "collapse", JSON.stringify(GROUP.collapse));
    // Save Case Selection
    localStorage.setItem(GROUP.saveName + "caseSelection", JSON.stringify(GROUP.caseSelection));
    // Save Custom Algorithms Right
    localStorage.setItem(GROUP.saveName + "customAlgorithms", JSON.stringify(GROUP.customAlgorithmsRight));
    // Save Custom Algorithms Left
    localStorage.setItem(GROUP.saveName + "customAlgorithmsLeft", JSON.stringify(GROUP.customAlgorithmsLeft));
    // Identical Algorithm for Left & Right
    localStorage.setItem(GROUP.saveName + "identicalAlgorithm", JSON.stringify(GROUP.identicalAlgorithm));
    // Save Algorithm Selection Right
    localStorage.setItem(GROUP.saveName + "algorithmSelection", JSON.stringify(GROUP.algorithmSelectionRight));
    // Save Algorithm Selection Left
    localStorage.setItem(GROUP.saveName + "algorithmSelectionLeft", JSON.stringify(GROUP.algorithmSelectionLeft));
    // Save Solve Counter
    localStorage.setItem(GROUP.saveName + "solveCounter", JSON.stringify(GROUP.solveCounter));
  }
}

/**
 * Loads all user data from local storage
 */
function loadUserData() {
  console.log("Loading User Data");
  let temp;

  // Load viewSelection
  temp = localStorage.getItem("viewSelection");
  if (temp != null) viewSelection = parseInt(temp);

  // Check if user visits site for the first time
  if (localStorage.getItem("firstVisit") != null) firstVisit = false;
  // Check if user visits train view for the first time
  if (localStorage.getItem("firstVisitTrain") != null) firstVisitTrain = false;

  // Load trainStateSelection
  // Switch from old storage solution
  if (localStorage.getItem("trainStateSelection") == null) {
    for (let i = 0; i < trainStateSelection.length; i++) {
      trainStateSelection[i] = loadBoolean("trainStateSelection" + i, trainStateSelection[i]);
    }
  } else {
    trainStateSelection = JSON.parse(localStorage.getItem("trainStateSelection")); // Keep only this
  }

  // Load trainGroupSelection
  // Switch from old storage solution
  if (localStorage.getItem("trainGroupSelection") == null) {
    for (let i = 0; i < trainGroupSelection.length; i++) {
      trainGroupSelection[i] = loadBoolean("trainGroupSelection" + i, trainGroupSelection[i]);
    }
  } else {
    trainGroupSelection = JSON.parse(localStorage.getItem("trainGroupSelection")); // Keep only this
  }

  // Packing inside own function would not shrink the code here, since default value is defined above
  temp = localStorage.getItem("hintImageSelection");
  if (temp != null) hintImageSelection = parseInt(temp);

  // Packing inside own function would not shrink the code here, since default value is defined above
  temp = localStorage.getItem("hintAlgSelection");
  if (temp != null) hintAlgSelection = parseInt(temp);

  temp = localStorage.getItem("stickeringSelection");
  if (temp != null) stickeringSelection = parseInt(temp);

  // temp = localStorage.getItem("crossColorSelection");
  // if (temp != null) crossColorSelection = parseInt(temp);

  // Load other settings
  leftSelection = loadBoolean("leftSelection", leftSelection);
  rightSelection = loadBoolean("rightSelection", rightSelection);
  aufSelection = loadBoolean("aufSelection", aufSelection);
  considerAUFinAlg = loadBoolean("considerAUFinAlg", considerAUFinAlg);
  timerEnabled = loadBoolean("timerEnabled", timerEnabled);

  for (const GROUP of GROUPS) {
    // Load collapse state
    GROUP.collapse = loadList(GROUP, "collapse", false);
    // Load Case Selection
    GROUP.caseSelection = loadList(GROUP, "caseSelection", 0);

    // Load Custom Algorithms Right
    GROUP.customAlgorithmsRight = loadList(GROUP, "customAlgorithms", "");

    // Load Custom Algorithms Left
    GROUP.customAlgorithmsLeft = loadList(GROUP, "customAlgorithmsLeft", "");

    // Load Custom Algorithms Left
    GROUP.identicalAlgorithm = loadList(GROUP, "identicalAlgorithm", true);

    // Load Algorithm Selection Right
    GROUP.algorithmSelectionRight = loadList(GROUP, "algorithmSelection", 0);

    // Load Algorithm Selection Left
    GROUP.algorithmSelectionLeft = loadList(GROUP, "algorithmSelectionLeft", 0);

    // Load Solve Counter
    GROUP.solveCounter = loadList(GROUP, "solveCounter", 0);
  }

  // Set learning state of some cases on first visit, so that the user can see the options
  if (firstVisit) {
    GROUPS[0].caseSelection[0] = 1;
    GROUPS[0].caseSelection[1] = 1;
    GROUPS[0].caseSelection[2] = 2;
  }

  updateCheckboxStatus();
  // updateHintVisibility();
}

/**
 * Loads a boolean value from local storage.
 * If the value does not exist, return the defaultValue.
 * @param {string} saveName - The name of the value to load in local storage.
 * @param {boolean} defaultValue - The default value if the value does not exist.
 * @returns {boolean} The value stored in local storage if it exists, otherwise the defaultValue.
 */
function loadBoolean(saveName, defaultValue) {
  const TEMP = localStorage.getItem(saveName);
  if (TEMP != null) {
    if (TEMP == "true") {
      return true;
    } else {
      return false;
    }
  } else {
    return defaultValue;
  }
}

/**
 * Loads a list from local storage. If the list does not exist or is empty,
 * a list of the correct length is created and filled with the defaultValue.
 * The list is then sliced to the correct length to ensure it is not too
 * large because of a bug in previous versions of the save function.
 * @param {object} group - A group object containing the name of the value to
 *   load in local storage.
 * @param {string} saveName - The name of the value to load in local storage.
 * @param {*} defaultValue - The default value if the value does not exist.
 * @returns {Array} The list stored in local storage if it exists, otherwise a
 *   list of the correct length filled with the defaultValue.
 */
function loadList(group, saveName, defaultValue) {
  let out;
  let temp = localStorage.getItem(group.saveName + saveName);
  if (temp !== null) {
    try {
      temp = JSON.parse(temp);
      if (temp.length > 0) {
        out = temp;
      } else {
        out = Array(group.numberCases).fill(defaultValue);
      }
    } catch (e) {
      console.error(e);
      out = Array(group.numberCases).fill(defaultValue);
    }
  } else {
    out = Array(group.numberCases).fill(defaultValue);
  }
  // In previous versions the localstorage save had an issue where some entries
  // would be added to the end of the array. This made the lists immensly large.
  // To fix this, the list is sliced to the correct length.
  return out.slice(0, group.numberCases);
  // return out;
}

/**
 * Clears all user data stored in localStorage after user confirmation.
 * Prompts the user with a confirmation dialog to reset all saved data,
 * including learning states and selected/custom algorithms.
 * If confirmed, clears the localStorage and reloads the page.
 */
function clearUserData() {
  if (confirm("Reset all saved data? (learning states, selected/custom algorithms)")) {
    console.log("Clearing");
    localStorage.clear();
    console.log("localStorage: " + localStorage);
    location.reload();
  }
}

/**
 * Sets a flag in localStorage indicating that the user has visited the
 * train page for the first time.
 */
function setFirstVisitTrain() {
  localStorage.setItem("firstVisitTrain", false);
}

/**
 * Creates a URL that can be used to import the current case selection.
 * The URL is constructed by taking the base URL of the site and appending
 * the case selection of each group as a URL parameter.
 * The case selection is first converted to a base 3 number, then to a base 62 string.
 * The base 62 string is then appended to the URL as a parameter.
 * The URL is then set as the value of the export input field.
 */
function exportToURL() {
  // Base URL of your site
  let baseURL = window.location.origin;

  // If on localhost, use a different base URL
  if (baseURL == "http://127.0.0.1:5500") baseURL = "http://127.0.0.1:5500/F2LTrainer/index.html";

  exportURL = baseURL + "?";
  GROUPS.forEach((group, i) => {
    // Case selection
    const caseSelection = group.caseSelection;
    const caseSelectionString = caseSelection.join("");
    base62String = encodeBase3ToBase62(caseSelectionString);
    base3Number = decodeBase62ToBase3(base62String);
    exportURL += "&" + group.saveNameCasesURL + "=" + base62String;
  });
  ELEM_INPUT_EXPORT.value = exportURL;
  // importData(exportURL);
}

/**
 * Imports the case selection from the URL parameters.
 * The case selection is extracted from the URL parameters and saved to localStorage.
 * If no URL parameters are found, the function does nothing.
 * If the user confirms the import, the case selection is imported and the URL is reset.
 */
function importFromURL() {
  const urlParams = new URLSearchParams(window.location.search);

  // If no URL parameters found, return
  if (!urlParams.size) return;

  if (confirm("Import data from URL?")) {
    GROUPS.forEach((group, i) => {
      const saveName = group.saveNameCasesURL;
      const base62String = urlParams.get(group.saveNameCasesURL);
      if (base62String === null) return;
      let base3Number = decodeBase62ToBase3(base62String);

      // Fill list with 0s until it has the correct length
      // Reason: Leading zeroes were discarded when converted to number
      while (base3Number.length < group.numberCases) base3Number = "0" + base3Number;

      let caseSelectionList = base3Number.split("");

      localStorage.setItem(group.saveName + "caseSelection", JSON.stringify(caseSelectionList));
    });
  }

  // Reset URL in addressbar
  if (window.location.hostname == "127.0.0.1") {
    window.history.pushState({}, document.title, "/F2LTrainer/index.html");
  } else {
    window.history.pushState({}, document.title, "/");
  }
}

/**
 * Encodes a base-3 number as a Base62 string.
 *
 * This function takes a base-3 number (represented as a string of digits),
 * converts it to a decimal integer, and then encodes that integer as a
 * Base62 string using a predefined character set.
 *
 * @param {string} base3Number - The base-3 number to encode.
 * @returns {string} - The encoded Base62 string.
 */
function encodeBase3ToBase62(base3Number) {
  // Step 1: Convert base-3 string to decimal integer
  let decimalValue = BigInt(0);
  for (let i = 0; i < base3Number.length; i++) {
    decimalValue = decimalValue * BigInt(3) + BigInt(base3Number[i]);
  }

  // Step 2: Convert decimal to Base62 string
  let base62String = "";
  do {
    const remainder = decimalValue % BigInt(BASE);
    base62String = BASE62_CHARSET[Number(remainder)] + base62String;
    decimalValue = decimalValue / BigInt(BASE);
  } while (decimalValue > 0);

  return base62String;
}

/**
 * Decodes a Base62 string back into a base-3 number.
 * @param {string} base62String The encoded Base62 string.
 * @returns {list} The original base-3 number as a string.
 */
function decodeBase62ToBase3(base62String) {
  // Step 1: Convert Base62 string to decimal integer
  let decimalValue = BigInt(0);
  for (let i = 0; i < base62String.length; i++) {
    const char = base62String[i];
    const digit = BigInt(BASE62_CHARSET.indexOf(char));
    decimalValue = decimalValue * BigInt(BASE) + digit;
  }

  // Step 2: Convert decimal integer back to base-3 string
  let base3Number = "";
  do {
    const remainder = decimalValue % BigInt(3);
    base3Number = remainder.toString() + base3Number;
    decimalValue = decimalValue / BigInt(3);
  } while (decimalValue > 0);

  return base3Number;
}
