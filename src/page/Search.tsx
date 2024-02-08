import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiResponse } from "../utils/type/types";
import Card from "../component/Card";
import loadingImg from "../assets/images/loading.gif";

const Search = () => {
  const { query } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [searchResult, setSearchResult] = useState<ApiResponse[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPages] = useState<number>(1);
  const [queryState, setQueryState] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(true);

  // setting option method to call the api
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const getMovie = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
        options
      );
      setLoading(false);
      setTotalPages(response.data.total_pages);
      setSearchResult((prevState) => [...prevState, ...response.data.results]);
    } catch (e) {
      console.log(e);
    }
  };

  const loadMore = async () => {
    setPages((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (query !== queryState) {
      setQueryState(query);
      setSearchResult([]);
    }
    getMovie();
  }, [query, page]);

  return (
    <main className="flex flex-col items-center justify-center">
      {loading ? (
        <img src={loadingImg} alt="loading images" />
      ) : (
        <div className="flex flex-wrap min-h-[75vh] gap-4 items-center justify-center">
          {searchResult.length === 0 ? (
            <h2 className="text-center">NO SEARCH RESULT FOUND</h2>
          ) : (
            searchResult.map((movie) => {
              return <Card movie={movie} />;
            })
          )}
        </div>
      )}

      {totalPages > 1 && totalPages > page && (
          <button
            onClick={loadMore}
            className="px-4 py-2 mt-10 w-fit bg-orange-400 text-gray-700 rounded-lg hover:scale-110 hover:text-xl"
          >
            Load More
          </button>
      )}
    </main>
  );
};

export default Search;
