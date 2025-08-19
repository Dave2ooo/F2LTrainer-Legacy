class TrainCase {
  static currentTrainCaseNumber = -1;
  #indexGroup;
  #indexCase;
  #indexScramble;
  #scramble;
  #mirroring;
  #algHint;
  #scrambleAUF;
  #scrambleTwisty;
  #algHintAUF;
  #AUFNum;

  constructor(indexGroup, indexCase, mirroring = undefined) {
    this.#indexGroup = indexGroup;
    this.#indexCase = indexCase;
    this.#mirroring = mirroring;
    this.#algHint = undefined;
    this.#indexScramble = undefined;
    this.#scramble = undefined;
    this.#scrambleAUF = undefined;
    this.#scrambleTwisty = undefined;
    this.#algHintAUF = undefined;
    this.#AUFNum = undefined;

    this.#setMirrored();
    this.#setRandomScramble();
    this.#setAlgHint();
    this.#addAuf();
  }

  //#region Private Functions
  #setMirrored() {
    // Check if already set (recap mode)
    if (this.#mirroring !== undefined) return;
    
    if (rightSelection && leftSelection) {
      this.#mirroring = parseInt(Math.floor(Math.random() * 2));
    } else if (rightSelection && !leftSelection) {
      this.#mirroring = 0;
    } else if (!rightSelection && leftSelection) {
      this.#mirroring = 1;
    }
  }

  #setRandomScramble() {
    const GROUP = GROUPS[this.#indexGroup];
    this.#indexScramble = parseInt(Math.random() * GROUP.scrambles[this.#indexCase + 1].length);
    this.#scramble = GROUP.scrambles[this.#indexCase + 1][this.#indexScramble];
  }

  #setAlgHint() {
    const GROUP = GROUPS[this.#indexGroup];
    let tempAlgHintRight,
      tempAlgHintLeft = "";
    // Get hint algorithm for current case (left and right, select later)
    if (GROUP.algorithmSelectionRight[this.#indexCase] >= GROUP.algorithms[this.#indexCase + 1].length) {
      // Custom algorithm
      tempAlgHintRight = GROUP.customAlgorithmsRight[this.#indexCase];
    } else {
      // Default algorithm
      tempAlgHintRight = GROUP.algorithms[this.#indexCase + 1][GROUP.algorithmSelectionRight[this.#indexCase]];
    }
    if (GROUP.algorithmSelectionLeft[this.#indexCase] >= GROUP.algorithms[this.#indexCase + 1].length) {
      // Custom algorithm
      tempAlgHintLeft = GROUP.customAlgorithmsLeft[this.#indexCase];
    } else {
      // Default algorithm
      tempAlgHintLeft = StringManipulation.mirrorAlg(
        GROUP.algorithms[this.#indexCase + 1][GROUP.algorithmSelectionLeft[this.#indexCase]]
      );
    }

    // Set left or right algorithm
    this.#algHint = tempAlgHintRight;
    if (this.#mirroring) {
      this.#scramble = StringManipulation.mirrorAlg(this.#scramble);
      this.#algHint = tempAlgHintLeft;
    }
  }

  #addAuf() {
    [this.#scrambleAUF, this.#scrambleTwisty, this.#algHintAUF, this.#AUFNum] = StringManipulation.addAUF(
      this.#scramble,
      aufSelection,
      considerAUFinAlg,
      this.#algHint
    );
  }
  //#endregion Private Functions

  //#region Setters
  setAlgHint(algHint) {
    this.#algHint = algHint;
    this.#addAuf();
  }
  //#endregion Setters

  //#region Getters
  getIndexGroup() {
    return this.#indexGroup;
  }
  getIndexCase() {
    return this.#indexCase;
  }
  getAUFNum() {
    return this.#AUFNum;
  }
  getMirroring() {
    return this.#mirroring;
  }
  getAlgHint() {
    return this.#algHint;
  }
  getAlgHintAUF() {
    return this.#algHintAUF;
  }
  getSelectedScrambleAUF() {
    return this.#scrambleAUF;
  }
  getSelectedScrambleTwisty() {
    return this.#scrambleTwisty;
  }
  //#endregion Getters

  //#region Additional
  incrementSolveCounter() {
    const GROUP = GROUPS[this.#indexGroup];
    GROUP.solveCounter[this.#indexCase]++;
  }
  getDebugInfo() {
    const GROUP = GROUPS[this.#indexGroup];

    // Get index of selected hint algorithm
    let indexAlgSelection = GROUP.algorithmSelectionRight[this.#indexCase];
    if (this.#mirroring) indexAlgSelection = GROUP.algorithmSelectionLeft[this.#indexCase];

    return (
      GROUP.name +
      ", Case " +
      (this.#indexCase + 1) +
      ", Scramble " +
      +this.#indexScramble +
      ", AUF " +
      StringManipulation.u_moves[this.#AUFNum] +
      ", " +
      CATEGORY_NAMES[GROUP.caseSelection[this.#indexCase]] +
      ", Algorithm " +
      indexAlgSelection +
      ", " +
      STRING_MIRRORED[this.#mirroring] +
      " Slot, Solve Counter: " +
      GROUP.solveCounter[this.#indexCase]
    );
  }
  //#endregion Additional
}
