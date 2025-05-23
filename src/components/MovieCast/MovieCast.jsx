import css from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import { fetchMoviesCast } from "../../movies-api.js";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchMoviesCast(movieId);
        setActors(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadMovies();
  }, [movieId]);

  return (
    <ul className={css.list}>
      {actors.map((actor) => (
        <li className={css.item} key={actor.id}>
          <img
            className={css.src}
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={`foto of ${actor.name}`}
          />
          <h4 className={css.name}>{actor.name}</h4>
          <p className={css.character}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
}
