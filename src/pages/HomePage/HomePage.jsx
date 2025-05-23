import css from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList.jsx";

export default function HomePage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      <MovieList/>
    </div>
  );
}
