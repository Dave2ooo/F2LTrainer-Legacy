// Source https://github.com/Dave2ooo/F2LTrainer

"use strict";

import * as ui from "./ui.js";
import * as stringManipulation from "./string_manipulation.js";
import * as groups from "./groups.js";

//#region Variables
const ELEM_BODY = document.querySelector("body");

// Get colors from css
const COLOR_BACKGROUND = getComputedStyle(document.documentElement).getPropertyValue("--color-background");
const COLOR_TEXT = getComputedStyle(document.documentElement).getPropertyValue("--color-text");
const COLOR_TEXT_INVERTED = getComputedStyle(document.documentElement).getPropertyValue("--color-text-inverted");
const FILTER_IMG = getComputedStyle(document.documentElement).getPropertyValue("--filter-img");
const FILTER_WHITE = getComputedStyle(document.documentElement).getPropertyValue("--filter-white");
const FILTER_BLACK = getComputedStyle(document.documentElement).getPropertyValue("--filter-black");
const COLOR_IMG = getComputedStyle(document.documentElement).getPropertyValue("--color-img");
const COLOR_POPUP = getComputedStyle(document.documentElement).getPropertyValue("--color-popup");
const COLOR_BTN_HOVER = getComputedStyle(document.documentElement).getPropertyValue("--color-btn-hover");
const COLOR_OVERLAY = getComputedStyle(document.documentElement).getPropertyValue("--color-overlay");
const COLOR_UNLEARNED = getComputedStyle(document.documentElement).getPropertyValue("--color-unleaned");
const COLOR_LEARNING = getComputedStyle(document.documentElement).getPropertyValue("--color-learning");
const COLOR_FINISHED = getComputedStyle(document.documentElement).getPropertyValue("--color-finished");

const ELEM_EDITALG_CONTAINER = document.getElementById("editalg-container");
const ELEM_EDITALG_IMG = document.getElementById("editalg-img");
const ELEM_IDENTICAL_ALG = document.getElementById("checkboxIdenticalAlgId");
const ELEM_SWITCH_LEFT = document.getElementById("switch-left-id");
const ELEM_SWITCH_RIGHT = document.getElementById("switch-right-id");
const ELEM_EDITALG_LIST = document.getElementById("editalg-list");
const ELEM_EDITALG_CUSTOMALG = document.getElementById("editalg-customalg");
const ELEM_EDITALG_LISTENTRY = [];

// Global variable for editAlg function
let editAlgGlobal = {
  indexGroup: 0,
  indexCase: 0,
  selectedAlgNumberRight: 0,
  selectedAlgNumberLeft: 0,
  customAlgRight: "",
  customAlgLeft: "",
};

// Maximum number of algs per Case
const NUM_ALG = 20;
const COLORS_ALG = { transparent: "transparent", green: "#009900" };

const ELEM_WINDOW_SELECT = document.getElementById("window-select");
const ELEM_WINDOW_TRAIN = document.querySelector(".window-train");

const ELEM_GROUP_CONTAINER = Array(groups.getGroupCount());
const ELEM_SIDE_CONTAINER = document.getElementById("side-container");
const ELEM_BTN_CHANGE_MODE = document.getElementById("change-mode");
const ELEM_OVERLAY = document.getElementById("overlay");
const ELEM_WELCOME_CONATINER = document.getElementById("welcome-container");
// const ELEM_WELCOME_CONATINER_TRAIN = document.getElementById("welcome-container-train");
const ELEM_INFO_CONTAINER = document.getElementById("info-container");
const ELEM_BTN_INFO = document.getElementById("btn-info");
const ELEM_POPOVER_INFO = document.getElementById("popover-info");
const ELEM_LOADING_SCREEN = document.getElementById("loading-screen");
const ELEM_CHANGE_STATE_POPUP = document.getElementById("popup-change-state");
const ELEM_FEEDBACK_CONTAINER = document.getElementById("feedback-container");
const ELEM_DIALOGS = document.querySelectorAll("dialog");

const CATEGORY_NAMES = ["Unlearned", "Learning", "Finished", "All"];

const CATEGORY_COLORS = [COLOR_UNLEARNED, COLOR_LEARNING, COLOR_FINISHED];
const CATEGORY_TEXT_COLOR = [COLOR_TEXT, COLOR_TEXT_INVERTED, COLOR_TEXT_INVERTED];
const COLORS_BTN_EDIT = [FILTER_IMG, FILTER_BLACK, FILTER_BLACK];

const IMG_PATH_RIGHT_ARROW = "./images/arrow_collapse_right.svg";
const IMG_PATH_DOWN_ARROW = "./images/arrow_collapse_down.svg";
const IMG_PATH_CHANGE_LEARNING_STATE = "./images/change_learning_state.svg";
const IMG_PATH_CHANGE_LEARNING_STATE_HOLLOW = "./images/change_learning_state_hollow.svg";

const IMG_PATH_MIRROR = "./images/mirror1.svg";
const IMG_PATH_EDIT = "./images/edit.svg";

const ELEM_LABEL_CHOOSE_GROUP = document.querySelector(".acessibility-label");
const ELEM_CONTAINER_SELECT_GROUP = document.querySelector(".container-select-group");

const ELEM_CHECKBOX_UNLEARNED = document.getElementById("checkboxUnlearnedId");
const ELEM_CHECKBOX_LEARNING = document.getElementById("checkboxLearningId");
const ELEM_CHECKBOX_FINISHED = document.getElementById("checkboxFinishedId");

const ELEM_CHECKBOX_BASIC = document.getElementById("checkboxGroupBasicId");
const ELEM_CHECKBOX_BASIC_BACK = document.getElementById("checkboxGroupBasicBackId");
const ELEM_CHECKBOX_ADVANCED = document.getElementById("checkboxGroupAdvancedId");
const ELEM_CHECKBOX_EXPERT = document.getElementById("checkboxGroupExpertId");

const SIZE_BTN_CHANGE_LEARNING_STATE_SMALL = "1.2rem";
const SIZE_BTN_CHANGE_LEARNING_STATE_BIG = "1.7rem";

const ELEM_CHECKBOX_LEFT = document.getElementById("checkboxLeftId");
const ELEM_CHECKBOX_RIGHT = document.getElementById("checkboxRightId");

const ELEM_CHECKBOX_AUF = document.getElementById("checkboxAUFId");
const ELEM_CHECKBOX_CONSIDER_AUF = document.getElementById("checkboxConsiderAUFId");

const ELEM_SELECT_HINT_IMAGE = document.getElementById("select-hint-image");
const ELEM_SELECT_HINT_ALG = document.getElementById("select-hint-alg");
const ELEM_SELECT_STICKERING = document.getElementById("select-stickering");
const ELEM_SELECT_CROSS_COLOR = document.getElementById("select-cross-color");
const ELEM_SELECT_FRONT_COLOR = document.getElementById("select-front-color");

const ELEM_CHECKBOX_TIMER_ENABLE = document.getElementById("checkboxEnableTimerId");
const ELEM_CHECKBOX_RECAP_ENABLE = document.getElementById("checkboxEnableRecapId");

const ELEM_BUTTON_SETTINGS = document.querySelector(".btn-settings-train");
const ELEM_CONTAINER_TRAIN_SETTINGS = document.getElementById("train-settings-container");

const ELEM_SCRAMBLE = document.getElementById("scramble");
const ELEM_HINT_CONTAINER = document.getElementById("hint-container");
const ELEM_HINT_ALG = document.getElementById("hint-alg");
const ELEM_HINT_PLACEHOLDER = document.getElementById("hint-placeholder");
const ELEM_HINT_IMG = document.getElementById("hint-img");
const ELEM_DIV_HINT_IMG = document.querySelector(".div-hint-img");

const ELEM_DIV_TWISTY_PLAYER = document.querySelector(".div-twisty-player");
const ELEM_TWISTY_PLAYER = document.querySelector("twisty-player");
let twistyLoadFlag = false;
let twistyEventListenerFlag = false;
let clickCoordinatesStart = { x: 0, y: 0 };
const TWISTY_PLAYER_CAMERA = { LATITUDE: 25, LONGITUDE: 25 };
const ELEM_BTN_RESET_PLAYER_VIEW = document.querySelector(".btn-reset-player-view");

const ELEM_RADIO_UNLEARNED = document.getElementById("radio-state-unlearned");
const ELEM_RADIO_LEARNING = document.getElementById("radio-state-learning");
const ELEM_RADIO_FINISHED = document.getElementById("radio-state-finished");
let currentTrainGroup = -1;
let currentTrainCase = -1;

let hintCounter = 0;

let mode = 0; // 0: select, 1: train

// List that contains all the randomly selected cases
let trainCaseList = [];

// Dropdown box (Basic, Basic Back, Advanced, Exert)
const ELEM_SELECT_GROUP = document.getElementById("select-group-id");

let boolShowDebugInfo = true;
const ELEM_BTN_SHOW_HIDE_DEBUG_INFO = document.getElementById("btn-show-hide-debug-info");
const ELEM_DEBUG_INFO = document.getElementById("debug-info");

const ELEM_RECAP_INFO = document.getElementById("recap-info");
let recapDone = false;

const ELEM_TRAINING_ACTIVE_CASES_INFO = document.getElementById("training-active-cases-info");
const ELEM_SETTINGS_ACTIVE_CASES_INFO = document.getElementById("settings-active-cases-info");

let flagdoublepress = false;

let flagDialogOpen = false;

const STRING_MIRRORED = ["Right", "Left"];

const ELEM_LOADING_CASE = document.getElementById("loading-case");

const CLASS_DISPLAY_NONE = "display-none";

// Timer
const ELEM_TIMER = document.getElementById("timer");
let flagTimerRunning;
let second = 0;
let count = 0;
const COLOR_TIMER = {
  neutral: "#00ee00",
  ready: COLOR_TEXT,
};

let spacePressFlag = false;
const ELEM_PRESS_ME_TRAIN = document.getElementById("div-press-me-tain-id");
const ELEM_PRESS_ME_TWISTY = document.getElementById("div-press-me-twisty-id");

let divPressMe;

const ELEM_INPUT_EXPORT = document.getElementById("input-export");

let mousepositionLast = [0, 0];

const ELEM_BTN_CHANGE_ALG = document.getElementById("btn-change-alg-id");

const ELEM_FEEDBACK_NAME = document.getElementById("feedback-name-id");

const ELEM_IFRAME_VIDEO = document.getElementById("iframe-video");
//#endregion

