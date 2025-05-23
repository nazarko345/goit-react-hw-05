import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { fetchMoviesReviews } from "../../movies-api.js";
import { useParams } from "react-router-dom";

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchMoviesReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadMovies();
  }, [movieId]);

  return (
    <ul className={css.container}>
      {reviews.length > 0 ? (
        reviews.map((review) => {
          return (
            <li className={css.item} key={review.id}>
              <h3 className={css.title}>Author: {review.author}</h3>
              <p className={css.subtitle}>{review.content}</p>
            </li>
          );
        })
      ) : (
        <h3 className={css.noMovie}>
          We don't have any reviews for that movie!
        </h3>
      )}
    </ul>
  );
}
