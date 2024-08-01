import { IReview } from "@/app/lib/utils/types";
import "./Review.scss";
import { Avatar } from "@mui/material";

interface props {
  review: IReview;
  isRunning?: boolean;
}

export default function Review({ review, isRunning }: props) {
  return (
    <div className={`review ${isRunning && "review__isRunning"}`}>
      <Avatar className="review__avatar" />
      <div className="review__container">
        <div className="review__sub-container">
          <p className="review__id">id: {review.id}</p>
          <p className="review__date">Время: {review.date.toString()}</p>
          👍
        </div>
        <p className={`review__info ${isRunning && "review__info_isRunning"}`}>
          {review.info}
        </p>
      </div>
    </div>
  );
}
