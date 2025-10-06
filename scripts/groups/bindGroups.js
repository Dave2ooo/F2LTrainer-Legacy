import { store } from "../store.js";

export function bindGroupVisibility(containerById, selector, display = "flex") {
  const render = () => {
    const current = selector(store.getState());
    Object.entries(containerById).forEach(([id, el]) => {
      el.style.display = id === current ? display : "none";
    });
    // Scroll to top on change
    window.scrollTo(0, 0);
  };
  render();
  return store.subscribe(selector, render);
}
