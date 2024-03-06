import { Link } from 'react-router-dom';
import './NotFound.scss';

export default function NotFound() {
  return (
    <main className="main notFound">
      <h2 className="notFound__heading">404 Страница не найдена</h2>
      <Link className="link" to="/">
        Вернуться на главную
      </Link>
    </main>
  );
}
