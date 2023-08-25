import { useEffect, useState } from "react";

import CountryItem from "../country-item/country-item";
import { CountryItemType } from "../../utils/types/countryData";
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
      {error === null ? (
        <ul className="sm:grid gap-10 sm:grid-cols-2 md:grid-cols-3 justify-stretch lg:grid-cols-4 md:grid-flow-row md">
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
