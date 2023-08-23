import { ReactNode, createContext, useReducer } from "react";

import reducer from "../reducer/reducer";

interface AppContextType {
  state: {
    appData: { data: {}; isDark: boolean; selectedId: number };
  };
  handleDispatch: (arg: ActionType) => void;
  dispatch?: React.Dispatch<any>;
}
interface ActionType {
  type: string;
  payload: {};
}
interface AppContextProvidersProps {
  children: ReactNode;
}
const AppContext = createContext<AppContextType | null>(null);

const AppContextProviders = ({ children }: AppContextProvidersProps) => {
  const [state, dispatch] = useReducer(reducer, {
    appData: {
      data: {},
      isDark: false,
      selectedId: 0
    }
  });
  function handleDispatch(arg: ActionType) {
    dispatch(arg);
  }
  const contextValue: AppContextType = {
    state,
    handleDispatch
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProviders };
