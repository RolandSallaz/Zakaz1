import { INFOCHAPTER } from "@/app/lib/utils/config";
import "./Footer.scss";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={"footer"}>
      <div className="footer__column">
        <p className={"footer__copy"}>
          &#169;
          {`${year} ${
            process.env.NEXT_PUBLIC_SHOP_NAME || "название магазина"
          }`}
        </p>
      </div>
      <nav className="footer__column footer__column_center">
        <ul className="footer__column-list">
          {Object.entries(INFOCHAPTER).map(([key, item], index) => (
            <li key={key}>
              <Link className="link" href={item.link}>
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link className="link" href={"/reviews"}>
              Отзывы
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
