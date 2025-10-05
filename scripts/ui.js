export function showElement(elem, displayType = "block") {
  if (elem) elem.style.display = displayType;
}

export function hideElement(elem) {
  if (elem) elem.style.display = "none";
}

export function toggleElement(elem, show, displayType = "block") {
  if (!elem) return;
  elem.style.display = show ? displayType : "none";
}

export function setOpacity(elem, opacity){
  if (!elem) {
     console.warn("uiSetOpacity: elem is undefined");
    return;
  }
  elem.style.opacity = opacity;
}

export function setBackgroundColor(elem, color){
  if (!elem) {
     console.warn("uiSetBackgroundColor: elem is undefined");
    return;
  }
  elem.style.backgroundColor = color;
}

export function setFontColor(elem, color){
  if (!elem) {
     console.warn("uiSetFontColor: elem is undefined");
    return;
  }
  elem.style.color = color;
}

export function setFilter(elem, filter){
  if (!elem) {
     console.warn("uiSetFilter: elem is undefined");
    return;
  }
  elem.style.filter = filter;
}

export function setVisibility(elem, visibility){
  if (!elem) {
     console.warn("uiSetVisibility: elem is undefined");
    return;
  }
  elem.style.visibility = visibility;
}