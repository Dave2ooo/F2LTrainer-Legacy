import { store } from "./store.js";

// Text content binding for an element based on a selector of state
export function bindText(elem, selector) {
  const update = () => {
    elem.textContent = selector(store.getState());
  };
  update();
  return store.subscribe(selector, update);
}

// Checkbox binding (2-way): UI ↔ state
export function bindChecked(checkbox, selector, onChange) {
  checkbox.checked = selector(store.getState());
  checkbox.addEventListener("change", () => onChange(checkbox.checked));
  return store.subscribe(selector, (value) => {
    checkbox.checked = value;
  });
}

// Show/hide binding using a boolean selector
export function bindDisplay(elem, selector, displayWhenTrue = "block") {
  const render = () => {
    elem.style.display = selector(store.getState()) ? displayWhenTrue : "none";
  };
  render();
  return store.subscribe(selector, render);
}

export function bindSelect(select, selector, onChange) {
  // UI ← state
  const syncFromState = () => {
    const val = selector(store.getState());
    if (select.value !== val) select.value = val;
  };
  syncFromState();

  // state ← UI
  select.addEventListener("change", () => onChange(select.value));

  // keep in sync when state changes elsewhere
  return store.subscribe(selector, syncFromState);
}