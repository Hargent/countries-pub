import {
  AppContextProvidersProps,
  AppContextType
} from "../utils/types/context";
import { createContext, useEffect, useReducer, useState } from "react";

import { ActionType } from "../utils/types/reducer";
import { REDUCER_ACTION } from "../utils/constants/reducer";
import reducer from "../reducer/reducer";

const AppContext = createContext<AppContextType | null>(null);

const AppContextProviders = ({ children }: AppContextProvidersProps) => {
  const [state, dispatch] = useReducer(reducer, {
    appData: {
      data: {},
      isDark: false,
      selectedId: 0,
      fluidData: {},

      fluidState: {
        search: {
          active: false,
          order: 0,
          payload: {}
        },
        filter: {
          active: false,
          order: 1,
          payload: {}
        }
      },
      searchData: {},
      filterData: {},
      error: null,
      reDispatch: null
    }
  });
  const [searchQueryData, setSearchQueryData] = useState({});
  const [filterQueryData, setFilterQueryData] = useState({});
  function handleDispatch(arg: ActionType) {
    dispatch(arg);
  }
  const searchState = state.appData.searchData;
  const filterState = state.appData.filterData;
  let fluidState: {} = {};
  if (Object.values(state.appData.fluidData).length !== 0) {
    fluidState = state.appData.fluidData;
  } else if (
    Object.values(state.appData.filterData).length !== 0 ||
    Object.values(state.appData.searchData).length !== 0
  ) {
    if (Object.values(state.appData.filterData).length !== 0) {
      fluidState = state.appData.filterData;
    } else if (Object.values(state.appData.searchData).length !== 0) {
      fluidState = state.appData.searchData;
    }
  } else fluidState = state.appData.data;

  // A useEffect dispatch [fluidState] will make consequent Dispatch

  useEffect(() => {

  }, [fluidState]);
  useEffect(() => {
    setSearchQueryData(searchState);
  }, [searchState]);
  useEffect(() => {
    setFilterQueryData(filterState);
  }, [filterQueryData]);
  // setting fluid state
  useEffect(() => {
    dispatch({ type: "fluid", payload: {} });
  }, [filterQueryData, searchQueryData]);
  const fluidData = state.appData.fluidData;
  const error = state.appData.error;
  const reDispatch = state.appData.reDispatch;
  useEffect(() => {
    let dispatchValue: ActionType = {
      type: "",
      payload: {}
    };
    if (reDispatch === null) return;
    if (reDispatch === REDUCER_ACTION.FILTER) {


      dispatchValue = {
        type: REDUCER_ACTION.FILTER,
        payload: state.appData.fluidState.filter.payload.payload
      };
    }
    if (reDispatch === REDUCER_ACTION.SEARCH) {


      dispatchValue = {
        type: REDUCER_ACTION.SEARCH,
        payload: state.appData.fluidState.search.payload.payload
      };
    }

    dispatch(dispatchValue);
  }, [reDispatch]);

  const contextValue: AppContextType = {
    state,
    searchQueryData,
    filterQueryData,
    fluidData,
    error,
    handleDispatch
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProviders };
