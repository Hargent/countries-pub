import { CurrencyType } from "./currencies";
import { LanguageType } from "./language";

interface CountryItemType {
  name: string;
  population: number | string;
  region: string;
  capital: string;
  flag: string;
  alpha3Code: string;

  nativeName: string;

  subregion: string;

  topLevelDomain?: string[];
  currencies?: CurrencyType[];
  languages?: LanguageType[];
  borders?: string[];
}
interface CountryPropType {
  countryData: CountryItemType;
}
export type { CountryItemType, CountryPropType };