// ----------------------------------------- LOADING -------------------------------------------------------
window.addEventListener("load", () => {
  // window.onerror = function (msg, url, linenumber) {
  //   alert("Error message: " + msg + "\nURL: " + url + "\nLine Number: " + linenumber);
  //   return true;
  // };
  importFromURL();
  loadUserData();

  showWelcomePopup();
  showWelcomePopover();

  localStorage.clear();
  saveUserData();

  // Set Group to show
  ELEM_SELECT_GROUP.selectedIndex = viewSelection;

  // Create all Entries
  addElementsToDOM();

  showPressMeText();
  // hidePressMeTrainText();

  highlightAllBulkChangeTrainingStateButtons();

  // Generate placeholder for algs to select in Edit Algorithm Pop Up
  for (let i = 0; i < NUM_ALG; i++) {
    ELEM_EDITALG_LISTENTRY.push(document.createElement("div"));
    ELEM_EDITALG_LISTENTRY[i].classList.add("editalg-listentry");

    // Called when alg is pressed in editAlg popup
    ELEM_EDITALG_LISTENTRY[i].onclick = function () {
      // Set background to transparent on all algs
      ELEM_EDITALG_LISTENTRY.forEach((element) => {
        ui.setBackgroundColor(element, COLORS_ALG.transparent);
      });
      ui.setBackgroundColor(ELEM_EDITALG_CUSTOMALG, COLORS_ALG.transparent);

      // Set background to selected on selected alg
      ui.setBackgroundColor(ELEM_EDITALG_LISTENTRY[i], COLORS_ALG.green);

      // Save selected alg globally. i is the index of selected alg
      if (ELEM_IDENTICAL_ALG.checked) {
        editAlgGlobal.selectedAlgNumberRight = i;
        editAlgGlobal.selectedAlgNumberLeft = i;
      } else {
        if (ELEM_SWITCH_RIGHT.checked) {
          editAlgGlobal.selectedAlgNumberRight = i;
        } else {
          editAlgGlobal.selectedAlgNumberLeft = i;
        }
      }
    };

    ELEM_EDITALG_LIST.appendChild(ELEM_EDITALG_LISTENTRY[i]);
  }

  // Close dialogs (popup-container) if clicked outside the dialog
  ELEM_DIALOGS.forEach((elem_dialog) => {
    elem_dialog.addEventListener("mousedown", function (event) {
      // Don't close if the click is on a select element or its options
      if (event.target.tagName === "SELECT" || event.target.tagName === "OPTION") {
        return;
      }

      var rect = elem_dialog.getBoundingClientRect();
      var isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        closeOverlays();
      }
    });
  });

  document.addEventListener("keydown", keydown);
  document.addEventListener("keyup", keyup);

  ELEM_HINT_IMG.addEventListener("load", function () {
    ui.setOpacity(ELEM_HINT_IMG, 1);
    ELEM_LOADING_CASE.classList.add(CLASS_DISPLAY_NONE);
  });

  // Run this function to only show basic cases in the beginning
  showSelectedGroup();

  ui.hideElement(ELEM_LOADING_SCREEN);

  loadTwistyAlgViewer();
  // const autoLoadTimeout = setTimeout(loadTwistyAlgViewer, 1000);

  showHideDebugInfo();
});

// function loadTwistyAlgViewer() {
//   import("https://cdn.cubing.net/v0/js/cubing/twisty")
//     .then(({ TwistyAlgViewer }) => {
//       const ELEM_HINT_CONTAINER = document.getElementById("hint-container");
//       ELEM_HINT_CONTAINER.appendChild(new TwistyAlgViewer({ twistyPlayer: ELEM_TWISTY_PLAYER }));

//       // Twisty Player loaded correctly
//       twistyLoadFlag = true;
//       console.log("Twisty Player loaded");
//     })
//     .catch((error) => {
//       // If Twisty Player cannot be loaded, default to 2D image
//       ELEM_SELECT_HINT_IMAGE.selectedIndex = 1;
//       // Disable option to select Twisty Player
//       ELEM_SELECT_HINT_IMAGE.options[2].disabled = true;
//       console.error("Failed to load TwistyAlgViewer module:", error);
//     });
// }

async function loadTwistyAlgViewer() {
  try {
    const [
      { TwistyAlgViewer }, // from cubing/twisty
      { Alg }, // from cubing/alg
    ] = await Promise.all([
      import("https://cdn.cubing.net/v0/js/cubing/twisty"),
      import("https://cdn.cubing.net/v0/js/cubing/alg"),
    ]);

    // stash Alg somewhere global if you need it later
    window.Alg = Alg;
    const ELEM_HINT_CONTAINER = document.getElementById("hint-container");
    ELEM_HINT_CONTAINER.appendChild(new TwistyAlgViewer({ twistyPlayer: ELEM_TWISTY_PLAYER }));

    // Twisty Player loaded correctly
    twistyLoadFlag = true;
    console.log("Twisty Player + Alg loaded");
  } catch (err) {
    // If Twisty Player cannot be loaded, default to 2D image
    ELEM_SELECT_HINT_IMAGE.selectedIndex = 1;
    // Disable option to select Twisty Player
    ELEM_SELECT_HINT_IMAGE.options[2].disabled = true;
    console.error("Failed to load TwistyAlgViewer module:", error);
  }
}

function addTwistyPlayerEventListeners() {
  try {
    const ELEM_TWISTY_PLAYER_BODY = ELEM_TWISTY_PLAYER.contentWrapper.firstChild;
    ELEM_TWISTY_PLAYER_BODY.addEventListener("mousedown", (event) => twistyPlayerMouseDown(event));
    ELEM_TWISTY_PLAYER_BODY.addEventListener("mouseup", (event) => twistyPlayerMouseUp(event));
    // ELEM_TWISTY_PLAYER_BODY.addEventListener("touchstart", (event) => twistyPlayerTouchStart(event));
    // ELEM_TWISTY_PLAYER_BODY.addEventListener("touchend", (event) => twistyPlayerTouchEnd(event));

    // Called when cube is rotated. Hide reset button if camera latitude is default
    ELEM_TWISTY_PLAYER.experimentalModel.twistySceneModel.orbitCoordinatesRequest.addFreshListener((v) => {
      if (v.latitude == TWISTY_PLAYER_CAMERA.LATITUDE) {
        hideResetButton();
      } else {
        showResetButton();
      }
    });
    twistyEventListenerFlag = true;
  } catch (e) {
    console.warn(e);
  }
}

function twistyPlayerMouseDown(event) {
  // Save the mousedown point.
  clickCoordinatesStart = { x: event.clientX, y: event.clientY };
}

function twistyPlayerMouseUp(event) {
  // Check if mousedown & mouseup are on the same point.
  if (isSamePoint(clickCoordinatesStart, { x: event.clientX, y: event.clientY })) {
    hidePressMeTextTwisty;
    nextScramble(1);
  }
}

// function twistyPlayerTouchStart(event) {
//   // Save the touch point.
//   const touch = event.touches[0];
//   clickCoordinatesStart = { x: touch.clientX, y: touch.clientY };
// }

// function twistyPlayerTouchEnd(event) {
//   // Check if touchstart & touchend are on the same point.
//   const touch = event.changedTouches[0];
//   if (isSamePoint(clickCoordinatesStart, { x: touch.clientX, y: touch.clientY })) {
//     // Hide Press me text
//     hidePressMeTextTwisty;
//     nextScramble(1);
//   }
// }

function isSamePoint(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
}

/**
 * Creates all necessary elements in the DOM for the case selection page.
 * Called when the page is loaded.
 */
