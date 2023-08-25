import { CurrencyType } from "./currencies";
import { LanguageType } from "./languages";

interface CountryItemType {
  name: string;
  population: number | string;
  region: string;
  capital: string;
  flag: string;
  flags: {
    png: string;
    svg: string;
  };
  alpha3Code: string;

  nativeName: string;

  subregion: string;
  independent: boolean;

  topLevelDomain?: string[];
  currencies?: CurrencyType[];
  languages?: LanguageType[];
  borders?: string[];
}
interface CountryPropType {
  countryData: CountryItemType;
}
export type { CountryItemType, CountryPropType };
