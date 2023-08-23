import CountryItem from "../country-item/country-item";
import { CountryItemType } from "../../interface/countryData";
import useAppContext from "../../hooks/use-app-context";

const CountryList = () => {
  const { state } = useAppContext();
  const countriesData: Array<CountryItemType> = Object.values(
    state.appData.data
  );
  //   const darkMode = state.appData.isDark;
  console.log(countriesData);

  return (
    <div>
      <ul className="sm:grid gap-10 sm:grid-cols-2 md:grid-cols-3 justify-stretch lg:grid-cols-4 md:grid-flow-row md">
        {countriesData.map((country) => (
          <CountryItem countryData={country} key={country.name} />
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
