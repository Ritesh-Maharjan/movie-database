import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Popup = () => {
  const displayPopup = useSelector((state: RootState) => state.popup);

  return (
    <div className={`fixed bottom-5 right-20 z-50 flex flex-col gap-4`}>
      {displayPopup.map((el, index) => {
        return (
          <p
            key={index}
            className={`${
              el.displayStatus === "add" ? "bg-green-500" : "bg-red-700"
            } text-white p-4 rounded-lg font-semibold`}
          >
            {el.displayStatus === "add"
              ? `Added ${el.displayText} sucessfully.`
              : `Removed ${el.displayText} sucessfully.`}
          </p>
        );
      })}
    </div>
  );
};

export default Popup;
