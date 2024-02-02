import { Link } from "react-router-dom";
import { useEffect } from "react";
import { TITLE } from "../global";

const NotFound = () => {
  useEffect(() => {
    document.title = `${TITLE} - NotFound`;
  }, []);

  return (
    <div className="min-h-[90vh] flex items-center flex-col justify-center p-4 text-center gap-2">
      <h1>ERROR 404!! Page Not Found</h1>
      <p>
        Sorry, Can't find the link. Please click{" "}
        <Link to="/" className="text-blue-500">
          {" "}
          here
        </Link>{" "}
        to go back to home.
      </p>
    </div>
  );
};

export default NotFound;
