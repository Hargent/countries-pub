import { ActionType, StateType } from "../utils/types/reducer";

import { CountryItemType } from "../utils/types/countryData";
import { ERROR_MESSAGE } from "../utils/constants/error";
import { FILTER_TYPE } from "../utils/constants/filter";
import Independent from "../utils/constants/enum";
import { REDUCER_ACTION } from "../utils/constants/reducer";

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case REDUCER_ACTION.SAVE_DATA:
      return {
        ...state,
        appData: {
          ...state.appData,
          data: { ...state.appData.data, ...action.payload },
          fluidData: { ...state.appData.fluidData, ...action.payload }
        }
      };
    case REDUCER_ACTION.SWITCH_MODE:
      return {
        ...state,
        appData: { ...state.appData, isDark: !state.appData.isDark }
      };

    case REDUCER_ACTION.FILTER:
      // setting fluid State

      const filterFluid = {
        active: true,
        order: state.appData.fluidState.search.active ? 1 : 0,
        payload: action,
        reDispatch: false
      };

      // setting filter data
      let filterQueryData: Array<CountryItemType> = [];
      let filterStateData: Array<CountryItemType> = [];
      if (action.payload.filterBy === FILTER_TYPE.NO_VALUE) {
        filterQueryData = [];
        state.appData.fluidState.filter.active = false;

        if (state.appData.fluidState.search.active) {
          state.appData.fluidState.filter.order = null;
          state.appData.reDispatch = REDUCER_ACTION.SEARCH;
        } else {
          state.appData.fluidData = state.appData.data;
        }
        return { ...state };
      } else {
        if (state.appData.fluidState.search.order === 0) {
          filterStateData = Object.values(state.appData.fluidData);
        } else {
          filterStateData = Object.values(state.appData.data);
        }

        switch (action.payload.filterBy) {
          case FILTER_TYPE.REGION:
            filterQueryData = filterStateData.filter(
              (country) => country.region === action.payload.filterWith
            );
            break;
          case FILTER_TYPE.POPULATION:
            break;
          case FILTER_TYPE.AREA:
            break;
          case FILTER_TYPE.SOVEREIGNTY:
            filterQueryData = filterStateData.filter(
              (country) =>
                country.independent ===
                Boolean(Independent[action.payload.filterBy])
            );
            break;
        }
      }

      return {
        ...state,
        appData: {
          ...state.appData,
          fluidState: {
            search: { ...state.appData.fluidState.search },
            filter: { ...filterFluid }
          },
          fluidData:
            filterQueryData.length > 0
              ? [...filterQueryData]
              : [...Object.values(state.appData.data)],
          filterData: [...filterQueryData],
          error:
            filterQueryData.length > 0 ? null : ERROR_MESSAGE.NO_QUERY_FOUND
        }
      };

    case REDUCER_ACTION.SEARCH:
      // setting search fluid

      const searchFluid = {
        active: true,
        order: state.appData.fluidState.filter.active ? 1 : 0,
        payload: action
      };

      // setting search data
      let searchQueryData: Array<CountryItemType> = [];
      let searchStateData: Array<CountryItemType> = [];
      if (action.payload.searchInput === FILTER_TYPE.NO_VALUE) {
        searchQueryData = [];
        state.appData.fluidState.search.active = false;

        if (state.appData.fluidState.filter.active) {
          state.appData.fluidState.search.order = null;

          state.appData.reDispatch = REDUCER_ACTION.FILTER;
        } else {
          state.appData.fluidData = state.appData.data;
        }
        return { ...state };
      } else {
        if (state.appData.fluidState.filter.order === 0) {
          searchStateData = Object.values(state.appData.fluidData);
        } else {
          searchStateData = Object.values(state.appData.data);
        }

        searchQueryData = searchStateData.filter((country) =>
          country.name
            .toLowerCase()
            .includes(action.payload.searchInput.trim().toLowerCase())
        );
      }

      return {
        ...state,
        appData: {
          ...state.appData,
          fluidState: {
            search: { ...searchFluid },
            filter: { ...state.appData.fluidState.filter }
          },
          fluidData:
            searchQueryData.length > 0
              ? [...searchQueryData]
              : [...Object.values(state.appData.data)],
          searchData: [...searchQueryData],
          error:
            searchQueryData.length > 0 ? null : ERROR_MESSAGE.NO_QUERY_FOUND
        }
      };

    case REDUCER_ACTION.FLUID:
      return {
        ...state,
        appData: {
          ...state.appData,
          fluidState: {
            search: {
              ...state.appData.fluidState.search,
              order: state.appData.fluidState.search.active
                ? state.appData.fluidState.filter.active
                  ? state.appData.fluidState.filter.order === 0
                    ? 1
                    : 0
                  : 0
                : null
            },
            filter: {
              ...state.appData.fluidState.filter,
              order: state.appData.fluidState.filter.active
                ? state.appData.fluidState.search.active
                  ? state.appData.fluidState.search.order === 0
                    ? 1
                    : 0
                  : 0
                : null
            }
          }
        }
      };
    default:
      throw new Error(ERROR_MESSAGE.REDUCER);
  }
};

export default reducer;
