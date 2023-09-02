import { useEffect, useState } from "react";

import CountryItem from "../country-item/country-item";
import { CountryItemType } from "../../utils/types/countryData";
import { IconChevronUp } from "../icons/icons";
import useAppContext from "../../hooks/use-app-context";

const CountryList = () => {
  const [countryList, setCountryList] = useState([] as Array<CountryItemType>);
  const { fluidData, error, state } = useAppContext();
  const darkMode = state.appData.isDark;

  useEffect(() => {
    setCountryList(Object.values(fluidData));
  }, [fluidData]);

  return (
    <div>
      <a href="#header">
        <div
          className={`fixed p-6 rounded-full bottom-0 right-0 mr-2 mb-8 translate-[-50%] shadow-2xl  ${
            darkMode
              ? "hover:bg-secondary-200 bg-primary-100  text-secondary-200 hover:text-primary-300"
              : "hover:bg-primary-200 bg-blend-darken bg-secondary-100 text-primary-100 hover:text-secondary-100 "
          }`}
        >
          <IconChevronUp className=" dark:fill-current" />
        </div>
      </a>
      {error === null ? (
        <ul className="sm:grid gap-10 sm:grid-cols-2 sm:grid-flow-row  justify-stretch lg:grid-cols-3 xl:grid-cols-4 md:grid-flow-row md">
          {countryList.map((country) => (
            <CountryItem countryData={country} key={country.name} />
          ))}
        </ul>
      ) : (
        <div
          className={`p-6 rounded-lg font-body font-3xl font-medium text-center text-ellipsis ${
            darkMode
              ? "bg-primary-100 text-secondary-200"
              : " bg-secondary-100 text-primary-200"
          }`}
        >
          <h1>{error}</h1>
        </div>
      )}
    </div>
  );
};

export default CountryList;
