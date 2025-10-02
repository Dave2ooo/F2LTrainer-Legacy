// Source https://github.com/Dave2ooo/F2LTrainer

class Group {
  constructor(config) {
    this.saveName = config.saveName;
    this.saveNameCasesURL = config.saveNameCasesURL;
    this.saveNameAlgURL = config.saveNameAlgURL;
    this.name = config.name;
    this.idName = config.idName;
    this.scrambles = config.scrambles;
    this.algorithms = config.algorithms;
    this.algorithmSelectionRight = config.algorithmSelectionRight;
    this.algorithmSelectionLeft = config.algorithmSelectionLeft;
    this.identicalAlgorithm = config.identicalAlgorithm;
    this.caseSelection = config.caseSelection;
    this.customAlgorithmsRight = config.customAlgorithmsRight;
    this.customAlgorithmsLeft = config.customAlgorithmsLeft;
    this.trash = config.trash;
    this.collapse = config.collapse;
    this.solveCounter = config.solveCounter;
    this.imgPath = config.imgPath;
    this.numberCases = config.numberCases;
    this.categoryNames = config.categoryNames;
    this.categoryCases = config.categoryCases;
    this.caseNumberMapping = config.caseNumberMapping;
    this.piecesToHide = config.piecesToHide;
    this.ignoreAUF = config.ignoreAUF ?? [];
    this.resetDomState();
  }

  resetDomState() {
    this.categoryContainer = [];
    this.collapseContainer = [];
    this.categoryCollapseImg = [];
    this.headingCategoryName = [];
    this.btnChangeLearningState = [[], [], []];
    this.divContainer = [];
    this.caseNumber = [];
    this.imgContainer = [];
    this.imgCase = [];
    this.imgCaseLeft = [];
    this.algorithm = [];
    this.divAlgorithm = [];
    this.btnContainer = [];
    this.btnMirror = [];
    this.imgMirror = [];
    this.flagMirrored = [];
    this.btnEdit = [];
    this.imgEdit = [];
    this.btnDelete = [];
    this.imgTrash = [];
    this.trashElementContainer = [];
    this.caseNumberTrash = [];
    this.imgContainerTrash = [];
    this.imgCaseTrash = [];
    this.btnRecover = [];
  }

  getId() {
    return this.idName;
  }

  getCaseState(indexCase) {
    return this.caseSelection[indexCase];
  }

  setCaseState(indexCase, state) {
    this.caseSelection[indexCase] = state;
    return this.caseSelection[indexCase];
  }

  cycleCaseState(indexCase) {
    const nextState = (this.getCaseState(indexCase) + 1) % 3;
    return this.setCaseState(indexCase, nextState);
  }

  toggleCategory(indexCategory) {
    this.collapse[indexCategory] = !this.collapse[indexCategory];
    return this.collapse[indexCategory];
  }

  isCategoryCollapsed(indexCategory) {
    return this.collapse[indexCategory];
  }

  getScramblesForCase(indexCase) {
    return this.scrambles[indexCase + 1] ?? [];
  }

  getRandomScrambleForCase(indexCase) {
    const scrambles = this.getScramblesForCase(indexCase);
    if (!scrambles.length) {
      return { index: 0, scramble: "" };
    }
    const index = Math.floor(Math.random() * scrambles.length);
    return { index, scramble: scrambles[index] };
  }

  getAlgorithmPool(indexCase) {
    return this.algorithms[indexCase + 1] ?? [];
  }

  getAlgorithmSelection(side, indexCase) {
    if (side === "left") {
      return this.algorithmSelectionLeft[indexCase];
    }
    return this.algorithmSelectionRight[indexCase];
  }

  setAlgorithmSelection(side, indexCase, value) {
    if (side === "left") {
      this.algorithmSelectionLeft[indexCase] = value;
    } else {
      this.algorithmSelectionRight[indexCase] = value;
    }
  }

  getCustomAlgorithm(side, indexCase) {
    if (side === "left") {
      return this.customAlgorithmsLeft[indexCase];
    }
    return this.customAlgorithmsRight[indexCase];
  }

  getAlgorithmForSide(indexCase, side) {
    const selection = this.getAlgorithmSelection(side, indexCase);
    const algorithms = this.getAlgorithmPool(indexCase);
    if (selection >= algorithms.length) {
      return this.getCustomAlgorithm(side, indexCase);
    }
    const baseAlg = algorithms[selection];
    if (side === "left") {
      if (typeof StringManipulation !== "undefined" && typeof StringManipulation.mirrorAlg === "function") {
        return StringManipulation.mirrorAlg(baseAlg);
      }
      return baseAlg;
    }
    return baseAlg;
  }

  shouldIgnoreAUF(caseNumber) {
    return this.ignoreAUF.includes(caseNumber);
  }

  getPiecesToHide(indexCase) {
    if (!Array.isArray(this.piecesToHide)) return undefined;
    return this.piecesToHide[indexCase];
  }

