import React, { useEffect, useState } from "react";

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

// declaring the props is going to be ApiResponse
const Discover: React.FC<{ trendingData: ApiResponse[] }> = ({
  trendingData,
}) => {
  console.log(trendingData);

  const [top5, setTop5] = useState<ApiResponse[]>([]);

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      setTop5((prevState) => [...prevState, trendingData[i]]);
    }
  }, []);
  return (
    <section>
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/original/${top5[0]?.backdrop_path}`}
          className="w-full max-w-[100vw] min-h-80  max-h-[90vh] object-cover"
          loading="lazy"
          alt={top5[0]?.original_title}
        />
        <div className="hidden absolute bottom-3 right-0 gap-2 bg-black/50 sm:max-w-80 lg:max-w-lg p-4 sm:flex  flex-col text-white ">
          <h2 className="text-center">{top5[0].original_title}</h2>
          <div className="flex gap-2 place-self-end">
            <span>{top5[0].vote_average}&#127871;</span>
            <span>{top5[0].release_date}</span>
          </div>
          <p>{top5[0].overview}</p>
        </div>
      </div>
    </section>
  );
};

export default Discover;
