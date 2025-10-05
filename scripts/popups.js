// ----------    POP-UPS    ----------
function openDialog(ELEM) {
  ELEM.showModal();
  ELEM_BODY.style.overflow = "hidden";
  flagDialogOpen = true;
}

export function closeOverlays() {
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

export function showWelcomePopup() {
  if (firstVisit) {
    openDialog(ELEM_WELCOME_CONATINER);
  }
}

export function showWelcomePopover() {
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

export function showWelcomeTrainPopup() {
  setFirstVisitTrain();
  // openDialog(ELEM_WELCOME_CONATINER_TRAIN);
}

export function showInfo() {
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

export function showSettingsTrain() {
  exportToURL();
  updateCheckboxStatus();

  //Set the active cases for settings page
  ELEM_SETTINGS_ACTIVE_CASES_INFO.innerHTML = getActiveCasesHTML();

  openDialog(ELEM_CONTAINER_TRAIN_SETTINGS);
}

export function showSetStateMenu() {
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

export function showFeedback() {
  openDialog(ELEM_FEEDBACK_CONTAINER);
  ELEM_FEEDBACK_NAME.focus();
}
