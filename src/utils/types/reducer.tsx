import { FluidState } from "./state";

interface ActionType {
  type: string;
  payload: {
    [key: string]: any;
  };
}

interface StateType {
  appData: {
    data: {};
    fluidData: {};
    fluidState: FluidState;
    isDark: boolean;
    selectedId: number;
    searchData: {};
    filterData: {};
    error: string | null;
    reDispatch: string | null;
  };
}

export type { ActionType, StateType };
