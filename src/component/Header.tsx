import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex items-center justify-between p-6">
      <h1 className="text-lg md:text-3xl lg:text-6xl">
        <NavLink to="/">IMDB</NavLink>
      </h1>

      <motion.form
        whileHover={{ scale: 1.1 }}
        className={`relative flex items-center basis-2/4 max-w-md`}
      >
        <input
          className="outline-none text-xs text-slate-800 p-1 rounded-lg w-full lg:text-2xl "
          type="search"
          placeholder="Search a movie..."
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
      </motion.form>

      <div>
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
        <div
          className={`${
            openMenu ? "flex" : "hidden"
          } absolute flex-col right-6 text-end top-14 sm:flex sm:gap-4 sm:text-lg sm:flex-row sm:relative sm:top-auto sm:right-auto lg:text-3xl`}
        >
          <NavLink to="/about">About</NavLink>
          <NavLink to="/favorite">Favorite</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
