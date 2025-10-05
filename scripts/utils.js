export function isSamePoint(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
}

/**
 * https://stackoverflow.com/a/12646864
 * Less biased shuffle
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export let timeToString = function (time) {
  let countString = time % 100;
  let secString = Math.floor(time / 100);
  if (secString < 10) {
    secString = "0" + secString;
  }
  if (countString < 10) {
    countString = "0" + countString;
  }
  return secString + ":" + countString;
};

export function copyUTLtoClipboard() {
  alert("URL copied to clipboard");
  navigator.clipboard.writeText(ELEM_INPUT_EXPORT.value);
}