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

  function handleHover(e: SyntheticEvent<HTMLImageElement>) {
    const targetImage = e.target as HTMLImageElement;
    const src = targetImage.src;
    setImage(src);
  }
  useEffect(() => {
    const findGame = games.find((item) => item.id == Number(id));
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
  }, []);

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
                __html: game?.description ? game.description.split('</delivery>')[0] : ''
              }}></p>
          </div>
          <div className="order-info">
            <Price price={game?.price || 0} steamPrice={game?.steamPrice || ''} type="order" />
            <ul className="order-info__list">
              <li className="order-info__list-item">Мгновенная доставка ✔</li>
              <li className="order-info__list-item">Товар в наличии ✔</li>
              {game?.steamPrice.includes('RUB') ? (
                <li className="order-info__list-item">Игра доступна в РФ и РБ ✔</li>
              ) : (
                <li className="order-info__list-item">Игра недоступна в РФ и РБ ❌</li>
              )}
            </ul>
            <form id="digiselller_form" action="https://oplata.info/asp2/pay.asp" method="post">
              <input type="hidden" name="id_d" value={game?.digiId} />
              <input type="hidden" name="lang" value="ru-RU" />
              <input type="hidden" name="failpage" value={window.location.href} />
              <button type="submit" className="order-info__buy-button">
                Купить
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
