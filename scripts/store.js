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
  showDetailsFlag: false,
};

export const store = new Store(initialState);

// Optional: action helpers (keeps writes in one place)
export const actions = {
  setShowDetailsFlag: (showDetailsFlag) => store.set({ showDetailsFlag }),
};
