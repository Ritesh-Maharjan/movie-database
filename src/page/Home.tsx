import axios from "axios";
import { useEffect, useState } from "react";
import Discover from "../component/Discover";

interface ApiResponse {
  id: number;
  overview: string;
  original_title: string;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
}

const Home = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [trendingData, setTrendingData] = useState<ApiResponse[]>([]);
  // setting variables to call the api
  const url = `${baseUrl}/3/trending/movie/day?language=en-US&results=5`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  useEffect(() => {
    const discoverMovie = async () => {
      try {
        const response = await axios.get(url, options);
        console.log(response.data.results);
        setTrendingData(response.data.results);
      } catch (e) {
        console.log(e);
      }
    };

    discoverMovie();
  }, []);

  return (
    <>
      <main className="overflow-hidden ">
        <Discover trendingData={trendingData} />
      </main>
    </>
  );
};

export default Home;
