import { useNavigate, useParams } from "react-router-dom";

import { CountryItemType } from "../../utils/types/countryData";
import Header from "../../components/header/header";
import { IconArrowLeft } from "../../components/icons/icons";
import { Link } from "react-router-dom";
import { Response } from "../../utils/types/response";
import Spinner from "../../components/spinner/spinner";
import axios from "axios";
import useAppContext from "../../hooks/use-app-context";
import { useEffect } from "react";
import { useState } from "react";

const Country = () => {
  const { code } = useParams();
  const [isLoader, setIsLoader] = useState(false);
  const [countryDetails, setCountryDetails] = useState({} as CountryItemType);

  const navigate = useNavigate();
  const { state } = useAppContext();
  const darkMode = state.appData.isDark;

  useEffect(() => {
    setIsLoader(true);

    const controller = new AbortController();
    const getCountryData = async () => {
      try {
        const response: Response = await axios.get(
          "http://localhost:8080/countries",
          { signal: controller.signal }
        );

        const countryData = [...response.data].filter(
          (res) => res.alpha3Code === code
        );

        setCountryDetails(countryData[0]);
        // setCountryDetails([...countryData]);

        if (response.status === 200) {
          setIsLoader(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getCountryData();
  }, [code]);

  const getBorderNames = (arg: string[]) => {
    if (!arg) return [];
    const countriesData: Array<CountryItemType> = Object.values(
      state.appData.data
    );
    const borderNames = countriesData.filter((country) =>
      arg.includes(country.alpha3Code)
    );

    return borderNames;
  };

  const {
    flags,
    flag,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders
  } = countryDetails;

  let borderNames: { name: string; alpha3Code: string }[] = [];

  if (borders) {
    const fetchBorder = getBorderNames(borders);

    for (let count = 0; count < fetchBorder.length; count++) {
      const border = fetchBorder.at(count)?.name;

      const code = fetchBorder.at(count)?.alpha3Code;
      if (border && code) borderNames.push({ name: border, alpha3Code: code });
    }
  }

  return (
    <div>
      <Header />
      <div
        className={`p-6 pb-0 ${
          darkMode ? "bg-primary-200" : " bg-secondary-200"
        }`}
      >
        <div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`mb-16 mt-4 capitalize px-4 py-1 flex justify-between items-center font-body font-medium text-xs ${
              darkMode
                ? "bg-primary-100 text-secondary-300"
                : " bg-secondary-100 text-primary-100"
            }`}
          >
            <span>
              <IconArrowLeft
                className={`mr-2 ${
                  darkMode ? "fill-secondary-100" : " fill-primary-100"
                }`}
              />
            </span>
            <span>&nbsp;back</span>
          </button>
        </div>

        <div
          className={`w-full min-h-[100vh] flex items-start  justify-between  flex-col margin-bottom ${
            darkMode ? "text-secondary-200" : " text-primary-200"
          }`}
        >
          {isLoader ? (
            <Spinner />
          ) : (
            <>
              <div>
                <img
                  src={flags?.png ? flags.png : flags?.svg ? flags.svg : flag}
                  alt={name}
                />
              </div>
              <div className="flex flex-col justify-between items-start">
                <span className="font-body font-bold text-xl mb-8">{name}</span>{" "}
                <div className="h-full flex flex-col items-start justify-between ">
                  <p>
                    <span
                      className={`font-body font-bold text-xs capitalize ${
                        darkMode ? "text-secondary-200" : "text-primary-300"
                      }`}
                    >
                      Native name:&nbsp; &nbsp;
                    </span>
                    <span className={`text-xs`}>{nativeName}</span>
                  </p>
                  <p>
                    <span
                      className={`font-body font-bold text-xs capitalize ${
                        darkMode ? "text-secondary-200" : "text-primary-300"
                      }`}
                    >
                      Population:&nbsp; &nbsp;
                    </span>
                    <span className={`text-xs`}>
                      {population?.toLocaleString()}
                    </span>
                  </p>
                  <p>
                    <span
                      className={`font-body font-bold text-xs capitalize ${
                        darkMode ? "text-secondary-200" : "text-primary-300"
                      }`}
                    >
                      Region:&nbsp; &nbsp;
                    </span>
                    <span className={`text-xs`}>{region}</span>
                  </p>
                  <p>
                    <span
                      className={`font-body font-bold text-xs capitalize ${
                        darkMode ? "text-secondary-200" : "text-primary-300"
                      }`}
                    >
                      Sub region:&nbsp; &nbsp;
                    </span>
                    <span className={`text-xs`}>{subregion}</span>
                  </p>
                  <p>
                    <span
                      className={`font-body font-bold text-xs capitalize ${
                        darkMode ? "text-secondary-200" : "text-primary-300"
                      }`}
                    >
                      Capital:&nbsp; &nbsp;
                    </span>
                    <span className={`text-xs`}>{capital}</span>
                  </p>
                </div>
              </div>
              <div className="h-full flex flex-col items-start justify-start font-body">
                <div
                  className={` mb-8 flex flex-col items-start justify-between`}
                >
                  <div className="flex items-center">
                    <span className={` font-bold text-xs`}>
                      Top level domains:&nbsp; &nbsp;
                    </span>
                    <div>
                      {topLevelDomain?.map((domain: string, index) => {
                        return (
                          <span
                            key={`${domain}-${index}`}
                            className={`text-xs`}
                          >
                            {domain}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-baseline">
                    <span className={` font-bold text-xs`}>
                      Currencies:&nbsp; &nbsp;
                    </span>
                    <div>
                      {currencies?.map((currency) => {
                        return (
                          <span key={currency.code} className={`text-xs`}>
                            {currency.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-baseline">
                    <span className={` font-bold text-xs flex items-center`}>
                      Languages:&nbsp; &nbsp;
                    </span>
                    <div>
                      {languages?.map((language, index) => {
                        return (
                          <span key={language.nativeName} className={`text-xs`}>
                            {language.name}
                            {index < languages?.length ? ", " : null}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className={`flex flex-col items-start justify-start`}>
                  <span
                    className={` font-body font-bold text-sm ${
                      darkMode ? "text-secondary-200" : " text-primary-300"
                    }`}
                  >
                    Border Countries:&nbsp; &nbsp;
                  </span>
                  <div
                    className={`my-2 flex items-center justify-start bg-red flex-wrap margin-right`}
                  >
                    {borderNames.map((border) => {
                      return (
                        <Link
                          className={`px-2 py-0.5 shadow-lg font-body font-medium text-xs mb-4 rounded-sm ${
                            darkMode ? " bg-primary-100" : "bg-secondary-100"
                          }`}
                          to={`/${border.alpha3Code}`}
                          key={border.alpha3Code}
                        >
                          <span className="text-xs p-1.5">{border.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Country;
