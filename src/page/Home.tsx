import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Discover from "../component/Discover";
import Option from "../component/Option";
import { ApiResponse } from "../utils/type/types";
import { TITLE } from "../global";

const Home = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Destructure the hook result
  const [nowPlayingRef, inViewNowPlaying] = useInView({
    triggerOnce: true, // Set to true to trigger once
  });

  // Destructure the hook result
  const [popularRef, inViewPopular] = useInView({
    triggerOnce: true, // Set to true to trigger once
  });

  // Destructure the hook result
  const [topRatedRef, inViewTopRated] = useInView({
    triggerOnce: true, // Set to true to trigger once
  });

  // Destructure the hook result
  const [upcomingRef, inViewUpcoming] = useInView({
    triggerOnce: true, // Set to true to trigger once
  });

  const [discoverData, setDiscoverData] = useState<ApiResponse[]>([]);
  const [nowPlayingData, setNowPlayingData] = useState<ApiResponse[]>([]);
  const [popularData, setPopularData] = useState<ApiResponse[]>([]);
  const [topRatedData, setTopRatedData] = useState<ApiResponse[]>([]);
  const [upcomingData, setUpcomingData] = useState<ApiResponse[]>([]);

  // setting option method to call the api
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const getDiscover = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/3/trending/movie/day?language=en-US&results=5`,
        options
      );
      setDiscoverData(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const getNowPlaying = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/3/movie/now_playing?language=en-US&page=1`,
        options
      );
      setNowPlayingData(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const getPopular = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/3/movie/popular?language=en-US&page=1`,
        options
      );
      setPopularData(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const getTopRated = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/3/movie/top_rated?language=en-US&page=1`,
        options
      );
      setTopRatedData(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const getUpcoming = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/3/movie/upcoming?language=en-US&page=1`,
        options
      );
      setUpcomingData(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const getMoreMovie = async (type: string, page: number) => {
    try {
      const response = await axios.get(
        `${baseUrl}/3/movie/${type}?language=en-US&page=${page}`,
        options
      );

      switch (type) {
        case "upcoming":
          setUpcomingData((prevState) => [
            ...prevState,
            ...response.data.results,
          ]);
          break;

        case "top_rated":
          setTopRatedData((prevState) => [
            ...prevState,
            ...response.data.results,
          ]);
          break;

        case "popular":
          setPopularData((prevState) => [
            ...prevState,
            ...response.data.results,
          ]);
          break;

        case "now_playing":
          setNowPlayingData((prevState) => [
            ...prevState,
            ...response.data.results,
          ]);
          break;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    document.title = `${TITLE} - Home`;
    getDiscover();
  }, []);

  // Trigger the API calls when the components are in view
  useEffect(() => {
    if (inViewNowPlaying) {
      getNowPlaying();
    }
  }, [inViewNowPlaying]);

  // Trigger the API calls when the components are in view
  useEffect(() => {
    if (inViewPopular) {
      getPopular();
    }
  }, [inViewPopular]);

  // Trigger the API calls when the components are in view
  useEffect(() => {
    if (inViewTopRated) {
      getTopRated();
    }
  }, [inViewTopRated]);

  // Trigger the API calls when the components are in view
  useEffect(() => {
    if (inViewUpcoming) {
      getUpcoming();
    }
  }, [inViewUpcoming]);

  return (
    <>
      <main className="overflow-hidden ">
        <Discover trendingData={discoverData} />
        <Option
          data={nowPlayingData}
          title="now_playing"
          getMoreMovie={getMoreMovie}
          ref={nowPlayingRef}
        />
        <Option
          data={popularData}
          title="popular"
          getMoreMovie={getMoreMovie}
          ref={popularRef}
        />
        <Option
          data={topRatedData}
          title="top_rated"
          getMoreMovie={getMoreMovie}
          ref={topRatedRef}
        />
        <Option
          data={upcomingData}
          title="upcoming"
          getMoreMovie={getMoreMovie}
          ref={upcomingRef}
        />
      </main>
    </>
  );
};

export default Home;