function addElementsToDOM() {
  // Iterate over all groups (basic, basic back, advanced, expert)
  group.forEachGroup((GROUP, INDEX_GROUP, GROUP_ID) => {
    ELEM_GROUP_CONTAINER[INDEX_GROUP] = document.createElement("div");
    ELEM_GROUP_CONTAINER[INDEX_GROUP].classList.add("group-container");

    // Iterate over all categories (basic inserts, pieces on top/white facing..., ...)
    // for (let indexCategory = 0; indexCategory < GROUP.categoryCases.length; indexCategory++) {
    GROUP.categoryCases.forEach((categoryItems, indexCategory) => {
      GROUP.divCategoryContainer[indexCategory] = document.createElement("div");
      GROUP.divCategoryContainer[indexCategory].classList.add("category-container");
      GROUP.divCategoryContainer[indexCategory].id =
        "expand-contract-group" + INDEX_GROUP + "-category" + indexCategory;
      GROUP.btnCollapseContainer.push(document.createElement("button"));
      GROUP.btnCollapseContainer[indexCategory].type = "button";
      GROUP.btnCollapseContainer[indexCategory].classList.add("collapse-container");

      GROUP.imgCategoryCollapse.push(document.createElement("img"));
      GROUP.imgCategoryCollapse[indexCategory].classList.add("img-collapse-category");
      GROUP.imgCategoryCollapse[indexCategory].alt = "collapse category";
      GROUP.imgCategoryCollapse[indexCategory].onclick = function () {
        collapseCategory(GROUP_ID, indexCategory);
      };

      GROUP.imgCategoryCollapse[indexCategory].src = IMG_PATH_RIGHT_ARROW;
      if (GROUP.isCategoryCollapsed(indexCategory)) {
        GROUP.divCategoryContainer[indexCategory].classList.add("display-none");
      } else {
        GROUP.imgCategoryCollapse[indexCategory].classList.add("rotate-arrow");
      }

      GROUP.headingCategoryName.push(document.createElement("h2"));
      GROUP.headingCategoryName[indexCategory].classList.add("heading-category-name");
      GROUP.headingCategoryName[indexCategory].innerHTML = GROUP.categoryNames[indexCategory];
      GROUP.headingCategoryName[indexCategory].onclick = function () {
        collapseCategory(GROUP_ID, indexCategory);
      };

      GROUP.btnChangeLearningState[0].push(document.createElement("img"));
      GROUP.btnChangeLearningState[0][indexCategory].title = "Change state to Unlearned";
      GROUP.btnChangeLearningState[0][indexCategory].classList.add("btn-change-learing-state");
      GROUP.btnChangeLearningState[0][indexCategory].classList.add("filter-unlearned");
      GROUP.btnChangeLearningState[0][indexCategory].src = IMG_PATH_CHANGE_LEARNING_STATE_HOLLOW;
      GROUP.btnChangeLearningState[0][indexCategory].onclick = function () {
        changeLearningStateBulk(GROUP_ID, indexCategory, 0);
      };
      GROUP.btnChangeLearningState[1].push(document.createElement("img"));
      GROUP.btnChangeLearningState[1][indexCategory].title = "Change state to Learning";
      GROUP.btnChangeLearningState[1][indexCategory].classList.add("btn-change-learing-state");
      GROUP.btnChangeLearningState[1][indexCategory].classList.add("filter-learning");
      GROUP.btnChangeLearningState[1][indexCategory].src = IMG_PATH_CHANGE_LEARNING_STATE;
      GROUP.btnChangeLearningState[1][indexCategory].onclick = function () {
        changeLearningStateBulk(GROUP_ID, indexCategory, 1);
      };
      GROUP.btnChangeLearningState[2].push(document.createElement("img"));
      GROUP.btnChangeLearningState[2][indexCategory].title = "Change state to Finished";
      GROUP.btnChangeLearningState[2][indexCategory].classList.add("btn-change-learing-state");
      GROUP.btnChangeLearningState[2][indexCategory].classList.add("filter-finished");
      GROUP.btnChangeLearningState[2][indexCategory].src = IMG_PATH_CHANGE_LEARNING_STATE;
      GROUP.btnChangeLearningState[2][indexCategory].onclick = function () {
        changeLearningStateBulk(GROUP_ID, indexCategory, 2);
      };

      GROUP.btnCollapseContainer[indexCategory].appendChild(GROUP.imgCategoryCollapse[indexCategory]);
      GROUP.btnCollapseContainer[indexCategory].appendChild(GROUP.headingCategoryName[indexCategory]);
      GROUP.btnCollapseContainer[indexCategory].appendChild(GROUP.btnChangeLearningState[0][indexCategory]);
      GROUP.btnCollapseContainer[indexCategory].appendChild(GROUP.btnChangeLearningState[1][indexCategory]);
      GROUP.btnCollapseContainer[indexCategory].appendChild(GROUP.btnChangeLearningState[2][indexCategory]);
      ELEM_GROUP_CONTAINER[INDEX_GROUP].appendChild(GROUP.btnCollapseContainer[indexCategory]);

      // Iterate over every case in category
      // for (let indexCategoryItem = 0; indexCategoryItem < categoryItems.length; indexCategoryItem++) {
      // categoryItems.forEach((categoryItem) => {
      for (const categoryItem of categoryItems) {
        let indexCase = categoryItem - 1;
        // Check if selected algorithm is valid
        const algorithmPool = GROUP.getAlgorithmPool(indexCase);
        if (!algorithmPool.length) {
          console.warn("Trying to access invalid Case\nindexGroup: " + INDEX_GROUP + "\nindexCase: " + indexCase);
          continue;
        }
        // Case Selection Page
        const IMG_CASE_PATH = GROUP.imgPath + "right/F2L" + (indexCase + 1) + ".svg";

        GROUP.divContainer[indexCase] = document.createElement("div");
        GROUP.divContainer[indexCase].classList.add("case-container");

        GROUP.divCaseNumber[indexCase] = document.createElement("div");
        GROUP.divCaseNumber[indexCase].classList.add("case-number");

        GROUP.imgContainer[indexCase] = document.createElement("button");
        GROUP.imgContainer[indexCase].classList.add("img-case-container");
        // GROUP.imgContainer[indexCase].onclick = function () {
        //   changeState(INDEX_GROUP, indexCategory, indexCase);
        // };

        GROUP.imgCase[indexCase] = document.createElement("img");
        GROUP.imgCase[indexCase].classList.add("img-case");
        GROUP.imgCase[indexCase].classList.add("front");

        GROUP.divAlgorithm[indexCase] = document.createElement("div");
        GROUP.divAlgorithm[indexCase].classList.add("algorithm");

        GROUP.btnContainer[indexCase] = document.createElement("div");
        GROUP.btnContainer[indexCase].classList.add("btn-container");

        // Edit
        GROUP.btnEdit[indexCase] = document.createElement("div");
        GROUP.btnEdit[indexCase].classList.add("btn-edit");
        // GROUP.btnEdit[indexCase].title = "Edit";
        GROUP.btnEdit[indexCase].setAttribute("data-tooltip", "Edit");

        GROUP.imgEdit[indexCase] = document.createElement("img");
        GROUP.imgEdit[indexCase].classList.add("img-edit-trash");
        GROUP.imgEdit[indexCase].alt = "edit case " + (indexCase + 1);
        GROUP.imgEdit[indexCase].onclick = function () {
          editAlgs(INDEX_GROUP, indexCase, GROUP.flagMirrored[indexCase]);
        };

        // Mirror
        GROUP.btnMirror[indexCase] = document.createElement("div");
        GROUP.btnMirror[indexCase].classList.add("btn-edit");
        // GROUP.btnMirror[indexCase].title = "Mirror";
        GROUP.btnMirror[indexCase].setAttribute("data-tooltip", "Mirror");

        GROUP.imgMirror[indexCase] = document.createElement("img");
        GROUP.imgMirror[indexCase].classList.add("flip-image");
        GROUP.imgMirror[indexCase].alt = "mirror case " + (indexCase + 1);
        GROUP.imgMirror[indexCase].onclick = function () {
          mirrorCase(INDEX_GROUP, indexCase);
        };

        GROUP.divAlgButtonContainer[indexCase] = document.createElement("div");
        GROUP.divAlgButtonContainer[indexCase].classList.add("div-alg-btn-container");

        if (GROUP.caseNumberMapping && GROUP.caseNumberMapping.hasOwnProperty(indexCase + 1)) {
          GROUP.divCaseNumber[indexCase].innerHTML = GROUP.caseNumberMapping[indexCase + 1];
          GROUP.divCaseNumber[indexCase].classList.add("case-number-wide");
        } else {
          GROUP.divCaseNumber[indexCase].innerHTML = indexCase + 1;
        }

        // -------------------------------------------------------------- Case Number ---------------------------
        GROUP.imgCase[indexCase].src = IMG_CASE_PATH;
        GROUP.imgCase[indexCase].alt = GROUP.name + ", Case " + (indexCase + 1);
        GROUP.imgCase[indexCase].loading = "lazy";

        // Set shown alg
        const algSelection = GROUP.getAlgorithmSelection("right", indexCase);
        if (algSelection < algorithmPool.length) {
          GROUP.divAlgButtonContainer[indexCase].innerHTML = algorithmPool[algSelection];
        } else {
          GROUP.divAlgButtonContainer[indexCase].innerHTML = GROUP.customAlgorithmsRight[indexCase];
        }

        GROUP.imgMirror[indexCase].src = IMG_PATH_MIRROR;
        GROUP.imgEdit[indexCase].src = IMG_PATH_EDIT;

        applyCaseStateStyling(GROUP, indexCase);

        GROUP.divContainer[indexCase].appendChild(GROUP.divCaseNumber[indexCase]); // Don't show case number

        GROUP.divContainer[indexCase].appendChild(GROUP.imgContainer[indexCase]);
        GROUP.imgContainer[indexCase].appendChild(GROUP.imgCase[indexCase]);
        GROUP.divContainer[indexCase].appendChild(GROUP.divAlgorithm[indexCase]);
        GROUP.divAlgorithm[indexCase].appendChild(GROUP.divAlgButtonContainer[indexCase]);
        GROUP.divAlgorithm[indexCase].appendChild(GROUP.btnContainer[indexCase]);
        GROUP.btnContainer[indexCase].appendChild(GROUP.btnEdit[indexCase]);
        GROUP.btnContainer[indexCase].appendChild(GROUP.btnMirror[indexCase]);
        GROUP.btnEdit[indexCase].appendChild(GROUP.imgEdit[indexCase]);
        GROUP.btnMirror[indexCase].appendChild(GROUP.imgMirror[indexCase]);

        GROUP.divContainer[indexCase].addEventListener("click", (e) => {
          if (e.target !== GROUP.imgMirror[indexCase] && e.target !== GROUP.imgEdit[indexCase]) {
            changeState(INDEX_GROUP, indexCategory, indexCase);
          }
        });

        GROUP.divCategoryContainer[indexCategory].appendChild(GROUP.divContainer[indexCase]);
      }
      ELEM_GROUP_CONTAINER[INDEX_GROUP].appendChild(GROUP.divCategoryContainer[indexCategory]);
    });
    ELEM_WINDOW_SELECT.appendChild(ELEM_GROUP_CONTAINER[INDEX_GROUP]);
  });
}

function applyCaseStateStyling(group, indexCase) {
  const state = group.getCaseState(indexCase);
  if (group.divContainer[indexCase]) {
    ui.setBackgroundColor(group.divContainer[indexCase], CATEGORY_COLORS[state]);
    ui.setFontColor(group.divContainer[indexCase], CATEGORY_TEXT_COLOR[state]);
  }
  if (group.imgEdit[indexCase]) {
    ui.setFilter(group.imgEdit[indexCase], COLORS_BTN_EDIT[state]);
  }
  if (group.imgMirror[indexCase]) {
    ui.setFilter(group.imgMirror[indexCase], COLORS_BTN_EDIT[state]);
  }
}

/**
 * Updates the shown algorithm in the selection window and the trainCaseList array.
 * If in train mode, also updates the Twisty Player's algorithm and reset the progressbar.
 * Saves the user data afterwards.
 * Called when user clicks on Confirm in the Change Alg popup.
 */
function updateAlg() {
  const INDEX_GROUP = editAlgGlobal.indexGroup;
  const INDEX_CASE = editAlgGlobal.indexCase;
  const GROUP = group.getGroupByIndex(INDEX_GROUP);
  const algorithmPool = GROUP.getAlgorithmPool(INDEX_CASE);

  let tempAlgRight,
    tempAlgLeft = "";

  // Set global variable
  if (ELEM_SWITCH_RIGHT.checked) {
    editAlgGlobal.customAlgRight = ELEM_EDITALG_CUSTOMALG.value;
    if (ELEM_IDENTICAL_ALG.checked) {
      editAlgGlobal.customAlgLeft = stringManipulation.mirrorAlg(editAlgGlobal.customAlgRight);
    }
  } else {
    editAlgGlobal.customAlgLeft = ELEM_EDITALG_CUSTOMALG.value;
    if (ELEM_IDENTICAL_ALG.checked) {
      editAlgGlobal.customAlgRight = stringManipulation.mirrorAlg(editAlgGlobal.customAlgLeft);
    }
  }

  // "Save" custom algs from global variable
  GROUP.setCustomAlgorithm("right", INDEX_CASE, editAlgGlobal.customAlgRight);
  GROUP.setCustomAlgorithm("left", INDEX_CASE, editAlgGlobal.customAlgLeft);

  // "Save" alg selection from global variable
  GROUP.setAlgorithmSelection("right", INDEX_CASE, editAlgGlobal.selectedAlgNumberRight);
  GROUP.setAlgorithmSelection("left", INDEX_CASE, editAlgGlobal.selectedAlgNumberLeft);

  // "Save" identical alg
  GROUP.identicalAlgorithm[INDEX_CASE] = ELEM_IDENTICAL_ALG.checked;

  // Check if selected right alg is default or custom
  if (editAlgGlobal.selectedAlgNumberRight < algorithmPool.length) {
    tempAlgRight = algorithmPool[editAlgGlobal.selectedAlgNumberRight];
  } else {
    tempAlgRight = editAlgGlobal.customAlgRight;
  }

  if (editAlgGlobal.selectedAlgNumberLeft < algorithmPool.length) {
    tempAlgLeft = stringManipulation.mirrorAlg(algorithmPool[editAlgGlobal.selectedAlgNumberLeft]);
  } else {
    tempAlgLeft = editAlgGlobal.customAlgLeft;
  }

  // exit if algs are empty
  if (tempAlgRight == "") return;
  if (tempAlgLeft == "") return;

  // Show selected alg in select mode
  let tempAlg = tempAlgRight;
  if (GROUP.flagMirrored[INDEX_CASE] == true) tempAlg = tempAlgLeft;
  GROUP.divAlgButtonContainer[INDEX_CASE].innerHTML = tempAlg;

  // Show selected alg in train mode
  if (TrainCase.currentTrainCaseNumber >= 0 && mode == 1) {
    const CURRENT_TRAIN_CASE = trainCaseList[TrainCase.currentTrainCaseNumber];
    if (!CURRENT_TRAIN_CASE.getMirroring()) {
      CURRENT_TRAIN_CASE.setAlgHint(tempAlgRight);
      // if (considerAUFinAlg) tempAlgRight = stringManipulation.addAUFtoHint(tempAlgRight, CURRENT_TRAIN_CASE.getAUFNum());
      // ELEM_TWISTY_PLAYER.alg = tempAlgRight;
    } else {
      CURRENT_TRAIN_CASE.setAlgHint(tempAlgLeft);
      // if (considerAUFinAlg) tempAlgLeft = stringManipulation.addAUFtoHint(tempAlgLeft, CURRENT_TRAIN_CASE.getAUFNum());
      // ELEM_TWISTY_PLAYER.alg = tempAlgLeft;
    }
    ELEM_SCRAMBLE.innerHTML = trainCaseList[TrainCase.currentTrainCaseNumber].getSelectedScrambleAUF();
    const SETUP_ALG = trainCaseList[TrainCase.currentTrainCaseNumber].getSetupAlg();
    ELEM_TWISTY_PLAYER.experimentalSetupAlg = SETUP_ALG;
    ELEM_TWISTY_PLAYER.alg = CURRENT_TRAIN_CASE.getAlgHintAUF();
    ELEM_DEBUG_INFO.innerHTML = trainCaseList[TrainCase.currentTrainCaseNumber].getDebugInfo();
  }

  // Reset Twisty Player progressbar
  ELEM_TWISTY_PLAYER.timestamp = 0;

  closeOverlays();

  // Save
  saveUserData();
}

/**
 * Handles the "Edit Alg" button click event in train mode.
 * Blurs the button and retrieves the current group and case indices
 * from the generated scrambles array, then calls editAlgs to
 * initiate the algorithm editing process.
 */
function editCurrentAlg() {
  ELEM_BTN_CHANGE_ALG.blur();
  const INDEX_GROUP = trainCaseList[TrainCase.currentTrainCaseNumber].getIndexGroup();
  const INDEX_CASE = trainCaseList[TrainCase.currentTrainCaseNumber].getIndexCase();
  const MIRRORED = trainCaseList[TrainCase.currentTrainCaseNumber].getMirroring();

  editAlgs(INDEX_GROUP, INDEX_CASE, MIRRORED);
}

/**
 * Called when edit alg button is pressed
 * Displays and allows editing of algorithms for a selected case in a group.
 *
 * This function sets the image and algorithm list for the current case,
 * making the appropriate elements visible or invisible based on the number
 * of algorithms available. It also highlights the selected algorithm,
 * differentiating between default and custom algorithms, and sets the
 * custom algorithm text input to the saved value. Finally, it opens the
 * algorithm editing dialog and focuses on the image.
 *
 * @param {number} indexGroup - The index of the group containing the case.
 * @param {number} indexCase - The index of the case within the group.
 */
function editAlgs(indexGroup, indexCase, mirrored) {
  editAlgGlobal.indexGroup = indexGroup;
  editAlgGlobal.indexCase = indexCase;

  const INDEX_CASE = indexCase;
  const GROUP = group.getGroupByIndex(indexGroup);

  // Set switch to default state (right)
  ELEM_SWITCH_RIGHT.checked = true;
  ELEM_SWITCH_LEFT.checked = false;

  // Set global variables for alg selection
  editAlgGlobal.selectedAlgNumberRight = GROUP.getAlgorithmSelection("right", INDEX_CASE);
  editAlgGlobal.selectedAlgNumberLeft = GROUP.getAlgorithmSelection("left", INDEX_CASE);

  // Set image
  ELEM_EDITALG_IMG.src = GROUP.imgPath + "right/F2L" + (INDEX_CASE + 1) + ".svg";

  // Iterate through all algorithms
  const algorithmPool = GROUP.getAlgorithmPool(INDEX_CASE);
  for (let alg = 0; alg < NUM_ALG; alg++) {
    if (alg < algorithmPool.length) {
      // Set Text to Alg
      ELEM_EDITALG_LISTENTRY[alg].innerHTML = algorithmPool[alg];
      // Make all used elements visible
      ui.showElement(ELEM_EDITALG_LISTENTRY[alg]);
    } else {
      // Make all unused elements invisible
      ui.hideElement(ELEM_EDITALG_LISTENTRY[alg]);
    }
    // Reset all backgrounds
    ui.setBackgroundColor(ELEM_EDITALG_LISTENTRY[alg], COLORS_ALG.transparent);
  }

  // Check if previously saved alg is default or custom
  if (editAlgGlobal.selectedAlgNumberRight < algorithmPool.length) {
    // If alg is default set color of selected alg
    const tempAlgSelection = GROUP.getAlgorithmSelection("right", INDEX_CASE);
    ui.setBackgroundColor(ELEM_EDITALG_LISTENTRY[tempAlgSelection], COLORS_ALG.green);
    // and reset color of custom
    ui.setBackgroundColor(ELEM_EDITALG_CUSTOMALG, COLORS_ALG.transparent);
  } else {
    // If alg is custom set color
    ui.setBackgroundColor(ELEM_EDITALG_CUSTOMALG, COLORS_ALG.green);
  }

  // Set text in custom alg textbox to saved value
  ELEM_EDITALG_CUSTOMALG.value = GROUP.customAlgorithmsRight[INDEX_CASE];

  // Set global variables for custom alg left
  editAlgGlobal.customAlgLeft = GROUP.customAlgorithmsLeft[INDEX_CASE];

  // Switch to left case if wanted
  if (mirrored) {
    ELEM_SWITCH_RIGHT.checked = false;
    ELEM_SWITCH_LEFT.checked = true;
    switchLeftRightEditAlg();
  }

  // Set checkbox to saved state
  ELEM_IDENTICAL_ALG.checked = GROUP.identicalAlgorithm[INDEX_CASE];

  openDialog(ELEM_EDITALG_CONTAINER);
  ELEM_EDITALG_IMG.focus();
}

/**
 * Handles the custom algorithm text input box being clicked.
 * Resets the background of the previously selected algorithm and sets
 * the background of the custom algorithm text box to the selected color.
 * Sets the selected algorithm to the custom algorithm.
 * for the current case, indicating that the custom algorithm is selected.
 */
function customAlgSelected() {
  const INDEX_GROUP = editAlgGlobal.indexGroup;
  const INDEX_CASE = editAlgGlobal.indexCase;
  const GROUP = group.getGroupByIndex(INDEX_GROUP);
  const algorithmPool = GROUP.getAlgorithmPool(INDEX_CASE);

  // Set background to transparent on all algs
  ELEM_EDITALG_LISTENTRY.forEach((element) => {
    ui.setBackgroundColor(element, COLORS_ALG.transparent);
  });
  ui.setBackgroundColor(ELEM_EDITALG_CUSTOMALG, COLORS_ALG.transparent);

  // Set Background of custom alg to selected
  ui.setBackgroundColor(ELEM_EDITALG_CUSTOMALG, COLORS_ALG.green);

  // Save selected alg globally
  const selectedAlgTemp = algorithmPool.length;
  if (ELEM_IDENTICAL_ALG.checked) {
    editAlgGlobal.selectedAlgNumberRight = selectedAlgTemp;
    editAlgGlobal.selectedAlgNumberLeft = selectedAlgTemp;
  } else {
    if (ELEM_SWITCH_RIGHT.checked) {
      editAlgGlobal.selectedAlgNumberRight = selectedAlgTemp;
    } else {
      editAlgGlobal.selectedAlgNumberLeft = selectedAlgTemp;
    }
  }
}

/**
 * Called when the switch left/right button is pressed in the algorithm
 * editing dialog.
 * Switches the image and algorithm list between the left and right cases,
 * and also switches the custom algorithm text box to show the saved custom
 * algorithm for the chosen case. If the identical checkbox is checked,
 * the same algorithm (mirrored) is shown for both cases.
 */
function switchLeftRightEditAlg() {
  const INDEX_GROUP = editAlgGlobal.indexGroup;
  const INDEX_CASE = editAlgGlobal.indexCase;
  const GROUP = group.getGroupByIndex(INDEX_GROUP);
  const algorithmPool = GROUP.getAlgorithmPool(INDEX_CASE);

  // Set background to transparent on all algs
  ELEM_EDITALG_LISTENTRY.forEach((element) => {
    ui.setBackgroundColor(element, COLORS_ALG.transparent);
  });
  ui.setBackgroundColor(ELEM_EDITALG_CUSTOMALG, COLORS_ALG.transparent);

  let selectedAlgTemp = 0;
  if (ELEM_SWITCH_RIGHT.checked) {
    // Code for right case

    // Set right image
    ELEM_EDITALG_IMG.src = GROUP.imgPath + "right/F2L" + (INDEX_CASE + 1) + ".svg";

    // Fill textboxes with algorithms for right case
    for (let index = 0; index < algorithmPool.length; index++) {
      ELEM_EDITALG_LISTENTRY[index].innerHTML = algorithmPool[index];
    }

    // Save current left alg globally
    editAlgGlobal.customAlgLeft = ELEM_EDITALG_CUSTOMALG.value;

    // Show custom alg for right case
    ELEM_EDITALG_CUSTOMALG.value = editAlgGlobal.customAlgRight;

    selectedAlgTemp = editAlgGlobal.selectedAlgNumberRight;

    // If identical is checked, show the same (mirrored) alg
    if (ELEM_IDENTICAL_ALG.checked) {
      ELEM_EDITALG_CUSTOMALG.value = stringManipulation.mirrorAlg(editAlgGlobal.customAlgLeft);
    }
  } else {
    // Code for left case

    // Set left image
    ELEM_EDITALG_IMG.src = GROUP.imgPath + "left/F2L" + (INDEX_CASE + 1) + ".svg";

    // Fill textboxes with algorithms for left case
    for (let index = 0; index < algorithmPool.length; index++) {
      ELEM_EDITALG_LISTENTRY[index].innerHTML = stringManipulation.mirrorAlg(algorithmPool[index]);
    }

    // Save current right alg globally
    editAlgGlobal.customAlgRight = ELEM_EDITALG_CUSTOMALG.value;

    // Show custom alg for left case
    ELEM_EDITALG_CUSTOMALG.value = editAlgGlobal.customAlgLeft;

    selectedAlgTemp = editAlgGlobal.selectedAlgNumberLeft;

    // If identical is checked, show the same (mirrored) alg
    if (ELEM_IDENTICAL_ALG.checked) {
      ELEM_EDITALG_CUSTOMALG.value = stringManipulation.mirrorAlg(editAlgGlobal.customAlgRight);
    }
  }

  // Check if custom or default alg is selected
  if (selectedAlgTemp < algorithmPool.length) {
    // If alg is default, set color of selected alg
    ui.setBackgroundColor(ELEM_EDITALG_LISTENTRY[selectedAlgTemp], COLORS_ALG.green);
  } else {
    // If alg is custom, set color
    ui.setBackgroundColor(ELEM_EDITALG_CUSTOMALG, COLORS_ALG.green);
  }
}

/**
 * Called when the "same alg for left and right" checkbox is changed.
 * Syncs the selected algorithms for the left and right cases, if the "same alg for left and right" checkbox is checked.
 * Also syncs the custom algorithms, if a custom algorithm is selected.
 */
function syncLeftRightAlgSelection() {
  if (!ELEM_IDENTICAL_ALG.checked) return;

  const INDEX_GROUP = editAlgGlobal.indexGroup;
  const INDEX_CASE = editAlgGlobal.indexCase;
  const GROUP = group.getGroupByIndex(INDEX_GROUP);

  // Sync selected algs
  if (ELEM_SWITCH_RIGHT.checked) {
    editAlgGlobal.selectedAlgNumberLeft = editAlgGlobal.selectedAlgNumberRight;
  } else {
    editAlgGlobal.selectedAlgNumberRight = editAlgGlobal.selectedAlgNumberLeft;
  }

  // Sync custom algs, if custom alg is selected
  const algorithmPool = GROUP.getAlgorithmPool(INDEX_CASE);
  if (ELEM_SWITCH_RIGHT.checked) {
    if (editAlgGlobal.selectedAlgNumberRight >= algorithmPool.length) {
      editAlgGlobal.customAlgLeft = stringManipulation.mirrorAlg(editAlgGlobal.customAlgRight);
    }
  } else {
    if (editAlgGlobal.selectedAlgNumberLeft >= algorithmPool.length) {
      editAlgGlobal.customAlgRight = stringManipulation.mirrorAlg(editAlgGlobal.customAlgLeft);
    }
  }
}

/**
 * Handles keydown events and executes corresponding actions based on the key pressed.
 *
 * Supported keys and their actions:
 * - 'C' (KeyCode: 67): Clears user data on double press.
 * - 'G' (KeyCode: 71): Logs the local storage.
 * - Space (KeyCode: 32): Triggers spaceDown() if not in case select mode.
 * - Right Arrow (KeyCode: 39): Calls showHintAlg() if not in case select mode.
 * - Left Arrow (KeyCode: 37): Reserved for future actions.
 * - 'S' (KeyCode: 83): Reserved for saving user data.
 * - 'L' (KeyCode: 76): Reserved for loading user data.
 *
 * The function respects the current mode and does not perform certain actions
 * (like spaceDown or showHintAlg) if the mode is case select (mode === 0).
 *
 * @param {Event} e - The event object containing information about the key pressed.
 */
