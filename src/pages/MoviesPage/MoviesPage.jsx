import css from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import { searchMovies } from "../../movies-api.js";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { BeatLoader } from "react-spinners";
import MovieList from "../../components/MovieList/MovieList.jsx";

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const query = searchParams.get("query") || "";
    
    const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    if (query === "") return;

    async function loadMovies() {
      try {
        const data = await searchMovies(debouncedQuery);
        setMovies(data);
      } catch (error) {
        setError(true)
        console.log(error);
      } finally {
        setError(false);
        setLoading(false)
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
      {loading && <BeatLoader />}
      {error && <p className={css.noMovie}>No movies found!</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
