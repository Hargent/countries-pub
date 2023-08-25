import { ActionType, StateType } from "./reducer";

import { ReactNode } from "react";

interface AppContextProvidersProps {
  children: ReactNode;
}
interface AppContextType {
  state: StateType;
  searchQueryData: {};
  filterQueryData: {};
  fluidData: {};
  error: string | null;
  handleDispatch: (arg: ActionType) => void;
  dispatch?: React.Dispatch<any>;
}
export type { AppContextProvidersProps, AppContextType };
