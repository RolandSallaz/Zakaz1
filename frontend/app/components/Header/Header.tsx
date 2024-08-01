import Link from "next/link";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
import "./Header.scss";

export function Header() {
  return (
    <header className={"header"}>
      <h1 className="header__heading">
        магазин ключей Steam, купить ключи игр, дешевые ключи Steam, акционные
        предложения игр, онлайн магазин игровых ключей, купить игры по скидке
      </h1>
      <div className="header__container">
        <div className="header__sub-container">
          <Link className="link header__link header__link_logo" href="/">
            {process.env.NEXT_PUBLIC_SHOP_NAME || "названием магазина"}
          </Link>
          <Link className="link header__link" href={"/guarantees"}>
            Гарантии
          </Link>
          <Link className="link header__link" href={"/reviews"}>
            Отзывы
          </Link>
        </div>
        <div className="header__sub-container">
          <Link className="link header__link" href={"/support"}>
            Поддержка
          </Link>
          <a
            className="link header__link"
            href="https://digiseller.market/info/?lang=ru-RU"
            target="_blank"
          >
            Мои покупки
          </a>
        </div>
      </div>
      <div className="header__search-container">
        <HeaderSearch />
      </div>
    </header>
  );
}
