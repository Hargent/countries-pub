import { IconCancel, IconChevronDown, IconChevronUp } from "../icons/icons";
import { useEffect, useState } from "react";

import findUniqueStrings from "../../helpers/unique-array";
import { useAppContext } from "../../context/app-context";

// dispatch({type:"filter",payload:{
//     by:region,
//      which:region
// }})

interface AppStringData {
  [key: string]: string; // Replace 'any' with the appropriate type of your data
}
const Filter = () => {
  const [filtering, setFiltering] = useState(false);
  const [chooseFilter, setChooseFilter] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [filterArray, setFilterArray] = useState([""]);
  const [filterWith, setFilterWith] = useState("");
  const [isFilterDone, setIsFilterDone] = useState(false);
  const { state, handleDispatch } = useAppContext();
  const darkMode = state.appData.isDark;

  const handleMethodSelection = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const type = target.dataset.type;
    if (type) {
      setFilterBy(type);
      setChooseFilter(true);
    }
  };

  const handleSetMethod = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const method = target.dataset.method;
    if (method) {
      setFilterWith(method);
      setIsFilterDone(true);
    }
  };

  const AppData = state.appData.fluidData;
  useEffect(() => {
    switch (filterBy.toLowerCase()) {
      case "population":
        setFilterArray([
          "0 - 10000",
          " 10000 -  100000",
          " 100000 -  1000000",
          " 1000000 -  10000000",
          "100000000 -  1000000000",
          "1000000000 - "
        ]);
        break;

      case "region":
        const numArr: Array<AppStringData> = Object.values(AppData);
        const newArr = numArr.map((arr) => arr[filterBy]);
        const arr = [...newArr];
        const uniqueArr = findUniqueStrings(arr).slice();

        setFilterArray(uniqueArr);

        break;
      case "sovereignty":
        setFilterArray(["independent", "dependent"]);
        break;

      case "area":
        setFilterArray([
          "0 - 1000",
          " 1000 -  10000",
          " 10000 -  100000",
          " 100000 -  1000000",
          "10000000 -  100000000",
          "100000000 - "
        ]);
        break;
    }
  }, [filterBy]);
  useEffect(() => {
    if (isFilterDone) {
      handleDispatch({ type: "filter", payload: { filterBy, filterWith } });
      setFiltering(false);
    }
    return () => {
      setIsFilterDone(false);
    };
  }, [isFilterDone]);

  const handleCancel = () => {
    setFilterBy("");
    setFilterWith("");
    setIsFilterDone(true);
  };
  const handleBack = () => {
    setFilterBy("");
    setFilterWith("");
    setFiltering(false);
  };
  const handleBackBack = () => {
    setFilterBy("");
    setFilterWith("");
    setChooseFilter(false);
  };
  return (
    <div className="w-full md:w-[50%] md:flex justify-end">
      <div
        className={`m-4 mt-20 sm:mt-4 rounded-lg shadow-lg  p-6 sm:p-4 md:w-[80%]   ${
          darkMode ? "bg-primary-100" : "bg-secondary-100"
        } ${
          filterBy === "" ? "flex justify-between items-center" : "filter-grid"
        }`}
      >
        <div
          onClick={() => {
            setFiltering((val) => !val);
            if (!filtering && chooseFilter) setChooseFilter(false);
          }}
          className={` cursor-pointer filter-grid w-full`}
        >
          <span
            className={`font-body font-semibold  ${
              darkMode ? "text-secondary-200" : "text-primary-300"
            }`}
          >
            Filter by {filterBy ? filterBy : " ..."}{" "}
            {filterWith ? ` ( ${filterWith} ) ` : null}
          </span>
          <span className="sm:ml-10">
            {filtering ? (
              <IconChevronDown
                className={darkMode ? "fill-secondary-200" : "fill-primary-300"}
              />
            ) : (
              <IconChevronUp
                className={darkMode ? "fill-secondary-200" : "fill-primary-300"}
              />
            )}
          </span>
        </div>
        {filterBy !== "" ? (
          <div
            className={`w-full flex items-center justify-end ${
              filterBy === "" ? "hide" : ""
            }`}
          >
            <IconCancel
              onClick={() => handleCancel()}
              className={`${
                darkMode ? "fill-secondary-200" : "fill-primary-300"
              } `}
            />
          </div>
        ) : null}
      </div>
      {/* filter type */}
      {filtering ? (
        <div>
          {!chooseFilter ? (
            <div
              className={`relative m-4 rounded-lg shadow-lg cursor-pointer flex items-start justify-between p-6 sm:p-4  ${
                darkMode ? "bg-primary-100" : "bg-secondary-100"
              }`}
            >
              <div className=" absolute right-0 top-0 m-6">
                <IconCancel
                  onClick={() => handleBack()}
                  className={
                    darkMode ? "fill-secondary-200" : "fill-primary-300"
                  }
                />
              </div>
              <ul
                className={` flex flex-col items-start justify-center   ${
                  darkMode ? "bg-primary-100" : "bg-secondary-100"
                }`}
              >
                <li
                  onClick={handleMethodSelection}
                  data-type="region"
                  className={`item ${
                    darkMode
                      ? "text-secondary-200 hover:bg-secondary-200 hover:text-primary-200"
                      : "text-primary-200 hover:bg-primary-100 hover:text-secondary-200"
                  }`}
                >
                  region
                </li>
                <li
                  onClick={handleMethodSelection}
                  data-type="population"
                  className={`item ${
                    darkMode
                      ? "text-secondary-200 hover:bg-secondary-200 hover:text-primary-200"
                      : "text-primary-200 hover:bg-primary-100 hover:text-secondary-200"
                  }`}
                >
                  population
                </li>
                <li
                  onClick={handleMethodSelection}
                  data-type="sovereignty"
                  className={`item ${
                    darkMode
                      ? "text-secondary-200 hover:bg-secondary-200 hover:text-primary-200"
                      : "text-primary-200 hover:bg-primary-100 hover:text-secondary-200"
                  }`}
                >
                  sovereignty
                </li>
                <li
                  onClick={handleMethodSelection}
                  data-type="area"
                  className={`item ${
                    darkMode
                      ? "text-secondary-200 hover:bg-secondary-200 hover:text-primary-200"
                      : "text-primary-200 hover:bg-primary-100 hover:text-secondary-200"
                  }`}
                >
                  Land Area
                </li>
              </ul>
            </div>
          ) : (
            <div
              className={`relative m-4 rounded-lg shadow-lg cursor-pointer flex items-start justify-between p-6 sm:p-4 ${
                darkMode ? "bg-primary-100" : "bg-secondary-100"
              }`}
            >
              <div className=" absolute right-0 top-0 m-6">
                <IconCancel
                  onClick={() => handleBackBack()}
                  className={
                    darkMode ? "fill-secondary-200" : "fill-primary-300"
                  }
                />
              </div>
              <ul>
                {filterArray.map((item, index) => (
                  <li
                    data-method={item}
                    onClick={handleSetMethod}
                    className={`item ${
                      darkMode
                        ? "text-secondary-200 hover:bg-secondary-200 hover:text-primary-200"
                        : "text-primary-200 hover:bg-primary-100 hover:text-secondary-200"
                    }`}
                    key={index}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : null}
      {/* filther methods */}
      {/* i need to filter the state an get unique instances of the type selected that sets */}
      {/* asia */}
    </div>
  );
};

export default Filter;
// region.
// population,
// soverignty,
// area