function keydown(e) {
  // right arrow: 39
  // left arrow: 37
  // space: 32

  if (flagDialogOpen) return;

  if (e.keyCode === 67) {
    // C
    if (flagdoublepress) {
      clearUserData();
      flagdoublepress = false;
    } else {
      flagdoublepress = true;
      window.setTimeout(function () {
        flagdoublepress = false;
      }, 500);
    }
  } else if (e.keyCode === 71) {
    // G
    // Log Local Storage
    console.log(localStorage);
  } else {
    // console.log("Key pressed: " + e.keyCode);
  }

  if (mode === 0) return; // Do nothing when in case select mode

  if (e.keyCode === 32) {
    // Space key
    spaceDown();
  } else if (e.keyCode === 39) {
    // rechte Pfeiltaste
    showHintAlg();
  } else if (e.keyCode === 37) {
    // linke Pfeiltaste
  } else if (e.keyCode === 83) {
    // S
    // saveUserData();
  } else if (e.keyCode === 76) {
    // L
    // loadUserData();
  }
}

function keyup(e) {
  if (e.keyCode === 32) {
    // Space key
    spaceUp();
  }
}

/**
 * Called when "Confirmed" is pressed in settings popup.
 * Updates the list of cases to be trained based on the current settings.
 *
 * Updates the following variables:
 * - trainStateSelection
 * - trainGroupSelection
 * - leftSelection
 * - rightSelection
 * - aufSelection
 * - considerAUFinAlg
 * - hintImageSelection
 * - hintAlgSelection
 * - timerEnabled
 * - recapEnabled
 * - TrainCase.currentTrainCaseNumber
 * - trainCaseList
 *
 * Then it generates a new list of cases to be trained and updates the hint visibility.
 * Finally, it displays the next scramble.
 */
function updateTrainCases() {
  trainStateSelection = [
    ELEM_CHECKBOX_UNLEARNED.checked,
    ELEM_CHECKBOX_LEARNING.checked,
    ELEM_CHECKBOX_FINISHED.checked,
  ];
  trainGroupSelection = [
    ELEM_CHECKBOX_BASIC.checked,
    ELEM_CHECKBOX_BASIC_BACK.checked,
    ELEM_CHECKBOX_ADVANCED.checked,
    ELEM_CHECKBOX_EXPERT.checked,
  ];
  leftSelection = ELEM_CHECKBOX_LEFT.checked;
  rightSelection = ELEM_CHECKBOX_RIGHT.checked;
  aufSelection = ELEM_CHECKBOX_AUF.checked;
  considerAUFinAlg = ELEM_CHECKBOX_CONSIDER_AUF.checked;
  hintImageSelection = ELEM_SELECT_HINT_IMAGE.selectedIndex;
  hintAlgSelection = ELEM_SELECT_HINT_ALG.selectedIndex;
  stickeringSelection = ELEM_SELECT_STICKERING.selectedIndex;
  crossColorSelection = ELEM_SELECT_CROSS_COLOR.value;
  frontColorSelection = ELEM_SELECT_FRONT_COLOR.value;
  console.log(crossColorSelection, frontColorSelection);
  timerEnabled = ELEM_CHECKBOX_TIMER_ENABLE.checked;
  recapEnabled = ELEM_CHECKBOX_RECAP_ENABLE.checked;

  if (timerEnabled) {
    ui.showElement(ELEM_TIMER);
  } else {
    ui.hideElement(ELEM_TIMER);
  }

  if (recapEnabled) {
    ui.showElement(ELEM_RECAP_INFO);
    if (recapDone) recapDone = false;
  } else {
    ui.hideElement(ELEM_RECAP_INFO);
  }

  closeOverlays();
  trainCaseList = [];
  TrainCase.currentTrainCaseNumber = -1;
  generateTrainCaseList();
  //Set the active cases for training page
  ELEM_TRAINING_ACTIVE_CASES_INFO.innerHTML = getActiveCasesHTML();
  nextScramble(1);
}

/**
 * Get formatted HTML for active cases
 * @returns {string}
 */
function getActiveCasesHTML(fromSettings = false) {
  let activeCases = getActiveCasesCount(fromSettings);
  return `<b>${activeCases} case${activeCases !== 1 ? "s" : ""} selected</b>`;
}

/**
 * Count number of active cases
 * @returns {number}
 */
function getActiveCasesCount(fromSettings = false) {
  let trainStateSelectionTemp = fromSettings
    ? [ELEM_CHECKBOX_UNLEARNED.checked, ELEM_CHECKBOX_LEARNING.checked, ELEM_CHECKBOX_FINISHED.checked]
    : trainStateSelection;
  let trainGroupSelectionTemp = fromSettings
    ? [
        ELEM_CHECKBOX_BASIC.checked,
        ELEM_CHECKBOX_BASIC_BACK.checked,
        ELEM_CHECKBOX_ADVANCED.checked,
        ELEM_CHECKBOX_EXPERT.checked,
      ]
    : trainGroupSelection;

  let activeCases = 0;
  for (let indexGroup = 0; indexGroup < groups.getGroupCount(); indexGroup++) {
    const GROUP = group.getGroupByIndex(indexGroup);
    // Skip if group is not selected in settings
    if (!trainGroupSelectionTemp[indexGroup]) continue;
    for (const categoryItems of GROUP.categoryCases) {
      for (const categoryItem of categoryItems) {
        let indexCase = categoryItem - 1;
        for (let state = 0; state < trainStateSelectionTemp.length; state++) {
          // Check if case is in selected state
          if (!(trainStateSelectionTemp[state] && GROUP.getCaseState(indexCase) == state)) continue;
          activeCases++;
        }
      }
    }
  }

  return activeCases;
}

/**
 * Called when the Show Hint button is pressed when nextCase is executed.
 * Shows the hint for the current scramble.
 * If the hint setting is set to "Reveal step-by-step", it shows one move at a time.
 * If the hint setting is set to "Reveal all at once", it shows the full algorithm.
 * If the hint setting is set to "Show all time", it does nothing.
 * @returns {void}
 */
function showHintAlg() {
  const ELEM_TWISTY_ALG_VIEWER = document.querySelector("twisty-alg-viewer");
  const ELEMS_TWISTY_ALG_MOVE = document.querySelectorAll(".twisty-alg-move");

  if (hintCounter == -1) {
    if (twistyLoadFlag) {
      if (hintAlgSelection == 2) {
        // "Show all time"
        ELEMS_TWISTY_ALG_MOVE.forEach((element) => ui.setVisibility(element, "visible"));
        ui.hideElement(ELEM_HINT_PLACEHOLDER);
        ui.hideElement(ELEM_HINT_ALG);
        ui.showElement(ELEM_TWISTY_ALG_VIEWER);
      } else if (hintAlgSelection == 0 || hintAlgSelection == 1) {
        // "Reveal step-by-step" or "Reveal all at once"
        ELEMS_TWISTY_ALG_MOVE.forEach((element) => ui.setVisibility(element, "hidden"));
        ui.showElement(ELEM_HINT_PLACEHOLDER, "flex");
        ui.hideElement(ELEM_HINT_ALG);
        ui.hideElement(ELEM_TWISTY_ALG_VIEWER);
      }
    } else {
      // twistyLoadFlag: false
      if (hintAlgSelection == 2) {
        // "Show all time"
        ui.hideElement(ELEM_HINT_PLACEHOLDER);
        ELEM_HINT_ALG.innerText = trainCaseList[TrainCase.currentTrainCaseNumber].getAlgHint();
        ui.showElement(ELEM_HINT_ALG, "flex");
      } else if (hintAlgSelection == 0 || hintAlgSelection == 1) {
        // "Reveal step-by-step" or "Reveal all at once"
        ui.showElement(ELEM_HINT_PLACEHOLDER, "flex");
        ui.hideElement(ELEM_HINT_ALG);
      }
    }
  } else {
    // hintCounter >= 0
    // Return if no scrambles available or hint is visible by default
    if (trainCaseList.length == 0 || hintAlgSelection == 2) return;

    // Show hint image if no hint image is selected but hint alg button is pressed
    if (hintImageSelection == 0) {
      ELEM_DIV_HINT_IMG.classList.remove("display-none");
      ui.setVisibility(ELEM_HINT_IMG, "visible");
    }

    // Get algorithm and convert to list
    const ALG_LIST = trainCaseList[TrainCase.currentTrainCaseNumber].getAlgHint().split(" ");

    if (twistyLoadFlag) {
      // Hide hint placeholder
      ui.hideElement(ELEM_HINT_PLACEHOLDER);
      // Make hint visible
      ui.showElement(ELEM_TWISTY_ALG_VIEWER, "flex");

      if (hintAlgSelection == 0) {
        // "reveal step-by-step"
        // ELEM_HINT_IMG.style.opacity = "1";

        // Hide all moves if hintCounter is 0
        if (hintCounter == 0) ELEMS_TWISTY_ALG_MOVE.forEach((element) => ui.setVisibility(element, "hidden"));

        // Show one move at a time
        const maxViewerMoves = ELEMS_TWISTY_ALG_MOVE.length;
        const maxMoves = Math.max(ALG_LIST.length, maxViewerMoves);
        if (hintCounter < maxMoves && ELEMS_TWISTY_ALG_MOVE[hintCounter]) {
          ui.setVisibility(ELEMS_TWISTY_ALG_MOVE[hintCounter], "visible");
          hintCounter++;
        }
        return;
      } else if (hintAlgSelection == 1) {
        // "Reveal at once"
        ELEMS_TWISTY_ALG_MOVE.forEach((element) => ui.setVisibility(element, "visible"));
      }
    } else {
      // Hide hint placeholder
      ui.hideElement(ELEM_HINT_PLACEHOLDER);
      ui.showElement(ELEM_HINT_ALG, "flex");
      // twistyLoadFlag: false
      if (hintAlgSelection == 0) {
        // "reveal step-by-step"
        if (hintCounter < ALG_LIST.length) {
          ELEM_HINT_ALG.innerText = ALG_LIST.slice(0, hintCounter + 1).join(" ");
        }
      } else if (hintAlgSelection == 1) {
        // "Reveal at once"
        ELEM_HINT_ALG.innerText = ALG_LIST.join(" ");
      }
    }
  }
  hintCounter++;
}

/**
 * Shows only the selected group in select mode (Executed when dropdown box is changed)
 * Scrolls to the top of the page and saves the selection to local storage.
 */
function showSelectedGroup() {
  group.forEachGroup((GROUP, INDEX_GROUP, GROUP_ID) => {
    if (ELEM_SELECT_GROUP.selectedIndex === INDEX_GROUP) {
      ui.showElement(ELEM_GROUP_CONTAINER[INDEX_GROUP], "flex");
    } else {
      ui.hideElement(ELEM_GROUP_CONTAINER[INDEX_GROUP]);
    }
  });
  // Scroll to the top
  window.scrollTo(0, 0);
  viewSelection = ELEM_SELECT_GROUP.selectedIndex;
}

/**
 * Generates a new list of cases to be trained and adds them to the current list.
 * Called when settings are changed or when the list of cases to be trained is empty.
 * Adds all cases that shall be learned to trainCaseListTemp, chooses a random scramble for each case,
 * gets the hint algorithm for each case, mirrors the algorithm and scramble if right selection is true,
 * adds a random U move to the scramble if auf selection is true, and adds the case to the list.
 * Randomizes the order of the cases in the list, and adds the new cases to the current list.
 * If no cases are selected, the text "no case selected" is displayed on the page.
 */
