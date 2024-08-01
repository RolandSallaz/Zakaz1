import Link from "next/link";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <main className="main notFound">
      <h2 className="notFound__heading">404 Страница не найдена</h2>
      <Link className="link" href="/">
        Вернуться на главную
      </Link>
    </main>
  );
}
