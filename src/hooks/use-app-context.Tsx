import { AppContext } from "../context/app-context";
import { useContext } from "react";

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error("AppContext used Outside of its provider");
  return context;
};

export { useAppContext };
