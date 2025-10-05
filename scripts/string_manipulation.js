// Source https://github.com/Dave2ooo/F2LTrainer
const moves = [
  ["R", "L'"],
  ["R2", "L2'"],
  ["L", "R'"],
  ["L2", "R2'"],
  ["F", "F'"],
  ["F2", "F2'"],
  ["B", "B'"],
  ["B2", "B2'"],
  ["r", "l'"],
  ["r2", "l2'"],
  ["l", "r'"],
  ["l2", "r2'"],
  ["f", "f'"],
  ["f2", "f2'"],
  ["b", "b'"],
  ["b2", "b2'"],
  ["U", "U'"],
  ["U2", "U2'"],
  ["D", "D'"],
  ["D2", "D2'"],
  ["u", "u'"],
  ["u2", "u2'"],
  ["d", "d'"],
  ["d2", "d2'"],
  ["y", "y'"],
  ["S", "S'"],
  ["S2", "S2'"],
];

const u_moves = ["", "U", "U2", "U'"];

export function mirrorAlg(alg) {
  alg = alg.replace(/\(/g, "( "); // Add space after "("
  alg = alg.replace(/\)/g, " )"); // Add space before ")"
  let algList = alg.split(" ");

  for (let indexAlg = 0; indexAlg < algList.length; indexAlg++) {
    for (let indexMirror = 0; indexMirror < this.moves.length; indexMirror++) {
      if (algList[indexAlg] == this.moves[indexMirror][0]) {
        algList[indexAlg] = this.moves[indexMirror][1];
        continue;
      }
      if (algList[indexAlg] == this.moves[indexMirror][1]) {
        algList[indexAlg] = this.moves[indexMirror][0];
        continue;
      }
    }
  }
  let myMirroredAlg = algList.join(" ");
  myMirroredAlg = myMirroredAlg.replace(/ \)/g, ")"); // Remove space before ")"
  myMirroredAlg = myMirroredAlg.replace(/\( /g, "("); // Remove space after "("
  return myMirroredAlg;
}

/**
 * Adds a random AUF move to the given scramble and hint if AUF is selected.
 * If AUF is not selected, returns the original scramble and hint.
 * If AUF is selected but not considered in TwistyPlayer,
 * returns scramble with AUF (for scramble text), scramble without AUF for TwistyPlayer and hint.
 * If AUF is selected and considered in TwistyPlayer,
 * returns scramble with AUF (for scramble text and TwistyPlayer) and hint with AUF.
 * @param {string} scramble Scramble to add AUF move to.
 * @param {boolean} aufSelection Whether to add AUF move or not.
 * @param {boolean} considerAUF Whether to add AUF move to TwistyPlayer and hint or not.
 * @param {string} hint Hint algorithm to add AUF move to.
 * @return {array} Array containing [selectedScrambleAUF, selectedScrambleTwisty, algHintAUF, AUFNum]
 */
export function addAUF(scramble, aufSelection, considerAUF, hint) {
  // If no AUF selected, return original scramble and hint
  if (!aufSelection) return [scramble, scramble, hint, 0];

  // Get random number 0-3 (1:U, 2:U2, 3:U')
  const AUFNum = Math.floor(Math.random() * 4);
  const scrambleList = scramble.split(" ");
  const lastMove = scrambleList[scrambleList.length - 1];

  // Remove last move if it is a U move
  if (lastMove.includes("U")) scrambleList.pop();

  let lastMoveNum = 0;

  if (lastMove.includes("U2")) {
    lastMoveNum = 2;
  } else if (lastMove.includes("U'")) {
    lastMoveNum = 3;
  } else if (lastMove.includes("U")) {
    lastMoveNum = 1;
  }

  // Combine U move from original scramble with U move from AUF
  let AUFcombinedNum = lastMoveNum + AUFNum;
  AUFcombinedNum = AUFcombinedNum % 4;

  // Add the resulting U move to the scramble
  scrambleList.push(this.u_moves[AUFcombinedNum]);

  const scrambleAUF = scrambleList.join(" ");

  // If AUF is selected but not considered in TwistyPlayer:
  // Return scramble with AUF (for scramble text), scramble without AUF for TwistyPlayer and hint
  if (!considerAUF) return [scrambleAUF, scramble, hint, AUFNum];

  const hintAUF = this.addAUFtoHint(hint, AUFNum);

  // If AUF is selected and considered in TwistyPlayer:
  // Return scramble with AUF (for scramble text and TwistyPlayer) and hint with AUF
  return [scrambleAUF, scrambleAUF, hintAUF, AUFNum];
}

export function addAUFtoHint(hint, AUFNum) {
  const hintList = hint.split(" ");
  const firstHintMove = hintList[0];

  let firstHintMoveNum = 0;

  if (!firstHintMove.includes("(")) {
    // Remove first move if it is a U move
    if (firstHintMove.includes("U")) hintList.shift();
    if (firstHintMove.includes("U2")) {
      firstHintMoveNum = 2;
    } else if (firstHintMove.includes("U'")) {
      firstHintMoveNum = 3;
    } else if (firstHintMove.includes("U")) {
      firstHintMoveNum = 1;
    }
  }
  // Combine U move from original hint with U move from AUF
  let sum = firstHintMoveNum - AUFNum;
  sum = ((sum % 4) + 4) % 4;

  // Add AUF to front of hint
  if (sum != 0) hintList.unshift(this.u_moves[sum]);

  return hintList.join(" ");
}
