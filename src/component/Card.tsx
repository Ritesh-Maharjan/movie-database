import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ApiResponse } from "../assets/type/types";
import clipAndReplace from "../utils/clipAndReplace";
import { Link } from "react-router-dom";

// Will recieve a single movie with type of ApiResponse
const Card: React.FC<{ movie: ApiResponse }> = ({ movie }) => {
  // to display whether the movies are added to favorite or not
  const [added, setAdded] = useState<string>("");

  useEffect(() => {
    // getting the favorite from localstorage if its saved and storing in our state
    let temp = localStorage.getItem(`${movie.id}`);
    temp ? setAdded(temp) : setAdded("");
  }, []);

  // handling the add and remove of localstorage for favorite movies
  const add = () => {
    let temp = localStorage.getItem(`${movie.id}`);
    if (temp) {
      localStorage.removeItem(`${movie.id}`);
      setAdded("");
    } else {
      localStorage.setItem(`${movie.id}`, JSON.stringify(movie));
      setAdded("true");
    }
  };
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="relative w-40 min-w-40 sm:min-w-52 "
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ backgroundColor: "rgba(0,0,0, 0.8)", opacity: 1 }}
        className="absolute h-full w-full top-0 flex flex-col items-center justify-center gap-4 p-2 rounded-lg"
      >
        <h4 className="sm:text-2xl">
          {clipAndReplace(movie.original_title, 10)}
        </h4>
        <div className="flex gap-6 text-xs justify-end w-full sm:text-base">
          <span> {movie.vote_average.toFixed(1)}&#127871;</span>
        </div>
        <p className="text-xs sm:text-base">
          {clipAndReplace(movie.overview, 140)}{" "}
        </p>
        <div className="flex w-full justify-center gap-4">
          <button
            className={` ${
              added ? "bg-red-900" : "bg-green-600"
            } bg-opacity-90 text-xs px-2 py-1 rounded-md hover:scale-105 sm:px-4 sm:text-base`}
            onClick={add}
          >
            {added ? "Remove" : "Add"}
          </button>
          <Link to={`details/${movie.id}`} className="bg-blue-500 text-xs px-2 py-1 rounded-md hover:scale-105 sm:px-4 sm:text-base">
            Details
          </Link>
        </div>
      </motion.div>

      <img
        draggable="false"
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        className="rounded-lg"
      />
    </motion.div>
  );
};

export default Card;
