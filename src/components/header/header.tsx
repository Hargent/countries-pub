import { IconMoonFill, IconSun } from "../icons";
import { useEffect, useState } from "react";

import useAppContext from "../../hooks/use-app-context";

const Header = () => {
  const { state, handleDispatch } = useAppContext();

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    handleDispatch({ type: "switch-mode", payload: {} });
  }, [darkMode]);
  const stateDarkMode = state.appData.isDark;
  return (
    <div
      className={`w-full flex shadow-md items-center justify-between py-12 px-6 md:px-12 md:py-8 ${
        stateDarkMode ? "bg-primary-100 " : "bg-secondary-100"
      }`}
    >
      <h1
        className={`font-body text-md md:text-2xl font-extrabold ${
          stateDarkMode ? "text-secondary-100" : "text-primary-300"
        } `}
      >
        Where in the world?
      </h1>
      <div className="flex justify-between items-center">
        <span
          onClick={() => setDarkMode((val) => !val)}
          className="cursor-pointer"
        >
          {stateDarkMode ? <IconMoonFill /> : <IconSun />}
        </span>
        <span
          className={`ml-2 md:ml-6 ${
            stateDarkMode ? "text-secondary-100" : "text-primary-300"
          }`}
        >
          {stateDarkMode ? "Dark Mode" : "Light Mode"}
        </span>
      </div>
    </div>
  );
};

export default Header;
