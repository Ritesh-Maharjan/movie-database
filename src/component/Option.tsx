import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import { ApiResponse } from "../utils/type/types";
import Card from "./Card";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../assets/images/loading.gif";

const Option = React.forwardRef<
  HTMLDivElement,
  {
    data: ApiResponse[];
    title: string;
    getMoreMovie: (type: string, page: number) => void;
  }
>((props, ref) => {
  const { data, title, getMoreMovie } = props;
  const [info, setInfo] = useState(false);
  // to keep track of the width of the whole slider minus the offset of the slider being displayed
  const [width, setWidth] = useState<number>(0);
  // to keep track of pages to call more movies from the api
  const [page, setPage] = useState<number>(2);
  // to keep track of width of the whole slider
  const sliderContainer = useRef<HTMLDivElement>(null);

  const [headingTitle, setHeadingTitle] = useState<string>("");

  // to keep track of at what stage the page is at
  const dragX = useMotionValue(0);
  const controls = useAnimationControls();

  useEffect(() => {
    const handleResize = () => {
      //  set the width once the component is loaded
      if (sliderContainer.current) {
        setWidth(
          sliderContainer.current?.scrollWidth -
            sliderContainer.current?.offsetWidth
        );
      }
    };
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sliderContainer.current, data]); //need to update width when sliderContainer is loaded first, data when more movie is loaded need to increase width of the scrollable slider

  useEffect(() => {
    switch (title) {
      case "now_playing":
        setHeadingTitle("Now Playing");
        break;
      case "popular":
        setHeadingTitle("Popular");
        break;
      case "top_rated":
        setHeadingTitle("Top Rated");
        break;
      case "upcoming":
        setHeadingTitle("Upcoming");
        break;
    }
  }, []);

  // to call more movie data if the user reaches the end
  const onDrag = () => {
    if (dragX.get() < -width - 100) {
      getMoreMovie(title, page);
      setPage(page + 1);
    }
  };

  const leftMove = () => {
    const newX = Math.min(dragX.get() + 500, 0); // Ensure the new x value is within bounds
    // moving the slider
    controls.start({
      x: newX,
      transition: { type: "tween", ease: "easeInOut", duration: 1 },
    });
  };

  const rightMove = () => {
    const newX = Math.max(dragX.get() - 500, -width); // Ensure the new x value is within bounds
    // moving the slider
    controls.start({
      x: newX,
      transition: { type: "tween", ease: "easeInOut", duration: 1 },
    });
  };

  return (
    <section className="m-4" ref={ref}>
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center mb-5 gap-2">
          <h2 className="text-lg sm:text-2xl md:text-3xl ">{headingTitle}</h2>

          <div
            className="relative hidden md:block"
            onMouseEnter={() => setInfo(true)}
            onMouseLeave={() => setInfo(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>

            <p
              className={`${
                info ? "block" : "hidden"
              } absolute top-3 left-1/2  md:w-80 z-30 pl-4`}
            >
              Drag a bit more at the end to load more movies
            </p>
          </div>
        </div>

        <div className="flex gap-4 ">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 cursor-pointer `}
            whileHover={{ scale: 1.3 }}
            onClick={leftMove}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </motion.svg>

          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            whileHover={{ scale: 1.3 }}
            onClick={rightMove}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </motion.svg>
        </div>
      </div>
      <motion.article
        ref={sliderContainer}
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        transition={{
          type: "spring",
          damping: 1000,
        }}
        style={{ x: dragX }} // setting up the value of dragX depending upon where the slider is at
        onDragEnd={onDrag}
        className="flex gap-6 cursor-grab focus:cursor-grabbing"
        animate={controls}
      >
        {data.length === 0 ? (
          <img className="mx-auto" src={Loading} alt="Loading" />
        ) : (
          data?.map((el) => {
            return <Card key={el.id} movie={el} />;
          })
        )}
      </motion.article>
    </section>
  );
});

export default Option;