  getCaseLabel(indexCase) {
    if (!this.caseNumberMapping) return undefined;
    return this.caseNumberMapping[indexCase + 1];
  }
}

const BASIC_COLLECTION = new Group({
  // renamed!!!!! from basicCollection
  saveName: "basic_",
  saveNameCasesURL: "bc",
  saveNameAlgURL: "ba",
  name: "Basic Cases",
  idName: "Basic",
  scrambles: basicScrambles,
  algorithms: basicAlgorithms,
  // User saved
  algorithmSelectionRight: basicAlgorithmSelectionRight,
  algorithmSelectionLeft: basicAlgorithmSelectionLeft,
  identicalAlgorithm: basicIdenticalAlgorithm,
  caseSelection: basicCaseSelection,
  customAlgorithmsRight: basicCustomAlgorithmsRight,
  customAlgorithmsLeft: basicCustomAlgorithmsLeft,
  trash: basicTrash,
  collapse: basicCollapse,
  solveCounter: basicSolveCounter,
  //
  imgPath: "./images/basic_cases/",
  numberCases: 41,

  categoryNames: [
    "Basic Inserts",
    "Pieces on Top / White facing Front / Edge oriented",
    "Pieces on Top / White facing Front / Edge unoriented",
    "Pieces on Top / White facing Side / Edge oriented",
    "Pieces on Top / white facing Side / Edge unoriented",
    "Pieces on Top / White facing Up / Edge oriented",
    "Pieces on Top / White facing Up / Edge unoriented",
    "Edge solved",
    "Edge flipped",
    "Corner on Bottom / Edge on Top / Edge oriented",
    "Corner on Bottom / Edge on Top / Edge unoriented",
  ],
  categoryCases: [
    [4, 3, 1, 2],
    [5, 7, 15],
    [9, 11, 13],
    [10, 12, 14],
    [6, 8, 16],
    [17, 19, 21, 23],
    [18, 20, 22, 24],
    [32, 33, 34, 38, 39],
    [31, 35, 36, 40, 41, 37],
    [27, 30, 25],
    [29, 28, 26],
  ],
  ignoreAUF: [37, 38, 39, 40, 41],
});

const BASIC_BACK_COLLECTION = new Group({
  // renamed!!!!! from basicBackCollection
  saveName: "basicBack_",
  saveNameCasesURL: "bbc",
  saveNameAlgURL: "bba",
  name: "Basic Cases Backslot",
  idName: "BasicBack",
  scrambles: basicScramblesBack,
  algorithms: basicAlgorithmsBack,
  // User saved
  algorithmSelectionRight: basicBackAlgorithmSelectionRight,
  algorithmSelectionLeft: basicBackAlgorithmSelectionLeft,
  identicalAlgorithm: basicBackIdenticalAlgorithm,
  caseSelection: basicBackCaseSelection,
  customAlgorithmsRight: basicBackCustomAlgorithmsRight,
  customAlgorithmsLeft: basicBackCustomAlgorithmsLeft,
  trash: basicTrash,
  collapse: basicBackCollapse,
  solveCounter: basicBackSolveCounter,
  //
  imgPath: "./images/basic_cases_back/",
  numberCases: 41,

  categoryNames: [
    "Basic Inserts",
    "Pieces on Top / White facing Back / Edge oriented",
    "Pieces on Top / White facing Back / Edge unoriented",
    "Pieces on Top / White facing Side / Edge oriented",
    "Pieces on Top / white facing Side / Edge unoriented",
    "Pieces on Top / White facing Up / Edge oriented",
    "Pieces on Top / White facing Up / Edge unoriented",
    "Edge solved",
    "Edge flipped",
    "Corner on Bottom / Edge on Top / Edge oriented",
    "Corner on Bottom / Edge on Top / Edge unoriented",
  ],
  categoryCases: [
    [4, 3, 1, 2],
    [6, 8, 16],
    [10, 12, 14],
    [9, 11, 13],
    [5, 7, 15],
    [18, 20, 22, 24],
    [17, 19, 21, 23],
    [32, 34, 33, 39, 38],
    [31, 36, 35, 41, 40, 37],
    [28, 29, 26],
    [30, 27, 25],
  ],
  ignoreAUF: [37, 38, 39, 40, 41],
});

