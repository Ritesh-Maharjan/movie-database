import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { ApiResponse } from "../utils/type/types";
import clipAndReplace from "../utils/clipAndReplace";
import NotFoundImg from "../assets/images/notfound.jpg";
import changeDateFormat from "../utils/DateFormat";

// Will recieve a single movie with type of ApiResponse
const Card: React.FC<{ movie: ApiResponse }> = ({ movie }) => {
  // to display whether the movies are added to favorite or not
  const [added, setAdded] = useState<string>("");
  const [isTapped, setIsTapped] = useState<boolean>(false);
  const controls = useAnimation();

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

  const handleTap = () => {
    if (isTapped) {
      controls.start({ opacity: 1 });
    } else {
      controls.start({ opacity: 0 });
    }
    setIsTapped(!isTapped);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="relative w-40 min-w-40 sm:min-w-52 "
    >
      <motion.div
        initial={{ backgroundColor: "rgba(0,0,0, 0.8)", opacity: 0 }}
        whileHover={{ opacity: 1 }}
        onTap={handleTap}
        animate={controls}
        className="absolute h-full w-full top-0 flex flex-col items-center justify-center gap-4 p-2 rounded-lg"
      >
        <h4 className="sm:text-2xl">
          {clipAndReplace(movie.original_title, 10)}
        </h4>
        <div className="flex text-xs justify-between w-full sm:text-base">
          <span>{changeDateFormat(movie.release_date)}</span>
          <span>{movie.vote_average.toFixed(1)}&#127871;</span>
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
          <Link
            to={`/details/${movie.id}`}
            className="bg-blue-500 text-xs px-2 py-1 rounded-md hover:scale-105 sm:px-4 sm:text-base"
          >
            Details
          </Link>
        </div>
      </motion.div>

      <img
        draggable="false"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}`
            : NotFoundImg
        }
        alt={movie.poster_path ? movie.original_title : "Not found image"}
        className="min-h-80 w-full rounded-lg object-cover"
        loading="lazy"
      />
    </motion.div>
  );
};

export default Card;
