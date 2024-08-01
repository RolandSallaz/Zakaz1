import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

import "./RunningReviews.scss";
import useErrorHandler from "@/app/lib/hooks/useErrorHandler";
import { useAppSelector } from "@/app/lib/hooks/redux";
import { getReviewsRandom } from "@/app/lib/services/api";
import { IReview } from "@/app/lib/utils/types";
import Link from "next/link";
import Image from "next/image";
import Review from "../Review/Review";

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
        <Link
          key={review.id}
          href={`/games/${review.digiId}`}
          className="running-reviews__container"
        >
          <Image
            className="running-reviews__img"
            alt={"Отзыв игры"}
            src={games.find((item) => item.digiId == review.digiId)?.logo || ""}
            loading="lazy"
            width={1488}
            height={1488}
          />
          <h2 className="running-reviews__heading">
            {games?.find((item) => item.digiId == review.digiId)?.name || ""}
          </h2>
          <Review review={review} isRunning />
        </Link>
      ))}
    </Marquee>
  );
}
