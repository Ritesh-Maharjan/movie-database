import React, { useEffect, useState } from "react";
import { motion, spring, useMotionValue } from "framer-motion";
import { ApiResponse } from "../utils/type/types";
import { Link } from "react-router-dom";
import Loading from "../assets/images/loading.gif";
import NotFoundImg from "../assets/images/notfound.jpg";

// declaring the props is going to be ApiResponse
const Discover: React.FC<{ trendingData: ApiResponse[] }> = ({
  trendingData,
}) => {
  const DRAG_BUFFER = 50;
  const ONE_SEC = 1000;
  const AUTO_DELAY = ONE_SEC * 5;
  const [imgIndex, setImgIndex] = useState(0);

  //   to know how much we dragged
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      //   if we are not dragging the iamge we need to run the automatic
      if (x === 0) {
        setImgIndex((currentIndex) => {
          // if last index then go to the first image
          if (currentIndex >= trendingData.length - 1) {
            currentIndex = 0;
            return 0;
          }
          return currentIndex + 1;
        });
      }
    }, AUTO_DELAY);

    return () => {
      clearInterval(intervalRef);
    };
  }, []);

  const onDragEnd = () => {
    // to check if its slight drag or huge drag
    const x = dragX.get();
    // if drag greater then DRAG_BUFFER we want to swap images
    if (x <= -DRAG_BUFFER) {
      if (imgIndex < trendingData.length - 1) {
        setImgIndex((pv) => pv + 1);
      } else {
        setImgIndex(0);
      }
    } else if (x >= DRAG_BUFFER) {
      if (imgIndex > 0) {
        setImgIndex((pv) => pv - 1);
      } else {
        setImgIndex(trendingData.length - 1);
      }
    }
  };

  return (
    <div className="relative">
      <motion.section
        className="flex relative"
        drag="x" // only draggable to horizontal
        dragConstraints={{ left: 0, right: 0 }} // dont want to allow the section to be dragged too much
        style={{ x: dragX }} // assigning the values of x to dragx when we drag
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        onDragEnd={onDragEnd}
        transition={{
          type: spring,
          mass: 3,
          stiffness: 400,
          damping: 50,
        }}
      >
        {!trendingData ? (
          <img className="mx-auto" src={Loading} alt="Loading" />
        ) : (
          trendingData.map((el) => {
            return (
              <div
                key={el.id}
                className="relative flex lg:flex-row gap-2 min-w-[100vw] 2xl:min-w-[1536px] cursor-grab active:cursor-grabbing"
              >
                <img
                  src={
                    el?.backdrop_path
                      ? `https://image.tmdb.org/t/p/original/${el?.backdrop_path}`
                      : NotFoundImg
                  }
                  className="w-full max-w-[1252px] min-h-80  max-h-[90vh] object-cover rounded-lg"
                  loading="lazy"
                  alt={el?.original_title}
                  draggable="false"
                />
                <div className="absolute bottom-6 right-0 max-w-96 flex flex-col items-center justify-center gap-2 bg-black/50 p-4  rounded-lg xl:max-w-xl lg:relative lg:bottom-0">
                  <h2 className="text-center flex justify-between w-full gap-2 text-sm sm:text-xl md:text-xl lg:text-3xl">
                    {el?.original_title}
                    <span className="flex gap-2 place-self-end lg:text-2xl">
                      {el?.vote_average.toFixed(1)}&#127871;
                    </span>
                  </h2>
                  <p className="hidden sm:block text-sm lg:text-xl">
                    {el?.overview}
                  </p>
                  <button className="border-2 py-1 px-2 text-sm md:text-base hover:text-black hover:bg-white font-black self-end">
                    <Link to={`details/${el.id}`}>More details</Link>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </motion.section>

      <div className="w-full flex gap-1 items-center justify-center absolute bottom-0">
        {trendingData.map((_, index) => {
          return (
            <span
              className={` ${
                imgIndex === index ? "bg-slate-50" : "bg-slate-500"
              } w-2 h-2 inline cursor-pointer p-1 my-2 rounded-full lg:p-2 `}
              onClick={() => setImgIndex(index)}
              key={index}
            ></span>
          );
        })}
      </div>
    </div>
  );
};

export default Discover;
