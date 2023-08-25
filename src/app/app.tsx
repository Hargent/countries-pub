import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Country from "../pages/country/country";
import Home from "../pages/home/home";
import { Response } from "../utils/types/response";
import axios from "axios";
import useAppContext from "../hooks/use-app-context";

const App: React.FC = () => {
  const [isLoader, setIsLoader] = useState(false);

  const { state, handleDispatch } = useAppContext();

  useEffect(() => {
    if (Object.values(state.appData.data).length !== 0) return;

    setIsLoader(true);
    const controller = new AbortController();
    const getCountryData = async () => {
      try {
        const response: Response = await axios.get(
          "http://localhost:8080/countries",
          { signal: controller.signal }
        );

        handleDispatch({ type: "save-data", payload: response.data });
        setIsLoader(false);
      } catch (err) {
        console.log(err);
      }
    };
    getCountryData();

    return () => {
      controller.abort();
    };
  }, []);

  const darkMode = state.appData.isDark;
  return (
    <div
      className={`h-[100vh]${
        darkMode ? "bg-primary-100 " : "bg-secondary-100"
      }`}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home isLoader={isLoader} />}></Route>
          <Route path="/:code" element={<Country />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
