import { useAppContext } from "../../hooks/use-app-context";

function Spinner() {
  const { state } = useAppContext();
  const darkMode = state.appData.isDark;
  return (
    <div className="h-full flex items-center justify-center">
      <div
        className={`w-24 h-24 rounded-full animate-rotate mask ${
          darkMode ? "bg-conic-gradient-secondary" : "bg-conic-gradient-primary"
        }`}
      ></div>
    </div>
  );
}

export default Spinner;

// .spinnerContainer {
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .spinner {
//   width: 6rem;
//   height: 6rem;
//   border-radius: 50%;
//   background: conic-gradient(#0000 10%, var(--color-light--2));
//   -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
//   animation: rotate 1.5s infinite linear;
// }
