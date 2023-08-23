import { IconSearch } from "../icons";
import useAppContext from "../../hooks/use-app-context";
import { useState } from "react";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const { state } = useAppContext();
  const darkMode = state.appData.isDark;

  return (
    <div
      className={` relative rounded-lg shadow-md border-primary-100 m-4 px-10 py-4 flex items-center justify-between ${
        darkMode ? "bg-primary-100" : " bg-secondary-100"
      }`}
    >
      <span className="mr-4 ">
        <IconSearch
          className={`${darkMode ? "fill-secondary-200" : " fill-primary-100"}`}
        />
      </span>
      <label
        htmlFor="search"
        className="absolute top-[30%] left-[25%] transform translate-[-50%] text-secondary-300 text-opacity-50 font-body font-semibold text-sm text-ellipsis md:text-lg"
      >
        Search for a country
      </label>
      <input
        className="border-none outline-none bg-transparent w-full"
        type="search"
        value={searchInput}
        id="search"
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  );
};

export default Search;
