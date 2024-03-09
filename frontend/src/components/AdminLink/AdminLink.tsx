import { Link } from 'react-router-dom';
import './AdminLink.scss';

export default function AdminLink() {
  return (
    <Link className="link AdminLink" to="/admin">
      Админка
    </Link>
  );
}
