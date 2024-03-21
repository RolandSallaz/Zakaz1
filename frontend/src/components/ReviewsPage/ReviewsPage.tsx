import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useErrorHandler from '../../hooks/useErrorHandler';
import { getReviewsAll } from '../../services/api';
import { IReview } from '../../utils/types';
import Review from '../Review/Review';
import './ReviewsPage.scss';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const { handleError } = useErrorHandler();
  useEffect(() => {
    getReviewsAll().then(setReviews).catch(handleError);
  }, []);
  return (
    <main className="main">
      <Link className="link " to={'/'}>
        Вернуться на главную
      </Link>
      <section className="reviewsPage">
        {reviews?.map((item) => <Review key={item.id} review={item} />)}
      </section>
    </main>
  );
}
