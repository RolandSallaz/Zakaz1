import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { IReview } from '../../utils/types';
import { getReviewsRandom } from '../../services/api';
import useErrorHandler from '../../hooks/useErrorHandler';
import Review from '../Review/Review';
import { useAppSelector } from '../../hooks/redux';
import './RunningReviews.scss';
import { Link } from 'react-router-dom';

export default function RunningReviews() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const { games } = useAppSelector((state) => state.games);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    getReviewsRandom().then(setReviews).catch(handleError);
  }, []);

  return (
    <Marquee className="running-reviews">
      {reviews?.map((review) => (
        <Link key={review.id} to={`/games/${review.digiId}`} className="running-reviews__container">
          <img
            className="running-reviews__img"
            src={games.find((item) => item.digiId == review.digiId)?.logo}
          />
          <h2 className="running-reviews__heading">
            {games?.find((item) => item.digiId == review.digiId)?.name || ''}
          </h2>
          <Review review={review} isRunning />
        </Link>
      ))}
    </Marquee>
  );
}
