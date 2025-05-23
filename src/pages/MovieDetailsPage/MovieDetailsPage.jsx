import css from "./MovieDetailsPage.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMoviesDetails } from "../../movies-api.js";
import { useParams } from "react-router-dom";
import GoBackBtn from "../../components/GoBackBtn/GoBackBtn.jsx";
import { Outlet } from "react-router-dom";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  // const location = useLocation();

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchMoviesDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadMovies();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className={css.container}>
      <GoBackBtn />

      <div className={css.movieCard}>
        <img
          className={css.image}
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />
        <ul className={css.detailsList}>
          <li className={css.detailsItem}>
            <h2 className={css.title}>
              {movie.title} ({movie.year})
            </h2>
            <p className={css.tagline}>{movie.tagline}</p>
          </li>
          <li className={css.detailsItem}>
            <h3 className={css.subheading}>Overview</h3>
            <p>{movie.overview}</p>
          </li>
          <li className={css.detailsItem}>
            <h3 className={css.subheading}>Genres</h3>
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
          </li>
        </ul>
      </div>

      <hr className={css.separator} />

      <div className={css.additional}>
        <h3 className={css.subheading}>Additional Information</h3>
        <div className={css.links}>
          <Link to="cast" className={css.link}>
            Cast
          </Link>
          <Link to="reviews" className={css.link}>
            Reviews
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
