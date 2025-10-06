import { store, actions } from "../store.js"; // if you sync to state

// map optional state keys to action functions (so we can auto-sync on close)
const dialogKeyToAction = {
  showInfo: (v) => actions.setDialogInfoOpenFlag(v),
  // add others...
};

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-dialog-close]");
  if (!btn) return;

  const dlg = btn.closest("dialog");
  if (!dlg) return;

  // Close the dialog
  dlg.close();
  document.body.style.overflow = "auto";

  // If the dialog declares which store key controls it, flip that to false
  const key = dlg.dataset.stateKey;
  if (key && dialogKeyToAction[key]) {
    dialogKeyToAction[key](false);
  }
});
