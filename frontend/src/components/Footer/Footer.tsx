import './Footer.scss';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={'footer'}>
      <p className={'footer__copy'}>
        &#169;{`${year} ${import.meta.env.VITE_SHOP_NAME || 'название магазина'}`}
      </p>
    </footer>
  );
}
