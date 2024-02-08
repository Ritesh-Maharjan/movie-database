import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiResponse } from "../utils/type/types";
import Card from "../component/Card";

const Search = () => {
  const { query } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [searchResult, setSearchResult] = useState<ApiResponse[]>([]);

  // setting option method to call the api
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1'`,
          options
        );
        setSearchResult(response.data.results);
      } catch (e) {
        console.log(e);
      }
    };

    getMovie();
  }, [query]);

  console.log(query);
  return (
    <main className="flex flex-wrap gap-4 items-center justify-center">
      {searchResult.length === 0 ? (
        <div className="flex items-center justify-center min-h-[75vh]">
          <h2 >NO SEARCH RESULT FOUND</h2>
        </div>
      ) : (
        searchResult.map((movie) => {
          return <Card movie={movie} />;
        })
      )}
    </main>
  );
};

export default Search;
