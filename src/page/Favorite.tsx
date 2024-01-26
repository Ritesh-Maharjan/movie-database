import { useEffect, useState } from "react";
import { ApiResponse } from "../assets/type/types";
import Card from "../component/Card";
import { Link } from "react-router-dom";

const Favorite = () => {
  const [favoriteMovie, setFavoriteMovie] = useState<ApiResponse[]>([]);

  useEffect(() => {
    // Get all keys from local storage
    const allKeys = Object.keys(localStorage);

    // looping through all the data from local storage and using it
    let getMovie = allKeys.map((localStorageItem) => {
      let movie = localStorage.getItem(localStorageItem);
      if (movie !== null) {
        return JSON.parse(movie);
      }
    });
    setFavoriteMovie(getMovie);
  }, []);

  return (
    <main className="p-4 min-h-[90vh]">
      <h1 className="text-center text-4xl sm:text-6xl"> Favorites</h1>

      {favoriteMovie.length > 0 ? (
        <section className="flex gap-6 my-10 flex-wrap justify-center ">
          {favoriteMovie.map((el) => (
            <Card movie={el} />
          ))}
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center w-full">
          <h3 className="text-xl text-center sm:text-4xl">
            No Favorites Found
          </h3>
          <p className="text-sm my-4 text-center sm:text-2xl">
            You currently do not have any favorites. Please click{" "}
            <Link to="/" className="text-blue-500">
              {" "}
              here
            </Link>{" "}
            to go browse the movies and add to homepage.
          </p>
        </section>
      )}
    </main>
  );
};

export default Favorite;
