import css from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import { searchMovies } from "../../movies-api.js";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const query = searchParams.get("query") || "";
    
    const [debouncedQuery] = useDebounce(query, 300);
    
    const location = useLocation();

  useEffect(() => {
    if (query === "") return;

    async function loadMovies() {
      try {
        const data = await searchMovies(debouncedQuery);
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadMovies();
  }, [debouncedQuery, query]);

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    const value = event.target.value;
    setSearchParams({ query: value });
  }

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" value={query} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      {movies.length === 0 && query !== "" && (
        <p className={css.noMovie}>No movies found!</p>
      )}

      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.item}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
