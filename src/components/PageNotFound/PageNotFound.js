import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <section className="page-not-found">
      <div className="page-not-fount__container">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__subtitle">Страница не найдена</p>
      </div>
      <button className="page-not-found__link" onClick={handleGoBack}>Назад</button>
    </section>
  );
}

export default PageNotFound;
