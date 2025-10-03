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
let stickeringSelection = 0;
let crossColorSelection = "white";
let frontColorSelection = "red";
let timerEnabled = false;
let recapEnabled = false;

let firstVisit = true;
let firstVisitTrain = true;

// Character set for Base62 encoding
const BASE62_CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE = 62;

// Local storage keys and suffixes
const STORAGE_KEYS = {
  TRAIN_STATE_SELECTION: "trainStateSelection",
  TRAIN_GROUP_SELECTION: "trainGroupSelection",
  VIEW_SELECTION: "viewSelection",
  LEFT_SELECTION: "leftSelection",
  RIGHT_SELECTION: "rightSelection",
  AUF_SELECTION: "aufSelection",
  CONSIDER_AUF_IN_ALG: "considerAUFinAlg",
  HINT_IMAGE_SELECTION: "hintImageSelection",
  HINT_ALG_SELECTION: "hintAlgSelection",
  STICKERING_SELECTION: "stickeringSelection",
  CROSS_COLOR_SELECTION: "crossColorSelection",
  FRONT_COLOR_SELECTION: "frontColorSelection",
  TIMER_ENABLED: "timerEnabled",
  RECAP_ENABLED: "recapEnabled",
  FIRST_VISIT: "firstVisit",
  FIRST_VISIT_TRAIN: "firstVisitTrain",
};

const STORAGE_SUFFIXES = {
  COLLAPSE: "collapse",
  CASE_SELECTION: "caseSelection",
  CUSTOM_ALGORITHMS_RIGHT: "customAlgorithms",
  CUSTOM_ALGORITHMS_LEFT: "customAlgorithmsLeft",
  IDENTICAL_ALGORITHM: "identicalAlgorithm",
  ALGORITHM_SELECTION_RIGHT: "algorithmSelection",
  ALGORITHM_SELECTION_LEFT: "algorithmSelectionLeft",
  SOLVE_COUNTER: "solveCounter",
};

const STORAGE_KEY_PREFIXES = {
  TRAIN_STATE_SELECTION: "trainStateSelection",
  TRAIN_GROUP_SELECTION: "trainGroupSelection",
};

//#endregion

/**
 * Saves all user data to localStorage.
 * This function is called when the user wants to save his data.
 */
function saveUserData() {
  console.log("Saving User Data");

  localStorage.setItem(
    STORAGE_KEYS.TRAIN_STATE_SELECTION,
    JSON.stringify(trainStateSelection)
  );
  localStorage.setItem(
    STORAGE_KEYS.TRAIN_GROUP_SELECTION,
    JSON.stringify(trainGroupSelection)
  );

  // Saving viewSelection (Basic, Basic Back, Advanced, Expert)
  localStorage.setItem(STORAGE_KEYS.VIEW_SELECTION, viewSelection);

  // Saving left right train selection
  localStorage.setItem(STORAGE_KEYS.LEFT_SELECTION, leftSelection);
  localStorage.setItem(STORAGE_KEYS.RIGHT_SELECTION, rightSelection);

  // Saving other settings
  localStorage.setItem(STORAGE_KEYS.AUF_SELECTION, aufSelection);
  localStorage.setItem(
    STORAGE_KEYS.CONSIDER_AUF_IN_ALG,
    considerAUFinAlg
  );
  localStorage.setItem(
    STORAGE_KEYS.HINT_IMAGE_SELECTION,
    hintImageSelection
  );
  localStorage.setItem(STORAGE_KEYS.HINT_ALG_SELECTION, hintAlgSelection);
  localStorage.setItem(
    STORAGE_KEYS.STICKERING_SELECTION,
    stickeringSelection
  );
  localStorage.setItem(
    STORAGE_KEYS.CROSS_COLOR_SELECTION,
    crossColorSelection
  );
  localStorage.setItem(
    STORAGE_KEYS.FRONT_COLOR_SELECTION,
    frontColorSelection
  );
  localStorage.setItem(STORAGE_KEYS.TIMER_ENABLED, timerEnabled);
  localStorage.setItem(STORAGE_KEYS.RECAP_ENABLED, recapEnabled);

  // Saving that the user just visited the site
  localStorage.setItem(STORAGE_KEYS.FIRST_VISIT, false);

  forEachGroup((GROUP) => {
    // Save Collapse
    localStorage.setItem(
      GROUP.saveName + STORAGE_SUFFIXES.COLLAPSE,
      JSON.stringify(GROUP.collapse)
    );
    // Save Case Selection
    localStorage.setItem(
      GROUP.saveName + STORAGE_SUFFIXES.CASE_SELECTION,
      JSON.stringify(GROUP.caseSelection)
    );
    // Save Custom Algorithms Right
    localStorage.setItem(
      GROUP.saveName + STORAGE_SUFFIXES.CUSTOM_ALGORITHMS_RIGHT,
      JSON.stringify(GROUP.customAlgorithmsRight)
    );
    // Save Custom Algorithms Left
    localStorage.setItem(
      GROUP.saveName + STORAGE_SUFFIXES.CUSTOM_ALGORITHMS_LEFT,
      JSON.stringify(GROUP.customAlgorithmsLeft)
    );
    // Identical Algorithm for Left & Right
    localStorage.setItem(
      GROUP.saveName + STORAGE_SUFFIXES.IDENTICAL_ALGORITHM,
      JSON.stringify(GROUP.identicalAlgorithm)
    );
    // Save Algorithm Selection Right
    localStorage.setItem(
      GROUP.saveName + STORAGE_SUFFIXES.ALGORITHM_SELECTION_RIGHT,
      JSON.stringify(GROUP.algorithmSelectionRight)
    );
    // Save Algorithm Selection Left
    localStorage.setItem(
      GROUP.saveName + STORAGE_SUFFIXES.ALGORITHM_SELECTION_LEFT,
      JSON.stringify(GROUP.algorithmSelectionLeft)
    );
    // Save Solve Counter
    localStorage.setItem(
      GROUP.saveName + STORAGE_SUFFIXES.SOLVE_COUNTER,
      JSON.stringify(GROUP.solveCounter)
    );
  });
}

/**
 * Loads all user data from local storage
 */
