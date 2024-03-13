import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { getGameById } from '../../services/api';
import { IGame } from '../../utils/types';
import GameLogo from '../GameLogo/GameLogo';
import { GameTag } from '../GameTag/GameTag';
import { Price } from '../Price/Price';
import './GamePage.scss';

export default function GamePage() {
  const [game, setGame] = useState<IGame>();
  const { id } = useParams();
  const { games } = useAppSelector((state) => state.games);
  const navigate = useNavigate();
  const [image, setImage] = useState<string>('');
  const regex = /https:\/\/store\.steampowered\.com\/app\/\d+\/\w+\//;
  function handleHover(e: SyntheticEvent<HTMLImageElement>) {
    const targetImage = e.target as HTMLImageElement;
    const src = targetImage.src;
    setImage(src);
  }
  useEffect(() => {
    const findGame = games.find((item) => item.digiId == Number(id));
    if (findGame) {
      setGameAndImage(findGame);
    } else {
      getGameById(Number(id))
        .then(setGameAndImage)
        .catch(() => navigate('/notFound'));
    }
    function setGameAndImage(game: IGame) {
      setGame(game);
      setImage(game.logo);
    }
  }, [navigate]);

  function handleBuyRedirect() {
    window.location.href = `https://oplata.info/asp2/pay_options.asp?id_d=${id}&ai=&ain=&air=&curr=API_13603_RUB&_subcurr=&lang=ru-RU&_ow=0&_ids_shop=${import.meta.env.VITE_DIGI_SHOP}&xml=&failpage=${import.meta.env.VITE_FAIL_PAGE}`;
  }

  return (
    <main className="main gamePage">
      <Link className="link" to={'/'}>
        Вернуться на главную
      </Link>
      <section className="gamePage__section">
        <div className="gamePage__container">
          <div className="screenshots">
            <div className="screenshots__container">
              <img className="screenshots__element" src={game?.logo} onMouseEnter={handleHover} />
            </div>
            {game?.screenshots?.map((screen, i) => (
              <div className="screenshots__container" key={i}>
                <img
                  className="screenshots__element"
                  src={screen}
                  key={screen}
                  onMouseEnter={handleHover}
                />
              </div>
            ))}
          </div>
          <div className="gamePage__logo-container">
            <GameLogo src={image} additionClass="gamePage__logo" orientation="portait" />
            <div className="gamePage__tag-container">
              {game?.tags.slice(0, 4).map((tag) => <GameTag tag={tag} key={tag.id} />)}
            </div>
          </div>
          <div className="gamePage__info">
            <h2 className="gamePage__game-name">{game?.name}</h2>
            <p
              className="gamePage__description"
              dangerouslySetInnerHTML={{
                __html: game?.description ? game?.description.replace(regex, '') : ''
              }}></p>
          </div>
          <div className="order-info">
            <Price price={game?.price || 0} steamPrice={game?.steamPrice || ''} type="order" />
            <ul className="order-info__list">
              <li className="order-info__list-item">Мгновенная доставка ✔</li>
              <li className="order-info__list-item">Товар в наличии ✔</li>
              {game?.steamPrice.includes('pуб.') ? (
                <li className="order-info__list-item">Игра доступна в РФ и РБ ✔</li>
              ) : (
                <li className="order-info__list-item">Игра недоступна в РФ и РБ ❌</li>
              )}
            </ul>
            <button type="button" className="order-info__buy-button" onClick={handleBuyRedirect}>
              Купить
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
