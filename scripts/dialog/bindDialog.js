import { store } from "../store.js";

/**
 * Binds a <dialog> element to a boolean in the global store.
 * Opens the dialog and disables page scroll when true,
 * closes it and restores scroll when false.
 *
 * @param {HTMLDialogElement} dialogElem - The <dialog> element to control
 * @param {(state: object) => boolean} selector - Function returning whether dialog should be open
 */
export function bindDialog(dialogElem, selector) {
  const body = document.body;

  function update() {
    const open = !!selector(store.getState());

    if (open && !dialogElem.open) {
      dialogElem.showModal();
      body.style.overflow = "hidden";
    } else if (!open && dialogElem.open) {
      dialogElem.close();
      body.style.overflow = "auto";
    }
  }

  // Run once on init
  update();

  // Subscribe to store changes
  const unsubscribe = store.subscribe(selector, () => update());

  // Also handle manual dialog closure (Esc, clicking outside, etc.)
  dialogElem.addEventListener("close", () => {
    if (selector(store.getState())) {
      // If state still says "open", fix it
      store.set({ [findKey(selector)]: false });
    }
    body.style.overflow = "auto";
  });

  return unsubscribe;
}

// optional: try to infer which key a selector accesses (for auto close correction)
function findKey(selector) {
  const stateKeys = Object.keys(store.getState());
  for (const key of stateKeys) {
    try {
      const dummy = { [key]: true };
      if (selector(dummy)) return key;
    } catch (_) {}
  }
  return null;
}
