import { Link } from 'react-router-dom';
import './Footer.scss';
import { INFOCHAPTER } from '../../utils/config';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={'footer'}>
      <div className="footer__column">
        <p className={'footer__copy'}>
          &#169;{`${year} ${import.meta.env.VITE_SHOP_NAME || 'название магазина'}`}
        </p>
      </div>
      <nav className="footer__column footer__column_center">
        <ul className="footer__column-list">
          {INFOCHAPTER.map((item, index) => (
            <li key={index}>
              <Link className="link" to={item.link}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
