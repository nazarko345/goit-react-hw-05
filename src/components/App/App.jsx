import css from "./App.module.css";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "../Navigation/Navigation.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage.jsx"));
const MoviesDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
const MovieCast = lazy(() => import("../Cast/MovieCast.jsx"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews.jsx"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);

export default function App() {
  return (
    <div className={css.app}>
      <Navigation />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MoviesDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
