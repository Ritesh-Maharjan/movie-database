import { motion, useMotionValue } from "framer-motion";
import { ApiResponse } from "../assets/type/types";
import Card from "./Card";
import { useEffect, useRef, useState } from "react";

// defining the props recieved to be the array of ApiResponse type, title string and getMoreMovies function
const Option: React.FC<{
  data: ApiResponse[];
  title: string;
  getMoreMovie: (type: string, page: number) => void;
}> = ({ data, title, getMoreMovie }) => {
  // to keep track of the width of the whole slider minus the offset of the slider being displayed
  const [width, setWidth] = useState<number>(0);
  // to keep track of pages to call more movies from the api
  const [page, setPage] = useState<number>(2);
  // to keep track of width of the whole slider
  const sliderContainer = useRef<HTMLDivElement>(null);

  const [headingTitle, setHeadingTitle] = useState<string>("");

  // to keep track of at what stage the page is at
  const dragX = useMotionValue(0);

  useEffect(() => {
    // only set the width if the component has loaded
    if (sliderContainer.current) {
      setWidth(
        sliderContainer.current?.scrollWidth -
          sliderContainer.current?.offsetWidth
      );
    }
  }, [sliderContainer.current, data]); //need to update width when sliderContainer is loaded first, data when more movie is loaded need to increase width of the scrollable slider

  useEffect(() => {
    switch (title) {
      case "now_playing":
        console.log(title);
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

  return (
    <section className="m-4">
      <h2 className="text-lg mb-2 sm:text-2xl md:text-4xl md:mb-6">
        {headingTitle}
      </h2>
      <motion.div
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
      >
        {data?.map((el) => {
          return <Card key={el.id} movie={el} />;
        })}
      </motion.div>
    </section>
  );
};

export default Option;
