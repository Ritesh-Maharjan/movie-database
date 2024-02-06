import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

const Slider: React.FC<{
  children: ReactNode;
  title: String;
}> = ({ children, title }) => {
  // to keep track of the width of the whole slider minus the offset of the slider being displayed
  const [width, setWidth] = useState<number>(0);

  // to keep track of pages to call more movies from the api
  const [page, setPage] = useState<number>(2);

  // to keep track of width of the whole slider
  const sliderContainer = useRef<HTMLDivElement>(null);

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
  }, [sliderContainer.current]); //need to update width when sliderContainer is loaded first, data when more movie is loaded need to increase width of the scrollable slider

  // to call more movie data if the user reaches the end
  const onDrag = () => {
    if (dragX.get() < -width - 100) {
      //   getMoreMovie(title, page);
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
    <div className="m-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-4xl">{title}</h2>
        <div className="flex gap-4 ">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 cursor-pointer`}
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
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Slider;