function generateTrainCaseList() {
  let trainCaseListTemp = [];
  // Add all cases that shall be learned to trainCaseListTemp
  for (let indexGroup = 0; indexGroup < groups.getGroupCount(); indexGroup++) {
    const GROUP = group.getGroupByIndex(indexGroup);
    // Skip if group is not selected in settings
    if (!trainGroupSelection[indexGroup]) continue;
    for (const categoryItems of GROUP.categoryCases) {
      for (const categoryItem of categoryItems) {
        let indexCase = categoryItem - 1;
        for (let state = 0; state < trainStateSelection.length; state++) {
          // Check if case is in selected state
          if (!(trainStateSelection[state] && GROUP.getCaseState(indexCase) == state)) continue;

          if (GROUP.getScramblesForCase(indexCase) == undefined)
            console.warn(
              "GROUP.scrambles[indexCase + 1] == undefined\nindexGroup: " +
                indexGroup +
                "\nindexCase: " +
                indexCase +
                "\ngroup.scrambles: " +
                GROUP.scrambles
            );

          if (leftSelection && rightSelection) {
            // Push unmirrored and mirrored case
            trainCaseListTemp.push(new TrainCase(indexGroup, indexCase, 0, crossColorSelection, frontColorSelection));
            trainCaseListTemp.push(new TrainCase(indexGroup, indexCase, 1, crossColorSelection, frontColorSelection));
          } else if (rightSelection) {
            trainCaseListTemp.push(new TrainCase(indexGroup, indexCase, 0, crossColorSelection, frontColorSelection));
          } else if (leftSelection) {
            trainCaseListTemp.push(new TrainCase(indexGroup, indexCase, 1, crossColorSelection, frontColorSelection));
          }
        }
      }
    }
  }

  // Exit if no cases are selected
  if (trainCaseListTemp.length == 0) ELEM_SCRAMBLE.innerHTML = "no case selected";

  // Randomize Cases
  shuffleArray(trainCaseListTemp);

  // Add new cases to current list
  trainCaseList = trainCaseList.concat(trainCaseListTemp);
}

/**
 * https://stackoverflow.com/a/12646864
 * Less biased shuffle
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Show next/previous case
 * Called when user clicks on Previous/Next Scramble button or presses space
 * @param {number} nextPrevious - 0 to show previous case, 1 to show next case
 */
function nextScramble(nextPrevious) {
  // Show next/previous case
  // (nextPrevious = 0: previous case, nextPrevious = 1: next case)
  if (hintImageSelection == 1) {
    ui.setOpacity(ELEM_HINT_IMG, 0.3);
    ELEM_LOADING_CASE.classList.remove(CLASS_DISPLAY_NONE);
  }

  if (trainCaseList.length == 0) return;

  if (nextPrevious) {
    if (TrainCase.currentTrainCaseNumber >= 0) trainCaseList[TrainCase.currentTrainCaseNumber].incrementSolveCounter();
    TrainCase.currentTrainCaseNumber++;
    if (TrainCase.currentTrainCaseNumber >= trainCaseList.length) {
      generateTrainCaseList();
      if (recapEnabled && !recapDone) {
        recapDone = true;
      }
      if (trainCaseList.length <= 0) return;
    }
  } else if (TrainCase.currentTrainCaseNumber > 0) {
    TrainCase.currentTrainCaseNumber--;
  }

  if (trainCaseList[TrainCase.currentTrainCaseNumber] == undefined) return;

  // Update scramble text
  ELEM_SCRAMBLE.innerHTML = trainCaseList[TrainCase.currentTrainCaseNumber].getSelectedScrambleAUF();

  // Reset hint counter
  hintCounter = -1;
  showHintAlg();

  // Update hint image
  const INDEX_GROUP = trainCaseList[TrainCase.currentTrainCaseNumber].getIndexGroup();
  const INDEX_CASE = trainCaseList[TrainCase.currentTrainCaseNumber].getIndexCase();
  const MIRRORING = trainCaseList[TrainCase.currentTrainCaseNumber].getMirroring();
  const SETUP_ALG = trainCaseList[TrainCase.currentTrainCaseNumber].getSetupAlg();
  const ALG_AUF = trainCaseList[TrainCase.currentTrainCaseNumber].getAlgHintAUF();
  const CROSS_COLOR = trainCaseList[TrainCase.currentTrainCaseNumber].getCrossColor();
  const FRONT_COLOR = trainCaseList[TrainCase.currentTrainCaseNumber].getFrontColor();
  const PIECES_TO_HIDE = trainCaseList[TrainCase.currentTrainCaseNumber].getPiecesToHide();

  const GROUP = group.getGroupByIndex(INDEX_GROUP);

  if (!MIRRORING) {
    ELEM_HINT_IMG.src = GROUP.imgPath + "right/F2L" + (INDEX_CASE + 1) + ".svg";
  } else {
    ELEM_HINT_IMG.src = GROUP.imgPath + "left/F2L" + (INDEX_CASE + 1) + ".svg";
  }

  try {
    ELEM_TWISTY_PLAYER.experimentalSetupAlg = SETUP_ALG;
    ELEM_TWISTY_PLAYER.alg = ALG_AUF;
  } catch (error) {
    console.log(error);
  }

  resetTwistyPlayerView();

  ELEM_TWISTY_PLAYER.jumpToStart?.();
  ELEM_TWISTY_PLAYER.flash?.();
  ELEM_TWISTY_PLAYER.blur?.();

  hidePieces(CROSS_COLOR, FRONT_COLOR, PIECES_TO_HIDE, MIRRORING);

  ELEM_DEBUG_INFO.innerHTML = trainCaseList[TrainCase.currentTrainCaseNumber].getDebugInfo();

  currentTrainGroup = INDEX_GROUP;
  currentTrainCase = INDEX_CASE;

  // If no hint image is selected and user clicks on hint alg, the hint image will appear.
  // This hides the hint image
  updateHintImgVisibility();
  saveUserData();

  // Update recap info
  if (recapEnabled) {
    ELEM_RECAP_INFO.innerHTML = getRecapInfo();
  }
}

/**
 *
 */
function getRecapInfo() {
  let summary = "";
  if (recapDone) {
    summary = `Recap done (<a href="#" onclick="updateTrainCases();">Press to reset</a>)`;
  } else if (leftSelection && rightSelection) {
    let remainingCases = trainCaseList.slice(TrainCase.currentTrainCaseNumber);
    let remainingLeftCases = remainingCases.filter((item) => item.getMirroring() == 1).length;
    let remainingRightCases = remainingCases.filter((item) => item.getMirroring() == 0).length;
    summary = `${remainingLeftCases} left cases & ${remainingRightCases} right cases, left`;
  } else {
    let remainingCases = trainCaseList.length - TrainCase.currentTrainCaseNumber;
    summary = `${remainingCases} cases left`;
  }
  return `<h3>Recap mode: ${summary}</h3>`;
}

/**
 * Sets the checkboxes to display the current settings.
 * Executed when the settings dialog is opened.
 */
function updateCheckboxStatus() {
  ELEM_CHECKBOX_UNLEARNED.checked = trainStateSelection[0];
  ELEM_CHECKBOX_LEARNING.checked = trainStateSelection[1];
  ELEM_CHECKBOX_FINISHED.checked = trainStateSelection[2];
  ELEM_CHECKBOX_BASIC.checked = trainGroupSelection[0];
  ELEM_CHECKBOX_BASIC_BACK.checked = trainGroupSelection[1];
  ELEM_CHECKBOX_ADVANCED.checked = trainGroupSelection[2];
  ELEM_CHECKBOX_EXPERT.checked = trainGroupSelection[3];
  ELEM_CHECKBOX_LEFT.checked = leftSelection;
  ELEM_CHECKBOX_RIGHT.checked = rightSelection;
  ELEM_CHECKBOX_AUF.checked = aufSelection;
  ELEM_CHECKBOX_CONSIDER_AUF.checked = considerAUFinAlg;
  enableDisableCheckboxConsiderAUF();

  ELEM_SELECT_HINT_IMAGE.selectedIndex = hintImageSelection;
  ELEM_SELECT_HINT_ALG.selectedIndex = hintAlgSelection;
  ELEM_SELECT_STICKERING.selectedIndex = stickeringSelection;
  ELEM_SELECT_CROSS_COLOR.value = crossColorSelection;
  ELEM_SELECT_FRONT_COLOR.value = frontColorSelection;
  updateFrontColorOptions();
  ELEM_CHECKBOX_TIMER_ENABLE.checked = timerEnabled;
  ELEM_CHECKBOX_RECAP_ENABLE.checked = recapEnabled;
}

function enableDisableCheckboxConsiderAUF() {
  ELEM_CHECKBOX_CONSIDER_AUF.disabled = !ELEM_CHECKBOX_AUF.checked;
}

function updateFrontColorOptions() {
  // Opposite face mapping
  const opposites = {
    white: "yellow",
    yellow: "white",
    red: "orange",
    orange: "red",
    blue: "green",
    green: "blue",
  };

  const crossColor = ELEM_SELECT_CROSS_COLOR.value;

  // Reset: enable all options in front color select
  for (const option of ELEM_SELECT_FRONT_COLOR.options) {
    option.disabled = false;
  }

  if (crossColor !== "random") {
    // Disable cross color
    for (const option of ELEM_SELECT_FRONT_COLOR.options) {
      if (option.value === crossColor) {
        option.disabled = true;
      }
    }

    // Disable opposite color
    const oppositeColor = opposites[crossColor];
    if (oppositeColor) {
      for (const option of ELEM_SELECT_FRONT_COLOR.options) {
        if (option.value === oppositeColor) {
          option.disabled = true;
        }
      }
    }

    // If current selection is invalid → reset to first enabled
    if (ELEM_SELECT_FRONT_COLOR.options[ELEM_SELECT_FRONT_COLOR.selectedIndex].disabled) {
      for (const option of ELEM_SELECT_FRONT_COLOR.options) {
        if (!option.disabled) {
          option.selected = true;
          break;
        }
      }
    }
  }
}

/**
 * Updates the visibility of the hint image and the Twisty Player based on the value of the "Hint image" select element.
 * Called when settings are changed.
 */
function updateHintImgVisibility() {
  switch (ELEM_SELECT_HINT_IMAGE.selectedIndex) {
    case 0:
      // No hint
      ELEM_DIV_HINT_IMG.classList.remove("display-none");
      ui.setVisibility(ELEM_HINT_IMG, "hidden");
      ELEM_DIV_TWISTY_PLAYER.classList.add("display-none");
      break;
    case 1:
      // 2D image as hint
      ELEM_DIV_HINT_IMG.classList.remove("display-none");
      ui.setVisibility(ELEM_HINT_IMG, "visible");
      ELEM_DIV_TWISTY_PLAYER.classList.add("display-none");
      break;
    default:
      // 3D cube as hint
      ELEM_DIV_HINT_IMG.classList.add("display-none");
      ELEM_DIV_TWISTY_PLAYER.classList.remove("display-none");
      if (!twistyEventListenerFlag) addTwistyPlayerEventListeners();
  }
}

/**
 * Toggles the visibility of the debug information section in train mode.
 * Updates the button text to indicate the current state as "Show details" or "Hide details".
 */
