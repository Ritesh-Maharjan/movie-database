import { useEffect, useState } from "react";
import { ApiResponse } from "../utils/type/types";
import Card from "../component/Card";
import { Link } from "react-router-dom";
import { TITLE } from "../global";

const Favourite = () => {
  const [favouriteMovie, setFavouriteMovie] = useState<ApiResponse[]>([]);

  useEffect(() => {
    document.title = `${TITLE} - Favourite`;
    // Get all keys from local storage
    const allKeys = Object.keys(localStorage);

    // looping through all the data from local storage and using it
    let getMovie = allKeys.map((localStorageItem) => {
      let movie = localStorage.getItem(localStorageItem);
      if (movie !== null) {
        return JSON.parse(movie);
      }
    });
    setFavouriteMovie(getMovie);
  }, []);

  return (
    <main className=" min-h-[90vh] flex flex-col">
      <h1 className="text-center text-4xl sm:text-6xl"> Favourites</h1>

      {favouriteMovie.length > 0 ? (
        <section className="flex gap-6 my-10 flex-wrap justify-center ">
          {favouriteMovie.map((el) => (
            <Card key={el.id} movie={el} />
          ))}
        </section>
      ) : (
        <section className="flex flex-1 flex-col items-center justify-center w-full min-h-full">
          <h3 className="text-xl text-center sm:text-4xl">
            No Favourites Found
          </h3>
          <p className="text-sm my-4 text-center sm:text-2xl">
            You currently do not have any favourites. Please click{" "}
            <Link to="/" className="text-blue-500">
              here
            </Link>{" "}
            to go browse the movies and add to homepage.
          </p>
        </section>
      )}
    </main>
  );
};

export default Favourite;
