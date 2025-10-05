class TrainCase {
  static cubeRotationAlgDict = {
    yellow: { red: "y", orange: "y'", blue: "y2", green: "" },
    white: { red: "z2 y'", orange: "z2 y", blue: "z2 y2", green: "z2" },
    red: { green: "z", blue: "z y2", white: "z y", yellow: "z y'" },
    orange: { green: "z'", blue: "z' y2", white: "z' y'", yellow: "z' y" },
    green: { red: "x' y", orange: "x' y'", white: "x'", yellow: "x' y2" },
    blue: { red: "x y", orange: "x y'", white: "x y2", yellow: "x" },
  };
  static oppositeColorDict = {
    yellow: "white",
    white: "yellow",
    red: "orange",
    orange: "red",
    green: "blue",
    blue: "green",
  };
  static colorsDict = ["white", "yellow", "red", "orange", "blue", "green"];
  static stickeringDict = {
    edges: {
      yellow: { green: 4, red: 5, blue: 6, orange: 7 },
      white: { green: 0, red: 1, blue: 2, orange: 3 },
      red: { white: 1, yellow: 5, green: 8, blue: 10 },
      orange: { white: 3, yellow: 7, green: 9, blue: 11 },
      green: { white: 0, yellow: 4, red: 8, orange: 9 },
      blue: { white: 2, yellow: 6, red: 10, orange: 11 },
    },
    corners: {
      yellow: {
        red: { blue: 7, green: 4 },
        orange: { blue: 6, green: 5 },
        green: { red: 4, orange: 5 },
        blue: { red: 7, orange: 6 },
      },
      white: {
        red: { green: 0, blue: 1 },
        orange: { green: 3, blue: 2 },
        green: { red: 0, orange: 3 },
        blue: { red: 1, orange: 2 },
      },
      red: {
        yellow: { green: 4, blue: 7 },
        white: { green: 0, blue: 1 },
        green: { yellow: 4, white: 0 },
        blue: { yellow: 7, white: 1 },
      },
      orange: {
        yellow: { green: 5, blue: 6 },
        white: { green: 3, blue: 2 },
        green: { yellow: 5, white: 3 },
        blue: { yellow: 6, white: 2 },
      },
      green: {
        yellow: { red: 4, orange: 5 },
        white: { red: 0, orange: 3 },
        red: { yellow: 4, white: 0 },
        orange: { yellow: 5, white: 3 },
      },
      blue: {
        yellow: { red: 7, orange: 6 },
        white: { red: 1, orange: 2 },
        red: { yellow: 7, white: 1 },
        orange: { yellow: 6, white: 2 },
      },
    },
  };
  static sideColorDict = {
    yellow: {
      red: { right: "blue", left: "green" },
      orange: { right: "green", left: "blue" },
      green: { right: "red", left: "orange" },
      blue: { right: "orange", left: "red" },
    },
    white: {
      red: { right: "green", left: "blue" },
      orange: { right: "blue", left: "green" },
      green: { right: "orange", left: "red" },
      blue: { right: "red", left: "orange" },
    },
    red: {
      yellow: { right: "green", left: "blue" },
      white: { right: "blue", left: "green" },
      green: { right: "white", left: "yellow" },
      blue: { right: "yellow", left: "white" },
    },
    orange: {
      yellow: { right: "blue", left: "green" },
      white: { right: "green", left: "blue" },
      green: { right: "yellow", left: "white" },
      blue: { right: "white", left: "yellow" },
    },
    green: {
      yellow: { right: "orange", left: "red" },
      white: { right: "red", left: "orange" },
      red: { right: "yellow", left: "white" },
      orange: { right: "white", left: "yellow" },
    },
    blue: {
      yellow: { right: "red", left: "orange" },
      white: { right: "orange", left: "red" },
      red: { right: "white", left: "yellow" },
      orange: { right: "yellow", left: "white" },
    },
  };
  static get currentTrainCaseNumber() {
    const state = UIStore.getState();
    const trainState = state.train || {};
    return typeof trainState.currentIndex === "number" ? trainState.currentIndex : -1;
  }

  static set currentTrainCaseNumber(nextIndex) {
    UIStore.setState(
      {
        train: {
          currentIndex: nextIndex,
        },
      },
      { source: "train_case:set-current-index" }
    );
  }
  #indexGroup;
  #indexCase;
  #indexScramble;
  #scramble;
  #mirroring;
  #algHint;
  #scrambleAUF;
  #setupAlg;
  #algHintAUF;
  #AUFNum;
  #crossColor;
  #frontColor;
  #piecesToHide;

  constructor(indexGroup, indexCase, mirroring, crossColor, frontColor) {
    const state = UIStore.getState();
    const resolvedCrossColor = crossColor ?? state.crossColorSelection;
    const resolvedFrontColor = frontColor ?? state.frontColorSelection;

    this.#indexGroup = indexGroup;
    this.#indexCase = indexCase;
    this.#mirroring = mirroring;
    this.#algHint = undefined;
    this.#indexScramble = undefined;
    this.#scramble = undefined;
    this.#scrambleAUF = undefined;
    this.#setupAlg = undefined;
    this.#algHintAUF = undefined;
    this.#AUFNum = undefined;
    this.#piecesToHide = null;

    this.#setRandomScramble();
    this.#setAlgHint();
    this.#addAuf();
    this.#setCrossFrontColor(resolvedCrossColor, resolvedFrontColor);
    this.#setPiecesToHide(resolvedCrossColor, resolvedFrontColor);
  }

  #setRandomScramble() {
    const GROUP = getGroupByIndex(this.#indexGroup);
    const { index, scramble } = GROUP.getRandomScrambleForCase(this.#indexCase);
    this.#indexScramble = index;
    this.#scramble = scramble;
  }

  #setAlgHint() {
    const GROUP = getGroupByIndex(this.#indexGroup);
    const tempAlgHintRight = GROUP.getAlgorithmForSide(this.#indexCase, "right") ?? "";
    const tempAlgHintLeft = GROUP.getAlgorithmForSide(this.#indexCase, "left") ?? "";

    this.#algHint = tempAlgHintRight;
    if (this.#mirroring) {
      this.#scramble = StringManipulation.mirrorAlg(this.#scramble);
      this.#algHint = tempAlgHintLeft;
    }
  }

  #addAuf() {
    const GROUP = getGroupByIndex(this.#indexGroup);
    if (GROUP.shouldIgnoreAUF(this.#indexCase + 1)) {
      //Add one to get the actual index
      //No AUF
      [this.#scrambleAUF, this.#setupAlg, this.#algHintAUF, this.#AUFNum] = [
        this.#scramble,
        this.#scramble,
        this.#algHint,
        0,
      ];
    } else {
      const { aufSelection, considerAUFinAlg } = UIStore.getState();
      [this.#scrambleAUF, this.#setupAlg, this.#algHintAUF, this.#AUFNum] = StringManipulation.addAUF(
        this.#scramble,
        aufSelection,
        considerAUFinAlg,
        this.#algHint
      );
    }
  }

  #getRandomColor({ exclude = [] } = {}) {
    const idx = Math.floor(Math.random() * TrainCase.colorsDict.length);
    const candidates = TrainCase.colorsDict.filter((c) => !exclude.includes(c));
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  #setCrossFrontColor(crossColor, frontColor) {
    // ---- Normalize / choose FRONT first when it's fixed ----
    if (frontColor === undefined) {
      this.#frontColor = "red";
      console.warn("frontColor is undefined");
    } else if (frontColor === "random") {
      // We'll decide after cross is known
      this.#frontColor = null; // placeholder
    } else {
      this.#frontColor = frontColor;
    }

    // ---- CROSS handling ----
    if (crossColor === undefined) {
      this.#crossColor = "white";
      console.warn("crossColor is undefined");
    } else if (crossColor === "random") {
      if (this.#frontColor && this.#frontColor !== "random") {
        // Front is fixed -> choose a cross adjacent to front
        const exclude = [this.#frontColor, TrainCase.oppositeColorDict[this.#frontColor]];
        this.#crossColor = this.#getRandomColor({ exclude });
      } else {
        // Front not fixed yet -> pick any cross for now
        this.#crossColor = this.#getRandomColor();
      }
    } else {
      this.#crossColor = crossColor;
    }

    // ---- If FRONT still undecided (random), pick adjacent to the chosen cross ----
    if (this.#frontColor === null || this.#frontColor === "random") {
      const exclude = [this.#crossColor, TrainCase.oppositeColorDict[this.#crossColor]];
      this.#frontColor = this.#getRandomColor({ exclude });
    }

    // ---- Safety: if a fixed pair was invalid, fix front to be adjacent to cross ----
    if (this.#frontColor === this.#crossColor || this.#frontColor === TrainCase.oppositeColorDict[this.#crossColor]) {
      console.warn(
        `Invalid cross/front combo (${this.#crossColor}, ${this.#frontColor}). Adjusting front to be adjacent.`
      );
      const exclude = [this.#crossColor, TrainCase.oppositeColorDict[this.#crossColor]];
      this.#frontColor = this.#getRandomColor({ exclude });
    }

    // console.log(`crossColor: ${this.#crossColor}, frontColor: ${this.#frontColor}`);
  }

  #setPiecesToHide() {
    const GROUP = getGroupByIndex(this.#indexGroup);
    const piece = GROUP.getPiecesToHide(this.#indexCase);
    if (piece !== undefined) {
      this.#piecesToHide = piece;
    } else this.#piecesToHide = undefined;
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
  // getSelectedScrambleTwisty() {
  //   return this.#setupAlg;
  // }

  getSetupAlg() {
    const rotationAlg = TrainCase.cubeRotationAlgDict[this.#crossColor][this.#frontColor];
    this.#setupAlg = rotationAlg + " " + this.#scrambleAUF;
    return this.#setupAlg;
  }
  getCrossColor() {
    return this.#crossColor;
  }
  getFrontColor() {
    return this.#frontColor;
  }
  getPiecesToHide() {
    return this.#piecesToHide;
  }
  //#endregion Getters

  //#region Additional
  incrementSolveCounter() {
    const GROUP = getGroupByIndex(this.#indexGroup);
    GROUP.solveCounter[this.#indexCase]++;
  }
  getDebugInfo() {
    const GROUP = getGroupByIndex(this.#indexGroup);

    // Get index of selected hint algorithm
    let indexAlgSelection = GROUP.getAlgorithmSelection("right", this.#indexCase);
    if (this.#mirroring) indexAlgSelection = GROUP.getAlgorithmSelection("left", this.#indexCase);

    let caseName = "";
    const mappedName = GROUP.getCaseLabel(this.#indexCase);
    if (mappedName) {
      caseName = "-" + mappedName;
    }

    return (
      GROUP.name +
      ", Case " +
      (this.#indexCase + 1) +
      caseName +
      ", Scramble " +
      +this.#indexScramble +
      ", AUF " +
      StringManipulation.u_moves[this.#AUFNum] +
      ", " +
      CATEGORY_NAMES[GROUP.getCaseState(this.#indexCase)] +
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
