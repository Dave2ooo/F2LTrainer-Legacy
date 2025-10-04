function uiShowElement(elem, displayType = "block") {
  if (elem) elem.style.display = displayType;
}

function uiHideElement(elem) {
  if (elem) elem.style.display = "none";
}

function uiToggleElement(elem, show, displayType = "block") {
  if (!elem) return;
  elem.style.display = show ? displayType : "none";
}

function uiSetOpacity(elem, opacity){
  if (!elem) {
     console.warn("uiSetOpacity: elem is undefined");
    return;
  }
  elem.style.opacity = opacity;
}

function uiSetBackgroundColor(elem, color){
  if (!elem) {
     console.warn("uiSetBackgroundColor: elem is undefined");
    return;
  }
  elem.style.backgroundColor = color;
}

function uiSetFontColor(elem, color){
  if (!elem) {
     console.warn("uiSetFontColor: elem is undefined");
    return;
  }
  elem.style.color = color;
}

function uiSetFilter(elem, filter){
  if (!elem) {
     console.warn("uiSetFilter: elem is undefined");
    return;
  }
  elem.style.filter = filter;
}

function uiSetVisibility(elem, visibility){
  if (!elem) {
     console.warn("uiSetVisibility: elem is undefined");
    return;
  }
  elem.style.visibility = visibility;
}