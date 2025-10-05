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
