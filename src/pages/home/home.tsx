import CountryList from "../../components/country-list/country-list";
import Filter from "../../components/filter/filter";
import Header from "../../components/header/header";
import Search from "../../components/search/search";
import Spinner from "../../components/spinner/spinner";
import useAppContext from "../../hooks/use-app-context";

type Props = {
  isLoader: boolean;
};

function Home({ isLoader }: Props) {
  const { state } = useAppContext();
  const darkMode = state.appData.isDark;
  // console.log(darkMode);
  return (
    <div className={darkMode ? "bg-primary-200 " : "bg-secondary-200"}>
      <Header />
      <div className="mx-4 sm:mx-none sm:flex flex-column sm:flex-row sm:justify-between sm:items-start sm:mt-6">
        <Search />
        <Filter />
      </div>

      <div className="w-[80%] m-auto mt-20">
        {isLoader ? <Spinner /> : <CountryList />}
      </div>
    </div>
  );
}

export default Home;
