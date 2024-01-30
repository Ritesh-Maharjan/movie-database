import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { SearchResult } from "../utils/type/types";

const Header = () => {
  // FOR MENu
  const [openMenu, setOpenMenu] = useState(false);
  const [input, setInput] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // setting option method to call the api
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  useEffect(() => {
    const movieSearch = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/3/search/movie?query=${input}&include_adult=false&language=en-US&page=1'`,
          options
        );
        setSearchResult(response.data.results);
      } catch (e) {
        console.log(e);
      }
    };

    const handleDocumentClick = (e: MouseEvent | PointerEvent) => {
      if (inputRef.current && inputRef.current.contains(e.target as Node)) {
        setSearchFocused(true);
      } else {
        setSearchFocused(false);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        setInput("");
      }
    };

    document.addEventListener("click", handleDocumentClick);
    movieSearch();
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [input]);

  return (
    <header className="mx-auto fixed left-0 right-0 top-0 z-30 w-full h-[5vh] md:h-[10vh] bg-black flex items-center justify-between p-2">
      <h1 className="text-lg md:text-6xl">
        <NavLink to="/">IMDB</NavLink>
      </h1>

      <form className={`relative flex items-center sm:w-1/3`}>
        <input
          ref={inputRef}
          className="outline-none text-xs text-slate-800 p-1 rounded-lg w-full md:text-2xl "
          type="text"
          placeholder="Search a movie..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target?.value)
          }
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#94a3b8"
          className="w-5 h-5 lg:w-8 lg:h-8 absolute right-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        {searchFocused && (
          <div className="absolute top-14 z-30 bg-gray-500 w-full">
            {searchResult.map((searchEl, index) => {
              return (
                index < 5 && (
                  <Link key={searchEl.id} to={`details/${searchEl.id}`}>
                    <p className="cursor-pointer border-b-2 p-2">
                      {searchEl.original_title}
                    </p>
                  </Link>
                )
              );
            })}
          </div>
        )}
      </form>

      <nav>
        <button
          className="relative cursor-pointer sm:hidden"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <svg
            className={`${openMenu ? "hidden" : "block"} h-8 w-8`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <svg
            className={`${openMenu ? "block" : "hidden"} h-8 w-8`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <motion.div
          className={`${
            openMenu ? "h-20" : "h-0"
          } absolute z-20 bg-black left-0 right-0 top-12 overflow-hidden flex flex-col gap-2 sm:flex-row sm:relative sm:h-auto sm:top-0 md:text-3xl`}
        >
          <NavLink className="mx-2 mt-2 sm:mt-0" to="/about">
            About
          </NavLink>
          <NavLink className="mx-2" to="/favorite">
            Favorite
          </NavLink>
        </motion.div>
      </nav>
    </header>
  );
};

export default Header;
