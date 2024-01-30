import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { DetailsApiResponse } from "../assets/type/types";
import changeDateFormat from "../utils/DateFormat";
import notFoundImg from "../assets/images/notfound.jpg";

const Details = () => {
  const { id } = useParams();
  // getting the base url and apikey from our env files
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const imgUrl = import.meta.env.VITE_IMG_BASE_URL;
  // setting option method to call the api
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  //   stroing the movie
  const [movie, SetMovie] = useState<DetailsApiResponse>();
  // added to favorites or not
  const [added, setAdded] = useState<string>("");

  useEffect(() => {
    // getting the favorite from localstorage if its saved and storing in our state
    let temp = localStorage.getItem(`${id}`);
    temp ? setAdded(temp) : setAdded("");

    const getMovie = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/3/movie/${id}?append_to_response=videos,genre,similar,credits&sort_by=credits`,
          options
        );
        console.log(response.data);
        SetMovie(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getMovie();
  }, [id]);

  const toggleFavorite = () => {
    let temp = localStorage.getItem(`${id}`);
    if (temp) {
      localStorage.removeItem(`${id}`);
      setAdded("");
    } else {
      localStorage.setItem(`${id}`, JSON.stringify(movie));
      setAdded("true");
    }
  };

  return (
    <main className=" w-screen">
      <section>
        {/* movie hero image */}
        {movie?.backdrop_path ? (
          <figure className="hidden sm:block relative overflow-hidden  max-h-screen">
            <img
              src={`${imgUrl}${movie?.backdrop_path}`}
              alt={movie?.original_title}
              className="h-full object-cover"
            />
            {/* For the shadow effect inside the image corners */}
            <div
              className="absolute top-0 bottom-0 left-0 right-0"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.7) 16px 9px 115px 115px inset",
              }}
            ></div>
          </figure>
        ) : (
          <div
            className="hidden sm:block relative overflow-hidden min-h-screen"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.7) 16px 9px 115px 115px inset",
            }}
          ></div>
        )}

        {/* movie image/video */}
        <article className="relative flex flex-col gap-2 p-4 items-center max-w-7xl mx-auto overflow-hidden sm:-mt-80 sm:flex-row sm:gap-14">
          <figure className="max-w-72">
            <img
              src={`${imgUrl}${movie?.poster_path}`}
              alt={`${movie?.original_title} poster`}
              className="rounded-xl"
            />
          </figure>

          <iframe
            src={`https://www.youtube.com/embed/${movie?.videos.results[0]?.key}`}
            className="hidden sm:block w-full min-h-[432px] rounded-xl"
            allowFullScreen={true}
          ></iframe>
        </article>

        {/* movie details */}
        <article className="max-w-4xl mx-4 flex gap-1 flex-col p-4 bg-slate-700 rounded-lg sm:mt-8 md:gap-4 md:mx-auto ">
          <div className="flex justify-between ">
            <h3 className=" flex items-center gap-2 justify-center text-base sm:text-2xl">
              {movie?.original_title}
              {added ? (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer stroke-green-500"
                  whileHover={{ scale: 1.4 }}
                  onClick={toggleFavorite}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer stroke-red-600 "
                  whileHover={{ scale: 1.4 }}
                  onClick={toggleFavorite}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </motion.svg>
              )}
            </h3>
            <span>{movie?.vote_average.toFixed(1)}&#127871;</span>
          </div>
          <span className="text-lg">
            {changeDateFormat(movie?.release_date)}
          </span>
          <div>
            {movie?.genres.map((el) => {
              return (
                <span
                  key={el.id}
                  className="mr-2 rounded-full italic underline"
                >
                  {el.name}
                </span>
              );
            })}
          </div>
          <p className="text-lg">{movie?.overview}</p>
        </article>

        {/* movie actors */}
        <h2 className="m-8 text-2xl md:text-4xl">Top Billed Casts</h2>
        <article className="flex flex-wrap justify-center items-center mt-8 gap-4 overflow-hidden">
          {movie?.credits.cast.map(
            (credit, index) =>
              index < 8 && (
                <figure className="relative">
                  <img
                    src={
                      credit.profile_path
                        ? `${imgUrl}${credit.profile_path}`
                        : notFoundImg
                    }
                    className="w-40 min-w-40 sm:min-w-52 h-[312px] object-cover"
                  />
                  <figcaption className="absolute bottom-0 w-full bg-black/80 p-2 sm:p-4">
                    <span className="text-sm sm:text-xl">{credit.name}</span>
                    <br />
                    <span className="text-sm sm:text-xl">
                      {credit.character}
                    </span>
                  </figcaption>
                </figure>
              )
          )}
        </article>
      </section>
    </main>
  );
};

export default Details;
