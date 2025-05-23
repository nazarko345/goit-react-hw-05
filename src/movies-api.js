import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjI2Y2FhYWZhMWY0NzdkMTNkZGI4NThlMWVkYzU4MyIsIm5iZiI6MTc0NzkwNDI5My4xODgsInN1YiI6IjY4MmVlNzI1MTU3OTI2NTU2ODVlZDNlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1h-sMmj3fMtjZ6D9AzT1BneWKLZhKanSZOjnoAZskNs";

const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_URL = `${BASE_URL}/movie`;
const SEARCH_URL = `${BASE_URL}/search/movie`;

const headers = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    accept: "application/json",
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    `${MOVIE_URL}/popular?language=en-US&page=1`,
    headers
  );
  return response.data;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `${SEARCH_URL}?include_adult=false&language=en-US&page=1&query=${query}`,
    headers
  );
  return response.data.results;
};

export const fetchMoviesDetails = async (movieId) => {
  const response = await axios.get(
    `${MOVIE_URL}/${movieId}?language=en-US`,
    headers
  );
  return response.data;
};

export const fetchMoviesCast = async (movieId) => {
  const response = await axios.get(
    `${MOVIE_URL}/${movieId}/credits?language=en-US`,
    headers
  );
  return response.data.cast;
};

export const fetchMoviesReviews = async (movieId) => {
  const response = await axios.get(
    `${MOVIE_URL}/${movieId}/reviews?language=en-US&page=1`,
    headers
  );
  return response.data.results;
};
