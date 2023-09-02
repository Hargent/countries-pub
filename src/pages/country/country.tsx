import { useNavigate, useParams } from "react-router-dom";

import { CountryItemType } from "../../utils/types/countryData";
import Header from "../../components/header/header";
import { IconArrowLeft } from "../../components/icons/icons";
import { Link } from "react-router-dom";
import { Response } from "../../utils/types/response";
import Spinner from "../../components/spinner/spinner";
import axios from "axios";

import { useEffect } from "react";
import { useState } from "react";
import { useAppContext } from "../../context/app-context";

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
    <div className={`sm:grid sm:grid-rows-container sm:gap-6 `}>
      <div className={` `}>
        <Header />
      </div>
      <div className={` px-8 md:px-12  xl:w-full xl:px-12  mt-12 xl:mt-4`}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={`  px-6 py-1 rounded-sm sm:rounded-md ${
            darkMode
              ? "bg-primary-100 shadow-dark text-secondary-100 "
              : "bg-secondary-100 shadow-light text-primary-200"
          }`}
        >
          <div className="flex w-full items-center justify-start margin-right">
            <span>
              <IconArrowLeft />
            </span>
            <span>&nbsp;back</span>
          </div>
        </button>
      </div>
      <div className={``}>
        {isLoader ? (
          <Spinner />
        ) : (
          <div
            className={` px-8 sm:px-12  sm:flex sm:items-start lg:items-center xl:items-start sm:justify-between sm:flex-col xl:flex-row  sm:gap-24 py-12  ${
              darkMode
                ? "bg-primary-200 text-secondary-100 "
                : "bg-secondary-200 text-primary-200"
            }`}
          >
            <div className={`xl:w-[40%] sm:w-4/5 lg:w-3/5 mb-6 sm:mb-0`}>
              <img
                className={`sm:w-full`}
                src={flags?.png ? flags.png : flags?.svg ? flags.svg : flag}
                alt={name}
              />
            </div>
            <div
              className={` lg:w-[60%] sm:grid xl:flex xl:flex-col sm:grid-col-2 sm:grid-rows-2 lg:self-center xl:px-12 font-body`}
            >
              <div
                className={`mb-6 font-bold text-3xl sm:w-50%  sm:row-span-1 sm:col-span-1`}
              >
                <span className="sm:mr-10">{name}</span>
              </div>
              <div
                className={` sm:flex   sm:justify-between sm:gap-4 xl:items-center sm:mb-6 sm:row-span-1 sm:col-span-1`}
              >
                <div className={`mb-10 sm:mb-0 sm:mr-10 sm:w-1/2`}>
                  <div className={`margin-bottom`}>
                    <p>
                      <span
                        className={`font-bold ${
                          darkMode
                            ? " text-secondary-100 "
                            : " text-primary-300"
                        }`}
                      >
                        Native name:&nbsp; &nbsp;
                      </span>
                      <span>{nativeName}</span>
                    </p>
                    <p>
                      <span
                        className={`font-bold ${
                          darkMode
                            ? " text-secondary-100 "
                            : " text-primary-300"
                        }`}
                      >
                        Population:&nbsp; &nbsp;
                      </span>
                      <span>{population?.toLocaleString()}</span>
                    </p>
                    <p>
                      <span
                        className={`font-bold ${
                          darkMode
                            ? " text-secondary-100 "
                            : " text-primary-300"
                        }`}
                      >
                        Region:&nbsp; &nbsp;
                      </span>
                      <span>{region}</span>
                    </p>
                    <p>
                      <span
                        className={`font-bold ${
                          darkMode
                            ? " text-secondary-100 "
                            : " text-primary-300"
                        }`}
                      >
                        Sub region:&nbsp; &nbsp;
                      </span>
                      <span>{subregion}</span>
                    </p>
                    <p>
                      <span
                        className={`font-bold ${
                          darkMode
                            ? " text-secondary-100 "
                            : " text-primary-300"
                        }`}
                      >
                        Capital:&nbsp; &nbsp;
                      </span>
                      <span>{capital}</span>
                    </p>
                  </div>
                </div>
                <div className={`mb-10 sm:mb-0  sm:w-1/2`}>
                  <div className={`w-full margin-bottom`}>
                    <div className={` flex`}>
                      <span
                        className={`font-bold ${
                          darkMode
                            ? " text-secondary-100 "
                            : " text-primary-300"
                        }`}
                      >
                        Top level domains:&nbsp; &nbsp;
                      </span>
                      <div>
                        {topLevelDomain?.map((domain: string, index) => {
                          return (
                            <span key={`${domain}-${index}`}>{domain}</span>
                          );
                        })}
                      </div>
                    </div>
                    <div className={` flex`}>
                      <span
                        className={`font-bold ${
                          darkMode
                            ? " text-secondary-100 "
                            : " text-primary-300"
                        }`}
                      >
                        Currencies:&nbsp; &nbsp;
                      </span>
                      <div>
                        {currencies?.map((currency) => {
                          return (
                            <span key={currency.code}>{currency.name}</span>
                          );
                        })}
                      </div>
                    </div>
                    <div className={` flex`}>
                      <span
                        className={`font-bold ${
                          darkMode
                            ? " text-secondary-100 "
                            : " text-primary-300"
                        }`}
                      >
                        Languages:&nbsp; &nbsp;
                      </span>
                      <div>
                        {languages?.map((language, index) => {
                          return (
                            <span key={language.nativeName}>
                              {language.name}
                              {index < languages?.length &&
                              languages.at(index + 1)
                                ? ", "
                                : null}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={` mt-3   sm:flex items-start sm:row-start-2 sm:row-end-3 sm:col-start-2 sm:col-end-3 `}
              >
                <span
                  className={`sm:mr-3  w-1/2 font-bold ${
                    darkMode ? " text-secondary-100 " : " text-primary-300"
                  }`}
                >
                  Border Countries:
                </span>
                <div
                  className={`mt-4 sm:mt-0 flex flex-wrap items-start justify-between w-full`}
                >
                  {borderNames.length === 0
                    ? "No border countries found."
                    : borderNames.map((border) => {
                        return (
                          <Link
                            className={`w-[max-content]  mb-4 mr-4  px-4 py-1 ${
                              darkMode
                                ? "bg-primary-100 shadow-dark text-secondary-200 "
                                : "bg-secondary-100 shadow-light text-primary-100"
                            }`}
                            to={`/${border.alpha3Code}`}
                            key={border.alpha3Code}
                          >
                            <span>{border.name}</span>
                          </Link>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Country;
