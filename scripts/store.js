// A minimal store built on EventTarget + CustomEvent.
class Store extends EventTarget {
  #state;
  constructor(initial = {}) {
    super();
    this.#state = { ...initial };
  }
  // Read the whole state (read-only usage outside!)
  getState() {
    return this.#state;
  }

  // Merge partial updates and notify listeners
  set(partial) {
    const prev = this.#state;
    const next = { ...prev, ...partial };
    this.#state = next;
    this.dispatchEvent(new CustomEvent("statechange", { detail: { prev, next } }));
  }

  // Subscribe to either the whole state or a derived slice
  subscribe(selectorOrFn, fn) {
    const selector = typeof selectorOrFn === "function" && fn ? selectorOrFn : (s) => s;
    const callback = fn ?? selectorOrFn;

    let last = selector(this.#state);
    const handler = (e) => {
      const slice = selector(e.detail.next);
      // naive change detection; improve as needed (e.g., shallow or deep compare)
      if (slice !== last) {
        last = slice;
        callback(slice, e.detail.next, e.detail.prev);
      }
    };
    this.addEventListener("statechange", handler);
    // Return unsubscribe
    return () => this.removeEventListener("statechange", handler);
  }
}

// Put ALL former globals here as keys:
const initialState = {
  mode: 0, // 0=select, 1=train
  // View selection
  viewSelection: 0,
  // 0 -> unlearned
  // 1 -> learning
  // 2 -> finished
  trainStateSelection: [false, true, false],
  // 0 -> basic
  // 1 -> basic back
  // 2 -> advanced
  // 3 -> expert
  trainGroupSelection: [true, false, false, false],
  leftSelection: true,
  rightSelection: true,
  aufSelection: true,
  considerAUFinAlg: true,
  hintImageSelection: 2,
  hintAlgSelection: 0,
  stickeringSelection: 0,
  crossColorSelection: "white",
  frontColorSelection: "red",
  timerEnabled: false,
  recapEnabled: false,

  firstVisit: true,
  firstVisitTrain: true,
};

export const store = new Store(initialState);

// Optional: action helpers (keeps writes in one place)
export const actions = {
  setMode: (mode) => store.set({ mode }),
  setLeft: (leftSelection) => store.set({ leftSelection }),
  setRight: (rightSelection) => store.set({ rightSelection }),
  setAuf: (aufSelection) => store.set({ aufSelection }),
  setConsiderAuf: (considerAUFinAlg) => store.set({ considerAUFinAlg }),
  setTrainStates: (arr) => store.set({ trainStateSelection: arr }),
  setTrainGroups: (arr) => store.set({ trainGroupSelection: arr }),
  // …add more domain-specific actions
};