function showHideDebugInfo() {
  // Show/hide debug info on the bottom of train mode
  if (boolShowDebugInfo) {
    boolShowDebugInfo = false;
    ELEM_BTN_SHOW_HIDE_DEBUG_INFO.innerHTML = "> Show details";
    ui.hideElement(ELEM_DEBUG_INFO);
  } else {
    boolShowDebugInfo = true;
    ELEM_BTN_SHOW_HIDE_DEBUG_INFO.innerHTML = "> Hide details";
    ui.showElement(ELEM_DEBUG_INFO);
  }
}

/**
 * Executed when image is clicked in select mode.
 * Changes the learning state of a case and updates the corresponding visual elements.
 * Called when image in pressen in select mode or learning state in changed in tranin mode.
 * @param {number} indexGroup - Index of the group.
 * @param {number} indexCategory - Index of the category within the group.
 * @param {number} indexCase - Index of the case.
 */
function changeState(indexGroup, indexCategory, indexCase) {
  const GROUP = group.getGroupByIndex(indexGroup);
  GROUP.cycleCaseState(indexCase);
  applyCaseStateStyling(GROUP, indexCase);
  highlightBulkChangeTrainingStateButton(indexGroup, indexCategory, indexCase);
  saveUserData();

  // Hide "Press me" text when user presses the cube in select mode
  if ((indexGroup == 0) & (indexCase == 3) & (divPressMe != undefined)) divPressMe.classList.add("display-none");
}

/**
 * Toggles the expansion and collapse of a category in select mode.
 * Updates the visual state of the category container and arrow icon,
 * and saves the updated user data.
 *
 * @param {string} groupId - Id of the group.
 * @param {number} indexCategory - Index of the category within the group.
 */
function collapseCategory(groupId, indexCategory) {
  const GROUP = GROUPS.get(groupId);
  if (!GROUP) return;
  const CATEGORY_CONATINER = GROUP.divCategoryContainer[indexCategory];
  if (!CATEGORY_CONATINER) return;
  const wasCollapsed = GROUP.isCategoryCollapsed(indexCategory);
  if (wasCollapsed == true) {
    // expand
    GROUP.imgCategoryCollapse[indexCategory].classList.add("rotate-arrow");
    expand(CATEGORY_CONATINER, 300);
  } else {
    // colapse
    GROUP.imgCategoryCollapse[indexCategory].classList.remove("rotate-arrow");
    collapse(CATEGORY_CONATINER, 300);
  }
  GROUP.toggleCategory(indexCategory);
  saveUserData();
}

/**
 * Collapse/Minimize the specific category in select mode.
 * Updates the visual state of the category container
 * by setting height, padding, margin, and overflow properties.
 *
 * @param {HTMLElement} target - The element to collapse.
 * @param {number} [duration=300] - The duration of the collapse animation in milliseconds.
 */
function collapse(target, duration = 300) {
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.boxSizing = "border-box";
  target.style.height = target.offsetHeight + "px";
  target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.classList.add("display-none");
    target.style.removeProperty("height");
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
}

/**
 * Expand the specific category in select mode.
 * Updates the visual state of the category container
 * by setting height, padding, margin, and overflow properties.
 *
 * @param {HTMLElement} target - The element to expand.
 * @param {number} [duration=300] - The duration of the expand animation in milliseconds.
 */
let expand = (target, duration = 300) => {
  // Expand the specific category in select mode
  target.classList.remove("display-none");
  let height = target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = "border-box";
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = height + "px";
  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};

/**
 * Toggle between select mode and train mode.
 * mode: 0 = select, 1 = train
 */
function changeMode() {
  if (mode == 0) {
    mode = 1;
    updateTrainCases();
    ELEM_BTN_CHANGE_MODE.innerHTML = "Select cases";
    ELEM_BTN_CHANGE_MODE.setAttribute("data-tooltip", "Select cases");
    ELEM_WINDOW_SELECT.classList.add("display-none");
    ELEM_WINDOW_TRAIN.classList.remove("display-none");
    //ELEM_BUTTON_SETTING_SELECT.classList.add("display-none");
    //ELEM_BUTTON_SETTINGS.classList.remove("display-none");
    // ELEM_CONTAINER_SELECT_GROUP.classList.add("display-none");
    ELEM_SELECT_GROUP.classList.add("display-none");
    if (firstVisitTrain) {
      firstVisitTrain = false;
      //showWelcomeTrainPopup();
    }
  } else {
    mode = 0;
    ELEM_BTN_CHANGE_MODE.innerHTML = "Train";
    ELEM_BTN_CHANGE_MODE.setAttribute("data-tooltip", "Start training");
    ELEM_WINDOW_SELECT.classList.remove("display-none");
    ELEM_WINDOW_TRAIN.classList.add("display-none");
    //ELEM_BUTTON_SETTING_SELECT.classList.remove("display-none");
    //ELEM_BUTTON_SETTINGS.classList.add("display-none");
    // ELEM_CONTAINER_SELECT_GROUP.classList.remove("display-none");
    ELEM_SELECT_GROUP.classList.remove("display-none");
  }
  ELEM_BTN_CHANGE_MODE.blur(); // Make button lose focus
}

/**
 * Checks for duplicate cases within each group in the groups registry.
 * Iterates through all cases in each group's categoryCases and logs a warning
 * in the console if any duplicate cases are found.
 */
// function checkForDuplicates() {
//   // Check if there are any duplicate cases in the groups map
//   for (const GROUP of GROUPS.values()) {
//     const FLATTENED_LIST = GROUP.categoryCases.flat();
//     for (let i = 0; i < FLATTENED_LIST.length; i++) {
//       const CASE_I = FLATTENED_LIST[i];
//       for (let j = 0; j < FLATTENED_LIST.length; j++) {
//         if (i == j) continue;
//         const CASE_J = FLATTENED_LIST[j];
//         if (CASE_I == CASE_J) console.warn("Duplicate Case in Group " + GROUP.name + ", Case " + CASE_I);
//       }
//     }
//   }
// }

/**
 * Change the learning state of the current case
 * (Executed when learning state is changed in train mode)
 */
function changeStateRadio() {
  const GROUP = group.getGroupByIndex(currentTrainGroup);
  if (GROUP == undefined) return;
  if (ELEM_RADIO_UNLEARNED.checked == true) GROUP.setCaseState(currentTrainCase, 0);
  if (ELEM_RADIO_LEARNING.checked == true) GROUP.setCaseState(currentTrainCase, 1);
  if (ELEM_RADIO_FINISHED.checked == true) GROUP.setCaseState(currentTrainCase, 2);
  applyCaseStateStyling(GROUP, currentTrainCase);

  saveUserData();
  highlightAllBulkChangeTrainingStateButtons();
  closeOverlays();
}

/**
 * Toggle the timer on and off
 * If the timer is currently running, this function will stop the timer.
 * If the timer is currently stopped, this function will start the timer from 0.
 */
function toggleTimer() {
  if (flagTimerRunning) {
    flagTimerRunning = false;
  } else {
    count = 0;
    second = 0;
    flagTimerRunning = true;
    timer();
  }
}

/**
 * Updates the timer display every 10 milliseconds while the timer is running.
 * Increments the count variable until it reaches 100, then increments the second variable.
 * Formats the timer display with leading zeros and updates the HTML element.
 */
function timer() {
  if (flagTimerRunning) {
    count++;
    if (count == 100) {
      second++;
      count = 0;
    }

    let secString = second;
    let countString = count;

    if (second < 10) {
      secString = "0" + secString;
    }
    if (count < 10) {
      countString = "0" + countString;
    }

    ELEM_TIMER.innerHTML = secString + ":" + countString;
    setTimeout(timer, 10);
  }
}

/**
 * Converts a timer time (in 10ms units) into a string of the form "ss:cc",
 * where ss is the number of seconds and cc is the number of centiseconds.
 * @param {number} time - The timer time in 10ms units.
 * @returns {string} A string of the form "ss:cc" representing the time.
 */
let timeToString = function (time) {
  let countString = time % 100;
  let secString = Math.floor(time / 100);
  if (secString < 10) {
    secString = "0" + secString;
  }
  if (countString < 10) {
    countString = "0" + countString;
  }
  return secString + ":" + countString;
};

/**
 * Handles the spacebar key press event.
 *
 * If the timer is enabled, toggle the timer and go to the next case if the timer was running.
 * If the timer is not enabled, go to the next case.
 *
 * @see toggleTimer
 * @see nextScramble
 */
function spaceDown() {
  if (flagDialogOpen) return;

  if (timerEnabled) {
    if (flagTimerRunning) {
      nextScramble(1);
      toggleTimer();
      spacePressFlag = true;
    } else {
      ui.setFontColor(ELEM_TIMER, COLOR_TIMER.ready); // yellow
    }
  } else {
    flagTimerRunning = false;
    nextScramble(1);
  }

  // Hide Press me text
  ELEM_PRESS_ME_TRAIN.classList.add("display-none");
}

/**
 * Handles the spacebar key release event.
 *
 * If the timer is enabled, toggle the timer if the timer was running and the spacebar was not pressed before.
 * If the timer is not enabled, do nothing.
 *
 * @see toggleTimer
 */
function spaceUp() {
  if (timerEnabled) {
    if (spacePressFlag == false) {
      ELEM_TIMER.style.color = COLOR_TEXT;
      ui.setFontColor(ELEM_TIMER, COLOR_TIMER.neutral);
      toggleTimer();
    }
    spacePressFlag = false;
  }
}

/**
 * Changes the learning state of all cases within a specified category.
 * Adjusts the visual elements associated with each case to reflect the new state.
 * Resizes the button corresponding to the selected state to indicate active selection.
 *
 * @param {string} groupId - The id of the group containing the category.
 * @param {number} indexCategory - The index of the category within the group.
 * @param {number} state - The new learning state to set for all cases in the category.
 */
function changeLearningStateBulk(groupId, indexCategory, state) {
  const GROUP = GROUPS.get(groupId);
  if (!GROUP) return;
  let categoryItems = GROUP.categoryCases[indexCategory];

  GROUP.btnChangeLearningState[0][indexCategory].style.height = SIZE_BTN_CHANGE_LEARNING_STATE_SMALL;
  GROUP.btnChangeLearningState[1][indexCategory].style.height = SIZE_BTN_CHANGE_LEARNING_STATE_SMALL;
  GROUP.btnChangeLearningState[2][indexCategory].style.height = SIZE_BTN_CHANGE_LEARNING_STATE_SMALL;
  GROUP.btnChangeLearningState[state][indexCategory].style.height = SIZE_BTN_CHANGE_LEARNING_STATE_BIG;

  for (let indexCategoryItem = 0; indexCategoryItem < categoryItems.length; indexCategoryItem++) {
    let indexCase = categoryItems[indexCategoryItem] - 1;

    GROUP.setCaseState(indexCase, state);
    applyCaseStateStyling(GROUP, indexCase);
    // console.log(COLORS_BTN_EDIT[GROUP.caseSelection[indexCase]]);
  }
  saveUserData();
}

/**
 * Makes the button bigger if all cases in category are in the same learning state.
 * @param {number} indexGroup - The index of the group containing the category.
 * @param {number} indexCategory - The index of the category within the group.
 */
