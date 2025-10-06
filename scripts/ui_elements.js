// Safe to resolve at module top-level because <script type="module"> is deferred.
export const ui = {
  checkboxLeft: /** @type {HTMLInputElement} */ (document.getElementById("checkbox-left")),
  checkboxRight: /** @type {HTMLInputElement} */ (document.getElementById("checkbox-right")),
  hintPlaceholder: document.getElementById("hint-placeholder"),
  modeLabel: document.getElementById("mode-label"),
};
