interface ActionType {
  type: string;
  payload: {};
}
interface StateType {
  appData: {
    data: {};
    isDark: boolean;
    selectedId: number;
  };
}
const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "save-data":
      return {
        ...state,
        appData: {
          ...state.appData,
          data: { ...state.appData.data, ...action.payload }
        }
      };
    case "switch-mode":
      return {
        ...state,
        appData: { ...state.appData, isDark: !state.appData.isDark }
      };

    case "filter":
      console.log(action.payload);
      return { ...state };
    default:
      throw new Error("Reduces error encountered");
  }
};

export default reducer;

// // Define the state type
// interface CounterState {
//   count: number;
// }

// // Define action types
// type Action = { type: "INCREMENT" } | { type: "DECREMENT" } | { type: "RESET" };

// // Reducer function
// const counterReducer = (state: CounterState, action: Action): CounterState => {
//   switch (action.type) {
//     case "INCREMENT":
//       return { ...state, count: state.count + 1 };
//     case "DECREMENT":
//       return { ...state, count: state.count - 1 };
//     case "RESET":
//       return { ...state, count: 0 };
//     default:
//       return state; // Return the current state for unknown actions
//   }
// };

// export default counterReducer;
