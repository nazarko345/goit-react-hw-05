import css from "./GoBackBtn.module.css";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function GoBackBtn() {
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/movies");

  return (
    <div className={css.container}>
      <Link className={css.link} to={backLink.current} state={location}>
        Go Back
      </Link>
    </div>
  );
}
