import { IReview } from "@/app/lib/utils/types";
import Link from "next/link";
import Review from "../Review/Review";
import "./ReviewsPage.scss";

interface props {
  reviews: IReview[];
}

export default function ReviewsPage({ reviews }: props) {
  return (
    <main className="main">
      <Link className="link " href={"/"}>
        Вернуться на главную
      </Link>
      <section className="reviewsPage">
        {reviews?.map((item) => (
          <Review key={item.id} review={item} />
        ))}
      </section>
    </main>
  );
}