function loadUserData() {
  console.log("Loading User Data");
  let temp;

  // Do migraiton of case numbers if needed
  migrateCaseNumbers();

  // Load viewSelection
  temp = localStorage.getItem(STORAGE_KEYS.VIEW_SELECTION);
  if (temp != null) viewSelection = parseInt(temp);

  // Check if user visits site for the first time
  if (localStorage.getItem(STORAGE_KEYS.FIRST_VISIT) != null)
    firstVisit = false;
  // Check if user visits train view for the first time
  if (localStorage.getItem(STORAGE_KEYS.FIRST_VISIT_TRAIN) != null)
    firstVisitTrain = false;

  // Load trainStateSelection
  // Switch from old storage solution
  if (localStorage.getItem(STORAGE_KEYS.TRAIN_STATE_SELECTION) == null) {
    for (let i = 0; i < trainStateSelection.length; i++) {
      trainStateSelection[i] = loadBoolean(
        STORAGE_KEY_PREFIXES.TRAIN_STATE_SELECTION + i,
        trainStateSelection[i]
      );
    }
  } else {
    trainStateSelection = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.TRAIN_STATE_SELECTION)
    ); // Keep only this
  }

  // Load trainGroupSelection
  // Switch from old storage solution
  if (localStorage.getItem(STORAGE_KEYS.TRAIN_GROUP_SELECTION) == null) {
    for (let i = 0; i < trainGroupSelection.length; i++) {
      trainGroupSelection[i] = loadBoolean(
        STORAGE_KEY_PREFIXES.TRAIN_GROUP_SELECTION + i,
        trainGroupSelection[i]
      );
    }
  } else {
    trainGroupSelection = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.TRAIN_GROUP_SELECTION)
    ); // Keep only this
  }

  // Packing inside own function would not shrink the code here, since default value is defined above
  temp = localStorage.getItem(STORAGE_KEYS.HINT_IMAGE_SELECTION);
  if (temp != null) hintImageSelection = parseInt(temp);

  // Packing inside own function would not shrink the code here, since default value is defined above
  temp = localStorage.getItem(STORAGE_KEYS.HINT_ALG_SELECTION);
  if (temp != null) hintAlgSelection = parseInt(temp);

  temp = localStorage.getItem(STORAGE_KEYS.STICKERING_SELECTION);
  if (temp != null) stickeringSelection = parseInt(temp);

  temp = localStorage.getItem(STORAGE_KEYS.CROSS_COLOR_SELECTION);
  if (temp != null) crossColorSelection = temp;

  temp = localStorage.getItem(STORAGE_KEYS.FRONT_COLOR_SELECTION);
  if (temp != null) frontColorSelection = temp;

  // Load other settings
  leftSelection = loadBoolean(STORAGE_KEYS.LEFT_SELECTION, leftSelection);
  rightSelection = loadBoolean(STORAGE_KEYS.RIGHT_SELECTION, rightSelection);
  aufSelection = loadBoolean(STORAGE_KEYS.AUF_SELECTION, aufSelection);
  considerAUFinAlg = loadBoolean(
    STORAGE_KEYS.CONSIDER_AUF_IN_ALG,
    considerAUFinAlg
  );
  timerEnabled = loadBoolean(STORAGE_KEYS.TIMER_ENABLED, timerEnabled);
  recapEnabled = loadBoolean(STORAGE_KEYS.RECAP_ENABLED, recapEnabled);

  forEachGroup((GROUP) => {
    // Load collapse state
    GROUP.collapse = loadList(GROUP, STORAGE_SUFFIXES.COLLAPSE, false);
    // Load Case Selection
    GROUP.caseSelection = loadList(
      GROUP,
      STORAGE_SUFFIXES.CASE_SELECTION,
      0
    );

    // Load Custom Algorithms Right
    GROUP.customAlgorithmsRight = loadList(
      GROUP,
      STORAGE_SUFFIXES.CUSTOM_ALGORITHMS_RIGHT,
      ""
    );

    // Load Custom Algorithms Left
    GROUP.customAlgorithmsLeft = loadList(
      GROUP,
      STORAGE_SUFFIXES.CUSTOM_ALGORITHMS_LEFT,
      ""
    );

    // Load Custom Algorithms Left
    GROUP.identicalAlgorithm = loadList(
      GROUP,
      STORAGE_SUFFIXES.IDENTICAL_ALGORITHM,
      true
    );

    // Load Algorithm Selection Right
    GROUP.algorithmSelectionRight = loadList(
      GROUP,
      STORAGE_SUFFIXES.ALGORITHM_SELECTION_RIGHT,
      0
    );

    // Load Algorithm Selection Left
    GROUP.algorithmSelectionLeft = loadList(
      GROUP,
      STORAGE_SUFFIXES.ALGORITHM_SELECTION_LEFT,
      0
    );

    // Load Solve Counter
    GROUP.solveCounter = loadList(
      GROUP,
      STORAGE_SUFFIXES.SOLVE_COUNTER,
      0
    );
  });

  // Set learning state of some cases on first visit, so that the user can see the options
  if (firstVisit) {
    const BASIC_GROUP = getGroupByIndex(0);
    BASIC_GROUP.setCaseState(0, 1);
    BASIC_GROUP.setCaseState(1, 1);
    BASIC_GROUP.setCaseState(2, 2);
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
function loadList(group, saveName, defaultValue, sliceEnd = true) {
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
  if (sliceEnd) {
    // Only slice end if requested
    out = out.slice(0, group.numberCases);

    if (out.length < group.numberCases) {
      const missingEntries = group.numberCases - out.length;
      out = out.concat(Array(missingEntries).fill(defaultValue));
    }
  }
  return out;
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
  localStorage.setItem(STORAGE_KEYS.FIRST_VISIT_TRAIN, false);
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
  forEachGroup((group, i) => {
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
    forEachGroup((group, i) => {
      const saveName = group.saveNameCasesURL;
      const base62String = urlParams.get(group.saveNameCasesURL);
      if (base62String === null) return;
      let base3Number = decodeBase62ToBase3(base62String);

      // Fill list with 0s until it has the correct length
      // Reason: Leading zeroes were discarded when converted to number
      while (base3Number.length < group.numberCases) base3Number = "0" + base3Number;

      let caseSelectionList = base3Number.split("");

      localStorage.setItem(
        group.saveName + STORAGE_SUFFIXES.CASE_SELECTION,
        JSON.stringify(caseSelectionList)
      );
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

/**
 * Migrate case numbers if needed
 *
 * Basic group has 42 length array stored
 * BasicBack group has 42 length array stored
 */
function migrateCaseNumbers() {
  const EXPECTED_ARRAY_LENGTH = 42;

  // We could probably just use index 0,1 since they most likely will not change, but just to be sure use idName
  let groupBasic = GROUPS.get("Basic");
  let groupBasicBack = GROUPS.get("BasicBack");

  // Load solveCounter for each group and check length
  [groupBasic, groupBasicBack].forEach((g) => {
    // We need to NOT slice the end because we need to check the actual length
    // Migrate if list length is expected length -> list has old numbering
    // Does not need to be "solveCounter" specifically. Just needs to be a list
    let groupSolveCounter = loadList(
      g,
      STORAGE_SUFFIXES.SOLVE_COUNTER,
      0,
      false
    );
    if (groupSolveCounter.length === EXPECTED_ARRAY_LENGTH) {
      migrateCaseNumberGroup(g);
    }
  });
}

/**
 * Migrate group
 */
function migrateCaseNumberGroup(g) {
  const EXPECTED_ARRAY_LENGTH = 42;
  const START_MIGRATE_INDEX = 36;

  console.log("Doing migration of group: " + g.name);

  let lists = [];
  // Pass sliceEnd = false to ensure we get the actual length
  lists.push({
    key: STORAGE_SUFFIXES.COLLAPSE,
    value: loadList(g, STORAGE_SUFFIXES.COLLAPSE, false, false),
  });
  lists.push({
    key: STORAGE_SUFFIXES.CASE_SELECTION,
    value: loadList(g, STORAGE_SUFFIXES.CASE_SELECTION, 0, false),
  });
  lists.push({
    key: STORAGE_SUFFIXES.CUSTOM_ALGORITHMS_RIGHT,
    value: loadList(g, STORAGE_SUFFIXES.CUSTOM_ALGORITHMS_RIGHT, "", false),
  });
  lists.push({
    key: STORAGE_SUFFIXES.CUSTOM_ALGORITHMS_LEFT,
    value: loadList(g, STORAGE_SUFFIXES.CUSTOM_ALGORITHMS_LEFT, "", false),
  });
  lists.push({
    key: STORAGE_SUFFIXES.IDENTICAL_ALGORITHM,
    value: loadList(g, STORAGE_SUFFIXES.IDENTICAL_ALGORITHM, true, false),
  });
  lists.push({
    key: STORAGE_SUFFIXES.ALGORITHM_SELECTION_RIGHT,
    value: loadList(g, STORAGE_SUFFIXES.ALGORITHM_SELECTION_RIGHT, 0, false),
  });
  lists.push({
    key: STORAGE_SUFFIXES.ALGORITHM_SELECTION_LEFT,
    value: loadList(g, STORAGE_SUFFIXES.ALGORITHM_SELECTION_LEFT, 0, false),
  });
  lists.push({
    key: STORAGE_SUFFIXES.SOLVE_COUNTER,
    value: loadList(g, STORAGE_SUFFIXES.SOLVE_COUNTER, 0, false),
  });

  lists.forEach((kvp) => {
    let name = kvp.key;
    let list = kvp.value;

    // Skip if length doesn't match
    if (list.length !== EXPECTED_ARRAY_LENGTH) return;

    // Move each element 1 down
    for (let i = START_MIGRATE_INDEX; i < EXPECTED_ARRAY_LENGTH - 1; i++) {
      list[i] = list[i + 1];
    }
    // Remove last element
    list.pop();

    // Save
    localStorage.setItem(g.saveName + name, JSON.stringify(list));
  });
}
