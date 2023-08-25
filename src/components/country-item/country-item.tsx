import { CountryPropType } from "../../utils/types/countryData";
import { Link } from "react-router-dom";
import useAppContext from "../../hooks/use-app-context";

const CountryItem = (props: CountryPropType) => {
  const { state } = useAppContext();
  const darkMode = state.appData.isDark;
  const { name, population, region, capital, flags, alpha3Code, flag } =
    props.countryData;

  return (
    <li>
      <Link to={`${alpha3Code}`} className="flex h-full">
        <div
          className={`grid grid-rows-2 mb-10 shadow-lg rounded-lg overflow-hidden ${
            darkMode ? "bg-primary-100" : " bg-secondary-100"
          }`}
        >
          <div className="bg-red">
            <img
              src={flags.png ? flags.png : flags.svg ? flags.svg : flag}
              alt={name}
              className=" h-full w-full justify-self-start rounded-t-lg self-start"
            />
          </div>

          <div className="px-6 py-7">
            <h1
              className={`mb-6 font-body font-bold text-primary-300 capitalize text-3xl ${
                darkMode ? " text-secondary-200" : " text-primary-200"
              }`}
            >
              {name}
            </h1>
            <p className="font-body mb-2 text-primary-100 text-md">
              <span
                className={` capitalize font-semibold text-lg  ${
                  darkMode ? " text-secondary-200" : " text-primary-200"
                }`}
              >
                population:
              </span>
              &nbsp;&nbsp;
              <span
                className={` font-body font-medium text-lg
                  ${darkMode ? " text-secondary-100" : "text-primary-300"}`}
              >
                {population.toLocaleString()}
              </span>
            </p>
            <p className="font-body mb-2 text-primary-100 text-x">
              <span
                className={` capitalize font-semibold text-lg
                  ${darkMode ? " text-secondary-200" : " text-primary-200"}`}
              >
                region:
              </span>
              &nbsp;&nbsp;
              <span
                className={` font-body font-medium text-lg
                  ${darkMode ? " text-secondary-100" : "text-primary-300"}`}
              >
                {region}
              </span>
            </p>
            <p className="font-body mb-2 text-primary-100 text-x">
              <span
                className={` capitalize font-semibold text-lg
                  ${darkMode ? " text-secondary-200" : " text-primary-200"}`}
              >
                capital:
              </span>
              &nbsp;&nbsp;
              <span
                className={` font-body font-medium text-lg
                  ${darkMode ? " text-secondary-100" : "text-primary-300"}`}
              >
                {capital}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default CountryItem;
