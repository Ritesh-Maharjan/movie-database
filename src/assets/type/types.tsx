export interface ApiResponse {
  id: number;
  overview: string;
  original_title: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
}

type Genre = {
  id: number;
  name: string;
};

type Video = {
  id: string;
  key: string;
};

type Results = {
  results: Video[];
};

type Credits = {
  cast: Cast[];
};

type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

export interface DetailsApiResponse extends ApiResponse {
  genres: Genre[];
  videos: Results;
  credits: Credits;
}
