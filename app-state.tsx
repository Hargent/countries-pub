import { ActionType } from "./src/utils/types/reducer";

interface AppContextType {
  state: {
    appData: { data: {}; isDark: boolean; selectedId: number; searchData: {} };
  };
  handleDispatch: (arg: ActionType) => void;
  dispatch?: React.Dispatch<any>;
}
export type { AppContextType };
