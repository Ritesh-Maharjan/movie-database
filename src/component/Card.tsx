import React from "react";
import { motion } from "framer-motion";
import { ApiResponse } from "../assets/type/types";

// Will recieve a single movie with type of ApiResponse
const Card: React.FC<{ movie: ApiResponse }> = ({ movie }) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} className="relative min-w-40 sm:min-w-52 ">
      <motion.div 
      initial={{opacity:0}}
      whileHover={{opacity:0.5}}
      className="bg-black h-full w-full absolute top-0 flex flex-col-reverse space-between"
      >
        <button>More details</button>
        <button>More details</button>
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
