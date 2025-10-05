"use strict";

(function attachUIStore(global) {
  if (global.UIStore) {
    return;
  }

  const CHANGE_EVENT = "change";
  const eventTarget = new EventTarget();

  const initialState = {
    editAlgGlobal: {
      indexGroup: 0,
      indexCase: 0,
      selectedAlgNumberRight: 0,
      selectedAlgNumberLeft: 0,
      customAlgRight: "",
      customAlgLeft: "",
    },
    twistyLoadFlag: false,
    twistyEventListenerFlag: false,
    clickCoordinatesStart: { x: 0, y: 0 },
    currentTrainGroup: -1,
    currentTrainCase: -1,
    hintCounter: 0,
    mode: 0,
    trainCaseList: [],
    train: {
      currentIndex: -1,
    },
    boolShowDebugInfo: true,
    recapDone: false,
    flagdoublepress: false,
    flagDialogOpen: false,
    flagTimerRunning: false,
    second: 0,
    count: 0,
    spacePressFlag: false,
    divPressMe: null,
    mousepositionLast: [0, 0],
    groups: {
      map: null,
      idList: [],
    },
    basicTrash: [],
    basicCaseSelection: [],
    basicAlgorithmSelectionRight: [],
    basicAlgorithmSelectionLeft: [],
    basicIdenticalAlgorithm: [],
    basicCustomAlgorithmsRight: [],
    basicCustomAlgorithmsLeft: [],
    basicCollapse: [],
    basicSolveCounter: [],
    basicBackTrash: [],
    basicBackCaseSelection: [],
    basicBackAlgorithmSelectionRight: [],
    basicBackAlgorithmSelectionLeft: [],
    basicBackIdenticalAlgorithm: [],
    basicBackCustomAlgorithmsRight: [],
    basicBackCustomAlgorithmsLeft: [],
    basicBackCollapse: [],
    basicBackSolveCounter: [],
    advancedTrash: [],
    advancedCaseSelection: [],
    advancedAlgorithmSelectionRight: [],
    advancedAlgorithmSelectionLeft: [],
    advancedIdenticalAlgorithm: [],
    advandedCustomAlgorithmsRight: [],
    advandedCustomAlgorithmsLeft: [],
    advancedCollapse: [],
    advancedSolveCounter: [],
    expertTrash: [],
    expertCaseSelection: [],
    expertAlgorithmSelectionRight: [],
    expertAlgorithmSelectionLeft: [],
    expertIdenticalAlgorithm: [],
    expertCustomAlgorithmsRight: [],
    expertCustomAlgorithmsLeft: [],
    expertCollapse: [],
    expertSolveCounter: [],
    viewSelection: 0,
    trainStateSelection: [false, true, false],
    trainGroupSelection: [true, true, true, true],
    leftSelection: true,
    rightSelection: true,
    aufSelection: true,
    considerAUFinAlg: true,
    hintImageSelection: 2,
    hintAlgSelection: 0,
    stickeringSelection: 0,
    crossColorSelection: "white",
    frontColorSelection: "red",
    timerEnabled: false,
    recapEnabled: false,
    firstVisit: true,
    firstVisitTrain: true,
  };

  const state = cloneValue(initialState);

  function isPlainObject(value) {
    return (
      value !== null &&
      typeof value === "object" &&
      Object.getPrototypeOf(value) === Object.prototype
    );
  }

  function cloneValue(value) {
    if (Array.isArray(value)) {
      return value.map((item) => cloneValue(item));
    }
    if (isPlainObject(value)) {
      const cloned = {};
      for (const key of Object.keys(value)) {
        cloned[key] = cloneValue(value[key]);
      }
      return cloned;
    }
    return value;
  }

  function deepFreeze(value) {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        deepFreeze(item);
      });
      return Object.freeze(value);
    }
    if (isPlainObject(value)) {
      for (const key of Object.keys(value)) {
        deepFreeze(value[key]);
      }
      return Object.freeze(value);
    }
    return value;
  }

  function areArraysEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!Object.is(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  function applyUpdates(target, updates, basePath, changedKeys) {
    let hasChanged = false;

    for (const key of Object.keys(updates || {})) {
      const fullPath = basePath ? basePath + "." + key : key;
      const updateValue = updates[key];
      const currentValue = target[key];

      if (isPlainObject(updateValue)) {
        const nextTarget = isPlainObject(currentValue) ? currentValue : {};
        const nestedChanged = applyUpdates(nextTarget, updateValue, fullPath, changedKeys);
        if (!isPlainObject(currentValue)) {
          target[key] = nextTarget;
        }
        if (nestedChanged) {
          changedKeys.add(fullPath);
          hasChanged = true;
        }
      } else if (Array.isArray(updateValue)) {
        const nextArray = cloneValue(updateValue);
        if (!Array.isArray(currentValue) || !areArraysEqual(currentValue, nextArray)) {
          target[key] = nextArray;
          changedKeys.add(fullPath);
          hasChanged = true;
        }
      } else if (updateValue !== null && typeof updateValue === "object") {
        if (currentValue !== updateValue) {
          target[key] = updateValue;
          changedKeys.add(fullPath);
          hasChanged = true;
        }
      } else {
        if (!Object.is(currentValue, updateValue)) {
          target[key] = updateValue;
          changedKeys.add(fullPath);
          hasChanged = true;
        }
      }
    }

    if (hasChanged && basePath) {
      changedKeys.add(basePath);
    }

    return hasChanged;
  }

  function getState() {
    return deepFreeze(cloneValue(state));
  }

  function setState(updaterOrPartial, options = {}) {
    const partial =
      typeof updaterOrPartial === "function"
        ? updaterOrPartial(getState())
        : updaterOrPartial;

    if (!partial || typeof partial !== "object") {
      return;
    }

    const changedKeys = new Set();
    const hasChanged = applyUpdates(state, partial, "", changedKeys);

    if (!hasChanged) {
      return;
    }

    const detail = {
      changedKeys: Array.from(changedKeys),
      source: options.source,
    };

    eventTarget.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail }));
  }

  function subscribe(keys, handler) {
    if (typeof handler !== "function") {
      throw new TypeError("UIStore.subscribe expects a function handler");
    }

    const keyList = Array.isArray(keys) ? keys : keys ? [keys] : [];

    const listener = (event) => {
      const { changedKeys, source } = event.detail || {};
      if (!keyList.length || keysChanged(keyList, changedKeys || [])) {
        handler({ state: getState(), changedKeys: changedKeys || [], source });
      }
    };

    eventTarget.addEventListener(CHANGE_EVENT, listener);

    return function unsubscribe() {
      eventTarget.removeEventListener(CHANGE_EVENT, listener);
    };
  }

  function keysChanged(watchedKeys, changedKeys) {
    return watchedKeys.some((watchedKey) =>
      changedKeys.some((changedKey) =>
        changedKey === watchedKey ||
        changedKey.startsWith(watchedKey + ".") ||
        watchedKey.startsWith(changedKey + ".")
      )
    );
  }

  global.UIStore = {
    getState,
    setState,
    subscribe,
  };
})(window);
