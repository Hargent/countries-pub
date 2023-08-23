import { AxiosHeaders } from "axios";
import { CountryItemType } from "./countryData";

interface Response {
  config: {};
  data: CountryItemType[];
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export type { Response };