const ADVANCED_COLLECTION = new Group({
  // renamed!!!!! from advancedCollection
  saveName: "advanced_",
  saveNameCasesURL: "ac",
  saveNameAlgURL: "aa",
  name: "Advanced Cases",
  idName: "Advanced",
  scrambles: advancedScrambles,
  algorithms: advancedAlgorithms,
  // User saved
  algorithmSelectionRight: advancedAlgorithmSelectionRight,
  algorithmSelectionLeft: advancedAlgorithmSelectionLeft,
  identicalAlgorithm: advancedIdenticalAlgorithm,
  caseSelection: advancedCaseSelection,
  customAlgorithmsRight: advandedCustomAlgorithmsRight,
  customAlgorithmsLeft: advandedCustomAlgorithmsLeft,
  trash: advancedTrash,
  collapse: advancedCollapse,
  solveCounter: advancedSolveCounter,
  //
  imgPath: "./images/advanced_cases/",
  numberCases: 60, // 42,

  categoryNames: [
    "Slot in Front  / White facing Up",
    "Slot in Front / White facing Front",
    "Slot in Front / White facing Side",
    "Slot in Front / Corner in Adjacent Slot",
    "Slot in Back / Edge in Adjacent Front Slot", // new
    "Slot in Back / Corner in Adjacent Front Slot",
    "Edge in Opposite Slot",
    "Corner in Opposite Slot",
    "Basic Cases / Free Slot",
  ],
  categoryCases: [
    [1, 2, 3, 4],
    [9, 10, 13, 14],
    [7, 8, 11, 12],
    [19, 20, 21, 22, 23, 24],
    [37, 38, 39, 40, 41, 42], // new
    [25, 26, 27, 28, 29, 30],
    [5, 6, 17, 18, 15, 16],
    [31, 32, 33, 34, 35, 36],
    [43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
  ],
  // Individual naming
  // corresponding to basic cases, e.g. 10B -> Basic Case 10, Back slot free
  caseNumberMapping: {
    43: "10B",
    44: "12B",
    45: "15B",
    46: "23B",
    47: "25B",
    48: "25F",
    49: "26B",
    50: "26F",
    51: "33B",
    52: "33F",
    53: "34B",
    54: "34F",
    55: "37B",
    56: "37F",
    57: "38B",
    58: "38F",
    59: "39B",
    60: "39F",
  },
  piecesToHide: [
    "br",
    "br",
    "fl",
    "fl",
    "fr",
    "fr",
    "br",
    "br",
    "fl",
    "fl",
    "fl",
    "fl",
    "br",
    "br",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "fr",
    "br",
    "br",
    "br",
    "fl",
    "br",
    "fl",
    "br",
    "fl",
    "br",
    "fl",
    "br",
    "fl",
    "br",
    "fl",
    "br",
    "fl",
    "br",
    "fl",
  ],
  // fr: front-right, fl: front-left, br: back-right, bl: back-left
  ignoreAUF: [],
});

const EXPERT_COLLECTION = new Group({
  // renamed!!!!! from expertCollection
  saveName: "expert_",
  saveNameCasesURL: "ec",
  saveNameAlgURL: "ea",
  name: "Expert Cases",
  idName: "Expert",
  scrambles: expertScrambles,
  algorithms: expertAlgorithms,
  // User saved
  algorithmSelectionRight: expertAlgorithmSelectionRight,
  algorithmSelectionLeft: expertAlgorithmSelectionLeft,
  identicalAlgorithm: expertIdenticalAlgorithm,
  caseSelection: expertCaseSelection,
  customAlgorithmsRight: expertCustomAlgorithmsRight,
  customAlgorithmsLeft: expertCustomAlgorithmsLeft,
  trash: expertTrash,
  collapse: expertCollapse,
  solveCounter: expertSolveCounter,
  //
  imgPath: "./images/expert_cases/",
  numberCases: 17,

  categoryNames: [
    "Corner is solved",
    "Pair in wrong slot",
    "Flipped edge & corner in adjacent slot",
    "Other easy cases",
  ],
  categoryCases: [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9],
    [10, 11, 12, 13, 14, 15],
    [16, 17],
  ],
  piecesToHide: ["br", "br", "fl", "fl", "fl", "fl", "fl", "br", "fr", "fl", "br", "fl", "br", "fl", "br", "fl", "br"],
  // fr: front-right, fl: front-left, br: back-right, bl: back-left
  ignoreAUF: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
});

const GROUPS = new Map([
  [BASIC_COLLECTION.idName, BASIC_COLLECTION],
  [BASIC_BACK_COLLECTION.idName, BASIC_BACK_COLLECTION],
  [ADVANCED_COLLECTION.idName, ADVANCED_COLLECTION],
  [EXPERT_COLLECTION.idName, EXPERT_COLLECTION],
]);

const GROUP_ID_LIST = Array.from(GROUPS.keys());

function getGroupIds() {
  return GROUP_ID_LIST.slice();
}

function getGroupCount() {
  return GROUP_ID_LIST.length;
}

function getGroupIdByIndex(index) {
  return GROUP_ID_LIST[index];
}

function getGroupByIndex(index) {
  return GROUPS.get(getGroupIdByIndex(index));
}

function getGroupIndexById(id) {
  return GROUP_ID_LIST.indexOf(id);
}

function forEachGroup(callback) {
  GROUP_ID_LIST.forEach((id, index) => {
    callback(GROUPS.get(id), index, id);
  });
}
