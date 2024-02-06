import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { DetailsApiResponse } from "../utils/type/types";
import changeDateFormat from "../utils/DateFormat";
import notFoundImg from "../assets/images/notfound.jpg";
import Loading from "../assets/images/loading.gif";
import { TITLE } from "../global";
import Slider from "../component/Slider";
import clipAndReplace from "../utils/clipAndReplace";

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
    document.title = `${TITLE} - Details`;
    // scrolling to the top of the page
    window.scrollTo(0,0);
    // getting the favorite from localstorage if its saved and storing in our state
    let temp = localStorage.getItem(`${id}`);
    temp ? setAdded(temp) : setAdded("");

    const getMovie = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/3/movie/${id}?append_to_response=videos,genre,similar,credits&sort_by=credits`,
          options
        );
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
    <main className="max-w-screen">
      {!movie ? (
        <img className="mx-auto" src={Loading} alt="Loading" />
      ) : (
        <section>
          {/* movie hero image */}
          {movie?.backdrop_path ? (
            <figure className="hidden sm:block relative overflow-hidden max-h-screen">
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
              className="hidden sm:block relative w-full overflow-hidden min-h-screen"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.7) 16px 9px 115px 115px inset",
              }}
            ></div>
          )}

          {/* movie image/video */}
          <article className="relative flex flex-col gap-2 p-4 items-center max-w-7xl mx-auto overflow-hidden sm:-mt-80 sm:flex-row sm:gap-14">
            <figure className="max-w-72 h-full">
              <img
                src={
                  movie?.poster_path
                    ? `${imgUrl}${movie?.poster_path}`
                    : notFoundImg
                }
                alt={`${movie?.original_title} poster`}
                className="rounded-xl min-h-[432px] object-cover"
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
          <article className="overflow-hidden">
            {movie.credits.cast.length > 0 && (
              <Slider title="Cast members">
                {/* movie actors */}
                <div className="flex justify-center items-center mt-8 gap-4">
                  {movie?.credits.cast.map((credit) => (
                    <figure className="relative" key={credit.id}>
                      <img
                        draggable="false"
                        src={
                          credit.profile_path
                            ? `${imgUrl}${credit.profile_path}`
                            : notFoundImg
                        }
                        className="w-40 min-w-40 sm:min-w-52 h-[312px] object-cover"
                      />
                      <figcaption className="absolute bottom-0 w-full bg-black/80 p-2 sm:p-4">
                        <span className="text-sm sm:text-xl">
                          {clipAndReplace(credit.name, 15)}
                        </span>
                        <br />
                        <span className="text-sm sm:text-xl">
                          {clipAndReplace(credit.character, 15)}
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </Slider>
            )}
          </article>

          {/* movie actors */}
          <article className="overflow-hidden">
            {movie.similar.results.length > 0 && (
              <Slider title="Similar Movies">
                {/* movie actors */}
                <div className="flex justify-center items-center mt-8 gap-4">
                  {movie.similar.results.map((el) => (
                    <figure className="relative" key={el.id}>
                      <img
                        draggable="false"
                        src={
                          el.poster_path
                            ? `${imgUrl}${el.poster_path}`
                            : notFoundImg
                        }
                        className="w-40 min-w-40 sm:min-w-52 h-[312px] object-cover"
                      />
                      <figcaption className="absolute top-0 left-0 right-0 bottom-0 opacity-0 hover:opacity-100">
                        <div className="absolute bottom-0 w-full bg-black/80 p-2 sm:p-4 flex flex-col">
                          <span className="text-sm sm:text-xl">
                            {clipAndReplace(el.original_title, 12)}
                          </span>
                          <Link
                            to={`/details/${el.id}`}
                            className="bg-blue-500 text-xs px-2 py-1 rounded-md hover:scale-105 sm:px-4 sm:text-base w-fit"
                          >
                            Details
                          </Link>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </Slider>
            )}
          </article>
        </section>
      )}
    </main>
  );
};

export default Details;
