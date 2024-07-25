// Reducer function
const tallyReducer = (state = 0, action) => {
    switch (action.type) {
      case "ADD":
        return state + 1;
      case "SUBTRACT":
        return state - 1;
      case "RESET":
        return 0;
      default:
        return state;
    }
  };
  
  // Store class
  class Store {
    constructor(reducer, initialState) {
      this.reducer = reducer;
      this.state = initialState;
      this.listeners = [];
    }
  
    getState() {
      return this.state;
    }
  
    dispatch(action) {
      this.state = this.reducer(this.state, action);
      this.notifyListeners();
    }
  
    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter((l) => l !== listener);
      };
    }
  
    notifyListeners() {
      this.listeners.forEach((listener) => listener(this.state));
    }
  }
  
  // Create the store instance
  const store = new Store(tallyReducer, 0);
  
  // Subscribe to state changes
  const unsubscribe = store.subscribe((newState) => {
    console.log("State updated:", newState);
  });
  
  // Test scenarios
  console.log("Initial state:", store.getState());
  
  store.dispatch({ type: "ADD" });
  store.dispatch({ type: "ADD" });
  
  store.dispatch({ type: "SUBTRACT" });
  
  store.dispatch({ type: "RESET" });
  
  // Unsubscribe from state changes
  unsubscribe();
  