function highlightBulkChangeTrainingStateButton(indexGroup, indexCategory) {
  // Make the button bigger if all cases in category are in the same learning state
  const GROUP = group.getGroupByIndex(indexGroup);
  let categoryItems = GROUP.categoryCases[indexCategory];
  let numUnlearned = 0,
    numLearning = 0,
    numFinished = 0;
  for (let indexCategoryItem = 0; indexCategoryItem < categoryItems.length; indexCategoryItem++) {
    let indexCase = categoryItems[indexCategoryItem] - 1;
    const state = GROUP.getCaseState(indexCase);
    if (state == 0) numUnlearned++;
    if (state == 1) numLearning++;
    if (state == 2) numFinished++;
  }

  GROUP.btnChangeLearningState[0][indexCategory].style.height = SIZE_BTN_CHANGE_LEARNING_STATE_SMALL;
  GROUP.btnChangeLearningState[1][indexCategory].style.height = SIZE_BTN_CHANGE_LEARNING_STATE_SMALL;
  GROUP.btnChangeLearningState[2][indexCategory].style.height = SIZE_BTN_CHANGE_LEARNING_STATE_SMALL;

  if (numLearning + numFinished == 0)
    GROUP.btnChangeLearningState[0][indexCategory].style.height = SIZE_BTN_CHANGE_LEARNING_STATE_BIG;
  if (numFinished + numUnlearned == 0)
    GROUP.btnChangeLearningState[1][indexCategory].style.height = SIZE_BTN_CHANGE_LEARNING_STATE_BIG;
  if (numUnlearned + numLearning == 0)
    GROUP.btnChangeLearningState[2][indexCategory].style.height = SIZE_BTN_CHANGE_LEARNING_STATE_BIG;
}

/**
 * Iterates over all groups and categories to highlight the bulk change training state buttons.
 * Calls the `highlightBulkChangeTrainingStateButton` function for each category in each group,
 * adjusting button size based on the learning state of all cases within the category.
 */
function highlightAllBulkChangeTrainingStateButtons() {
  group.forEachGroup((GROUP, INDEX_GROUP, GROUP_ID) => {
    GROUP.categoryCases.forEach((categoryItems, indexCategory) => {
      highlightBulkChangeTrainingStateButton(INDEX_GROUP, indexCategory);
    });
  });
}

/**
 * Mirror single case
 * Called when Mirror button is pressed in select mode
 * @param {number} indexGroup - The index of the group containing the case.
 * @param {number} indexCase - The index of the case within the group.
 */
function mirrorCase(indexGroup, indexCase) {
  const GROUP = group.getGroupByIndex(indexGroup);
  const tempAlgRight = GROUP.getAlgorithmForSide(indexCase, "right");
  const tempAlgLeft = GROUP.getAlgorithmForSide(indexCase, "left");

  const mirrored = GROUP.flagMirrored[indexCase];
  GROUP.flagMirrored[indexCase] = !GROUP.flagMirrored[indexCase];
  GROUP.imgContainer[indexCase].style.transform = mirrored ? "rotateY(0deg)" : "rotateY(180deg)";
  GROUP.divAlgButtonContainer[indexCase].innerHTML = mirrored ? tempAlgRight : tempAlgLeft;
}

/**
 * Displays a "Press me" text when the site is visited for the first time.
 * Creates a new div element with the class "div-press-me" and appends it to the
 * specified image container of the first group. The text is shown only if it's the
 * user's first visit, as indicated by the `firstVisit` flag.
 */
function showPressMeText() {
  if (firstVisit) {
    divPressMe = document.createElement("div");
    divPressMe.classList.add("div-press-me");
    divPressMe.innerHTML = "Press<br>me";
    group.getGroupByIndex(0).imgContainer[3].appendChild(divPressMe);
  }
}

// function hidePressMeTrainText() {
//   if (!firstVisitTrain) {
//     ELEM_PRESS_ME_TRAIN.classList.add("display-none");
//   }
// }

function hidePressMeTextTwisty() {
  ELEM_PRESS_ME_TWISTY.classList.add("display-none");
}

function copyUTLtoClipboard() {
  alert("URL copied to clipboard");
  navigator.clipboard.writeText(ELEM_INPUT_EXPORT.value);
}

function showResetButton() {
  // Show reset button in twisty player (3D cube in train mode)
  ELEM_BTN_RESET_PLAYER_VIEW.classList.remove("display-none");
}

function hideResetButton() {
  ELEM_BTN_RESET_PLAYER_VIEW.classList.add("display-none");
}

/**
 * Resets the TwistyPlayer's (3D cube in train mode) camera view to the
 * default position.
 */
function resetTwistyPlayerView() {
  // Reset twisty player (3D cube in train mode)
  const MIRRORING = trainCaseList[TrainCase.currentTrainCaseNumber].getMirroring();

  if (!MIRRORING) {
    ELEM_TWISTY_PLAYER.cameraLongitude = TWISTY_PLAYER_CAMERA.LONGITUDE;
  } else {
    ELEM_TWISTY_PLAYER.cameraLongitude = -TWISTY_PLAYER_CAMERA.LONGITUDE;
  }
  ELEM_TWISTY_PLAYER.cameraLatitude = TWISTY_PLAYER_CAMERA.LATITUDE;

  // hideResetButton();
}

function hidePieces(crossColor, frontColor, pieceToHide, mirroring) {
  let edgesArr, cornersArr;

  // If selection is 1, show the whole cube (no hidden stickers)
  if (typeof stickeringSelection !== "undefined" && stickeringSelection === 1) {
    edgesArr = Array(12).fill("-");
    cornersArr = Array(8).fill("-");
  } else {
    edgesArr = Array(12).fill("-");
    cornersArr = Array(8).fill("-");

    // Hide F2L slot *only if pieceToHide is set*
    if (pieceToHide !== undefined && pieceToHide !== null && pieceToHide !== "") {
      let side, facing;
      // fr: front-right, fl: front-left, br: back-right, bl: back-left
      if (pieceToHide === "fr") {
        facing = "front";
        side = "right";
      } else if (pieceToHide === "fl") {
        facing = "front";
        side = "left";
      } else if (pieceToHide === "br") {
        facing = "back";
        side = "left";
      } else if (pieceToHide === "bl") {
        facing = "back";
        side = "right";
      } else throw new Error("Invalid pieceToHide: " + pieceToHide);

      // If mirroring, swap left and right
      if (mirroring) {
        side = side === "left" ? "right" : "left";
      }

      const backColor = TrainCase.oppositeColorDict[frontColor];

      let f2lFace, f2lSideColor;
      if (facing === "front") {
        f2lFace = frontColor;
        f2lSideColor = TrainCase.sideColorDict[crossColor][frontColor][side];
      } else if (facing === "back") {
        f2lFace = backColor;
        f2lSideColor = TrainCase.sideColorDict[crossColor][backColor][side];
      }

      edgesArr[TrainCase.stickeringDict.edges[f2lFace][f2lSideColor]] = "I";
      cornersArr[TrainCase.stickeringDict.corners[crossColor][f2lFace][f2lSideColor]] = "I";
    }

    // Hide top layer
    const topColor = TrainCase.oppositeColorDict[crossColor];
    const edgeIndices = Object.values(TrainCase.stickeringDict.edges[topColor]);
    for (const i of edgeIndices) edgesArr[i] = "I";
    const colorObjs = Object.values(TrainCase.stickeringDict.corners[topColor]);
    for (const obj of colorObjs) for (const idx of Object.values(obj)) cornersArr[idx] = "I";
  }

  // --- Apply mask to the player ---
  const edges = edgesArr.join("");
  const corners = cornersArr.join("");
  ELEM_TWISTY_PLAYER.experimentalStickeringMaskOrbits = `EDGES:${edges},CORNERS:${corners},CENTERS:------`;
}

function mousedown(e) {
  // onmousedown = "mousedown(event)";
  mousepositionLast = [e.clientX, e.clientY];
  // console.log("mousedown, position: " + mousepositionLast);
}

function mouseup(e) {
  // onmouseup = "mouseup(event)";
  const mouseposition = [e.clientX, e.clientY];

  if (mouseposition.toString() === mousepositionLast.toString()) {
    // console.log("same position");
    nextScramble(1);
  }

  // console.log("mouseup, position: " + mouseposition);
}

// ----------    POP-UPS    ----------

function closeOverlays() {
  ELEM_BODY.style.overflow = "auto";
  ELEM_WELCOME_CONATINER.close();
  // ELEM_WELCOME_CONATINER_TRAIN.close();
  ELEM_INFO_CONTAINER.close();
  ELEM_EDITALG_CONTAINER.close();
  ELEM_CONTAINER_TRAIN_SETTINGS.close();
  // ELEM_CONTAINER_SELECT_SETTINGS.close();
  ELEM_CHANGE_STATE_POPUP.close();
  ELEM_FEEDBACK_CONTAINER.close();
  flagDialogOpen = false;
}

function showWelcomePopup() {
  if (firstVisit) {
    openDialog(ELEM_WELCOME_CONATINER);
  }
}

function showWelcomePopover() {
  if (firstVisit) {
    ELEM_POPOVER_INFO.popover = "manual";
    ELEM_BTN_INFO.popoverTargetElement = ELEM_POPOVER_INFO;
    ELEM_BTN_INFO.popoverTargetAction = "toggle";
    const btnRect = ELEM_BTN_INFO.getBoundingClientRect();
    ELEM_POPOVER_INFO.style.top = `${window.scrollY + btnRect.bottom + 8}px`;
    ELEM_POPOVER_INFO.style.left = `${window.scrollX + btnRect.left + btnRect.width / 4}px`;
    ui.showElement(ELEM_POPOVER_INFO);
  }
}

function showWelcomeTrainPopup() {
  setFirstVisitTrain();
  // openDialog(ELEM_WELCOME_CONATINER_TRAIN);
}

function showInfo() {
  ELEM_IFRAME_VIDEO.src = "https://www.youtube-nocookie.com/embed/EQbZvKssp7s?si=tEuX7PxLo8i5UdiT&amp;start=20";
  openDialog(ELEM_INFO_CONTAINER);

  if (ELEM_POPOVER_INFO.matches("[popover]:popover-open")) {
    ELEM_POPOVER_INFO.hidePopover();
  } else {
    ui.hideElement(ELEM_POPOVER_INFO);
  }

  ELEM_BTN_INFO.blur(); // Убираем фокус
  // ELEM_INFO_CONTAINER.scrollTo(0, 0);
}

//function showSettingsSelect() {
//  exportUserData();
//  openDialog(ELEM_CONTAINER_SELECT_SETTINGS);
//}

function updateSettingsActiveCases() {
  //Set the active cases for settings page
  ELEM_SETTINGS_ACTIVE_CASES_INFO.innerHTML = getActiveCasesHTML(true);
}

function showSettingsTrain() {
  exportToURL();
  updateCheckboxStatus();

  //Set the active cases for settings page
  ELEM_SETTINGS_ACTIVE_CASES_INFO.innerHTML = getActiveCasesHTML();

  openDialog(ELEM_CONTAINER_TRAIN_SETTINGS);
}

function showSetStateMenu() {
  const GROUP = group.getGroupByIndex(currentTrainGroup);
  const STATE = GROUP.getCaseState(currentTrainCase);
  if (STATE == 0 || STATE == "0") {
    ELEM_RADIO_UNLEARNED.checked = true;
  } else if (STATE == 1 || STATE == "1") {
    ELEM_RADIO_LEARNING.checked = true;
  } else if (STATE == 2 || STATE == "2") {
    ELEM_RADIO_FINISHED.checked = true;
  }

  openDialog(ELEM_CHANGE_STATE_POPUP);
}

function showFeedback() {
  openDialog(ELEM_FEEDBACK_CONTAINER);
  ELEM_FEEDBACK_NAME.focus();
}

function openDialog(ELEM) {
  ELEM.showModal();
  ELEM_BODY.style.overflow = "hidden";
  flagDialogOpen = true;
}
flagDialogOpen = true;
