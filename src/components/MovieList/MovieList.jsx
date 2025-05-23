import css from "./MovieList.module.css";
import { Link } from "react-router-dom";

import { fetchTrendingMovies } from "../../movies-api.js";
import { useEffect, useState } from "react";

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
    <ul className={css.list}>
      {movies.map((movie) => {
        return (
          <li key={movie.id} className={css.item}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
