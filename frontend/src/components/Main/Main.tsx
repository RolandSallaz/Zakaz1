import { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useAppSelector } from '../../hooks/redux';
import { GameCard } from '../GameCard/GameCard';
import LastSales from '../LastSales/LastSales';
import RunningReviews from '../RunningReviews/RunningReviews';
import { SlickCard } from '../SlickCard/SlickCard';
import './Main.scss';

export function Main() {
  const { filteredGames } = useAppSelector((state) => state.games);

  const { sliders } = useAppSelector((state) => state.sliders);
  const { gameSelections } = useAppSelector((state) => state.gameSelections);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = window.innerWidth > 1279 ? 25 : 5;
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <main className={'main'}>
      <section className="slick__section">
        <section className="slick">
          {sliders.length >= 2 && (
            <Slider beforeChange={(_c, newSlide) => setActiveSlide(newSlide)} {...settings}>
              {sliders.map((item) => item.game.id && <SlickCard key={item.id} game={item.game} />)}
            </Slider>
          )}
        </section>
        {sliders?.length >= 2 && (
          <div className="slick-links">
            {sliders
              ?.map((item, index) => (
                <Link
                  key={item.id}
                  to={`/games/${item.game.digiId}`}
                  className={`slick-links__item ${index == activeSlide && 'slick-links__item_active'}`}
                >
                  <img
                    className="slick-links__image"
                    src={item.game.logo}
                    alt={`Купить игру ${item.game.name} дешевле чем в Steam`}
                    loading="lazy"
                  />
                  <p className="slick-links__name">{item.game.name}</p>
                </Link>
              ))
              .slice(0, 5)}
          </div>
        )}
      </section>
      <div className={'main__container'}>
        <section className={'cards'}>
          {filteredGames
            ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((game) => <GameCard game={game} key={game.id} />)}
        </section>
        <div className="main__buttons">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={page === index + 1 ? 'reviews__button_active' : ''}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <RunningReviews />
      <LastSales />
      {gameSelections.length > 0 && (
        <div>
          <h2 className="main__heading">Наши подборки:</h2>
          {gameSelections.map((item) => (
            <div key={item.id}>
              <h3 className="main__heading main__heading_subheading">{item.name}</h3>
              <section className={'cards'}>
                {item.games.map((game) => (
                  <GameCard game={game} key={game.id} />
                ))}
              </section>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
