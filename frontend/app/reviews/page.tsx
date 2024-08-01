import React from "react";
import { getReviewsAll } from "../lib/services/api";
import ReviewsPage from "../components/ReviewsPage/ReviewsPage";

async function fetchData() {
  try {
    return await getReviewsAll();
  } catch (error) {
    console.error("Error fetching item:", error);
    return null;
  }
}

export default async function Page() {
  const content = await fetchData();
  if (!content) {
    return <div className="error">Ошибка загрузки данных.</div>;
  }

  return <ReviewsPage reviews={content} />;
}
