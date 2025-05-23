import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList.jsx";
import { useEffect, useState } from "react";

import { fetchTrendingMovies } from "../../movies-api.js";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

   useEffect(() => {
     async function loadMovies() {
       try {
         const data = await fetchTrendingMovies();
         setMovies(data.results);
       } catch (error) {
         console.log("Error fetching movies:", error);
       }
     }

     loadMovies();
   }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}
