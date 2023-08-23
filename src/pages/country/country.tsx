import { useNavigate, useParams } from "react-router-dom";

import { CountryItemType } from "../../interface/countryData";
import Header from "../../components/header/header";
import { IconArrowLeft } from "../../components/icons";
import { LanguageType } from "../../interface/language";
import { Link } from "react-router-dom";
import { Response } from "../../interface/response";
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

  // console.log(code);

  useEffect(() => {
    setIsLoader(true);
    // if (!code) return;
    // console.log("starting");

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
        // console.log(countryData[0]);

        setCountryDetails(countryData[0]);
        // setCountryDetails([...countryData]);

        if (response.status === 200) {
          setIsLoader(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCountryData();

    // return () => {
    //   controller.abort();
    // };
  }, [code]);
  // console.log(countryDetails);

  // if (Object.keys(countryDetails).length === 0) ;

  const getBorderNames = (arg: string[]) => {
    if (!arg) return [];
    const countriesData: Array<CountryItemType> = Object.values(
      state.appData.data
    );
    const borderNames = countriesData.filter((country) =>
      arg.includes(country.alpha3Code)
    );
    // console.log(borderNames);

    return borderNames;
  };

  const {
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
  // console.log(nativeName);

  let borderNames: { name: string; alpha3Code: string }[] = [];

  if (borders) {
    const fetchBorder = getBorderNames(borders);
    // console.log(fetchBorder);
    for (let count = 0; count < fetchBorder.length; count++) {
      const border = fetchBorder.at(count)?.name;

      const code = fetchBorder.at(count)?.alpha3Code;
      if (border && code) borderNames.push({ name: border, alpha3Code: code });
    }
  }
  // console.log(borderNames);

  return (
    <div>
      <Header />
      <div>
        <button type="button" onClick={() => navigate(-1)}>
          <span>
            <IconArrowLeft />
          </span>
          <span>&nbsp;back</span>
        </button>
      </div>
      <div>
        {isLoader ? null : (
          <div>
            <div>
              <img src={flag} alt={name} />
            </div>
            <div>
              <span>{name}</span>
            </div>
            <div>
              <p>
                <span>Native name:&nbsp; &nbsp;</span>
                <span>{nativeName}</span>
              </p>
              <p>
                <span>Population:&nbsp; &nbsp;</span>
                <span>{population?.toLocaleString()}</span>
              </p>
              <p>
                <span>Region:&nbsp; &nbsp;</span>
                <span>{region}</span>
              </p>
              <p>
                <span>Sub region:&nbsp; &nbsp;</span>
                <span>{subregion}</span>
              </p>
              <p>
                <span>Capital:&nbsp; &nbsp;</span>
                <span>{capital}</span>
              </p>
            </div>
            <div>
              <div className="flex">
                <span>Top level domains:&nbsp; &nbsp;</span>
                <div>
                  {topLevelDomain?.map((domain: string, index) => {
                    return <span key={index}>{domain}</span>;
                  })}
                </div>
              </div>
              <div className="flex">
                <span>Currencies:&nbsp; &nbsp;</span>
                <div>
                  {currencies?.map((currency, index) => {
                    return <span key={index}>{currency.name}</span>;
                  })}
                </div>
              </div>
              <div className="flex">
                <span>Languages:&nbsp; &nbsp;</span>
                <div>
                  {languages?.map((language, index) => {
                    return (
                      <span key={index} className="ml-4">
                        {language.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <span>Border Countries:&nbsp; &nbsp;</span>
              <div>
                {borderNames.map((border, index) => {
                  return (
                    <Link to={`/${border.alpha3Code}`}>
                      <span key={index} className="ml-4">
                        {border.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Country;
