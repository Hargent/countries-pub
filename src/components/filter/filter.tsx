import { IconChevronDown, IconChevronUp } from "../icons";
import { useEffect, useState } from "react";

import findUniqueStrings from "../../helpers/unique-array";
import useAppContext from "../../hooks/use-app-context";

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
  const AppData = state.appData.data;
  useEffect(() => {
    // console.log(dataArr);

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
        // console.log(uniqueArr);

        break;
      case "independent":
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

    // console.log(newArr);
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

  return (
    <div>
      <div
        onClick={() => {
          setFiltering((val) => !val);
          if (!filtering && chooseFilter) setChooseFilter(false);
        }}
        className={`m-4 mt-20 sm:mt-4 rounded-lg shadow-lg cursor-pointer flex items-center justify-between p-6 sm:p-4  ${
          darkMode ? "bg-primary-100" : "bg-secondary-100"
        }`}
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
      {/* filter type */}
      <div>
        {filtering ? (
          !chooseFilter ? (
            <div
              className={`m-4 rounded-lg shadow-lg cursor-pointer flex items-start justify-between p-6 sm:p-4  ${
                darkMode ? "bg-primary-100" : "bg-secondary-100"
              }`}
            >
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
                  data-type="independent"
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
              className={`m-4 rounded-lg shadow-lg cursor-pointer flex items-start justify-between p-6 sm:p-4  ${
                darkMode ? "bg-primary-100" : "bg-secondary-100"
              }`}
            >
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
          )
        ) : null}
      </div>
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
