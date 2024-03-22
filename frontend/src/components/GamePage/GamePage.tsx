import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import useErrorHandler from '../../hooks/useErrorHandler';
import { checkInStock, getGameById, getReviewsBuyGame } from '../../services/api';
import { IGame, IReview } from '../../utils/types';
import GameLogo from '../GameLogo/GameLogo';
import { GameTag } from '../GameTag/GameTag';
import { Price } from '../Price/Price';
import Review from '../Review/Review';
import './GamePage.scss';

export default function GamePage() {
  const [game, setGame] = useState<IGame>();
  const [isFullDescription, setIsFullDescription] = useState<boolean>(false);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const { games } = useAppSelector((state) => state.games);
  const [image, setImage] = useState<string>('');
  const [reviewsPage, setReviewsPage] = useState<number>(1);
  const [isAviable, setIsAviable] = useState<boolean>(false);
  const { handleError } = useErrorHandler();
  const { id } = useParams();
  const navigate = useNavigate();
  const regex = /https:\/\/store\.steampowered\.com\/app\/\d+\/\w+\//;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

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
      setImage(
        `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.steamId}/capsule_616x353.jpg`
      );
    }
    getReviewsBuyGame(Number(id)).then(setReviews).catch(handleError);
    checkInStock(Number(id))
      .then((res) => setIsAviable(Boolean(res)))
      .catch(console.log);
  }, [navigate]);

  function handleBuyRedirect() {
    window.location.href = `https://oplata.info/asp2/pay_options.asp?id_d=${id}&ai=&ain=&air=&curr=API_13603_RUB&_subcurr=&lang=ru-RU&_ow=0&_ids_shop=${import.meta.env.VITE_DIGI_SHOP}&xml=&failpage=${import.meta.env.VITE_FAIL_PAGE}`;
  }

  function handleChangeFullDescription() {
    setIsFullDescription((state) => !state);
  }

  return (
    <main className="main gamePage">
      <Link className="link" to={'/'}>
        Вернуться на главную
      </Link>
      <section className="gamePage__section">
        <div className="gamePage__container">
          <div className="gamePage__logo-container">
            {image && <GameLogo src={image} additionClass="gamePage__logo" />}

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
          </div>

          <div className="order-info">
            {game && <Price game={game} type="order" />}
            <ul className="order-info__list">
              <li className="order-info__list-item">Мгновенная доставка ✔</li>
              {isAviable ? (
                <li className="order-info__list-item">Товар в наличии ✔</li>
              ) : (
                <li className="order-info__list-item">К сожалению, товар закончился ❌</li>
              )}
              {game?.steamPrice.includes('руб.') && (
                <li className="order-info__list-item">Игра доступна в РФ и РБ ✔</li>
              )}
              {game?.steamPrice.includes('Предзаказ') && (
                <li className="order-info__list-item">Данный товар является предзаказом</li>
              )}
              {game?.steamPrice.includes('$') && (
                <li className="order-info__list-item">Игра недоступна в РФ и РБ ❌</li>
              )}
            </ul>
            <button type="button" className="order-info__buy-button" onClick={handleBuyRedirect}>
              Купить
            </button>
          </div>
        </div>
        <div className="gamePage__tag-container">
          {game?.tags.slice(0, 4).map((tag) => <GameTag tag={tag} key={tag.id} />)}
        </div>
        <section>
          <div className="gamePage__info">
            <h2 className="gamePage__game-name">{game?.name}</h2>
            <p
              className={`gamePage__description ${isFullDescription && 'gamePage__description_full'}`}
              dangerouslySetInnerHTML={{
                __html: game?.description ? game?.description.replace(regex, '') : ''
              }}></p>
            <button
              type="button"
              className="gamePage__button"
              onClick={handleChangeFullDescription}>
              {isFullDescription ? 'скрыть' : 'Показать полностью'}
            </button>
          </div>
        </section>
        <section className="activation">
          <h3 className="activation__heading">Активация продукта в Steam</h3>
          <ol className="activation__list">
            <li className="activation__list-item">
              Получите оплаченный товар в разделе{' '}
              <a href="https://digiseller.market/info/?lang=ru-RU" target="_blank">
                Мои покупки
              </a>
              .
            </li>
            <li className="activation__list-item">
              Если не установлен Steam клиент, скачайте его для{' '}
              <a
                href="https://steamcdn-a.akamaihd.net/client/installer/SteamSetup.exe"
                target="_blank">
                Windows
              </a>{' '}
              (клиент также доступен на{' '}
              <a href="https://steamcdn-a.akamaihd.net/client/installer/steam.dmg" target="_blank">
                Mac
              </a>{' '}
              и{' '}
              <a href="https://steamcdn-a.akamaihd.net/client/installer/steam.deb" target="_blank">
                Linux
              </a>
              ) и установите.
            </li>
            <li className="activation__list-item">
              Запустите Steam, зайдите в свой аккаунт или зарегистрируйте новый, если у вас его еще
              нет.
            </li>
            <li className="activation__list-item">
              Войдите в меню «Игры» и выберите пункт «Активировать через Steam».
            </li>
            <li className="activation__list-item">Примите соглашение подписчика Steam.</li>
            <li className="activation__list-item">{`Введите ключ активации (для его получения необходимо купить ${game?.name}).`}</li>
            <li className="activation__list-item">{`После активации вам будет предложено скачать игру ${game?.name}`}</li>
          </ol>
          <p>
            Ключ также можно активировать через{' '}
            <a href="https://store.steampowered.com/account/registerkey" target="_blank">
              браузер
            </a>
            .
          </p>
        </section>
        <section className="requirements">
          <h3 className="requirements__heading">Системные требования</h3>
          <div className="requirements__container">
            {game && (
              <>
                <p dangerouslySetInnerHTML={{ __html: game?.minimal_requirements }} />
                <p dangerouslySetInnerHTML={{ __html: game?.recomended_requirements }} />
              </>
            )}
          </div>
        </section>
      </section>
      <section className="reviews">
        <h2 className="reviews__heading">Отзывы о товаре</h2>
        <p>{`Отзывов ${reviews.length}`}</p>
        {reviews.length > 0 ? (
          <div className="reviews__container">
            {reviews
              ?.slice((reviewsPage - 1) * itemsPerPage, reviewsPage * itemsPerPage)
              .map((item) => <Review key={item.id} review={item} />)}
          </div>
        ) : (
          <h3>На данный момент отсутствуют отзывы об этом товаре.</h3>
        )}
        <div className="reviews__buttons">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={reviewsPage === index + 1 ? 'reviews__button_active' : ''}
              onClick={() => setReviewsPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
        <p>Оставить отзыв можно после покупки</p>
      </section>
    </main>
  );
}
