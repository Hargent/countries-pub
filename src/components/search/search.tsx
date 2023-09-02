import { useEffect, useState } from "react";

import { IconSearch } from "../icons/icons";
import { useAppContext } from "../../context/app-context";

const Search = () => {
  const { state, handleDispatch } = useAppContext();
  const darkMode = state.appData.isDark;
  const [searchInput, setSearchInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    handleDispatch({ type: "searching", payload: { searchInput } });
  }, [searchInput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;
    const hasMoreThanThreeSpaces = newInputValue.includes("   "); // Three consecutive spaces

    if (hasMoreThanThreeSpaces) {
      setErrorMessage("Input cannot have more than 3 consecutive spaces");
      setSearchInput(newInputValue.replace(/ {3,}/g, "   ")); // Replace with three spaces
    } else {
      setErrorMessage("");
      setSearchInput(newInputValue);
    }
  };
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
        {errorMessage !== "" ? errorMessage : "Search for a country"}
      </label>
      <input
        className={`border-none outline-none bg-transparent w-full ${
          darkMode
            ? "bg-primary-100 text-secondary-200"
            : " bg-secondary-100 text-primary-200"
        }`}
        type="search"
        value={searchInput}
        id="search"
        spellCheck
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
