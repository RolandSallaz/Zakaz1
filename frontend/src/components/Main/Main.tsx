import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import Slider from 'react-slick';
import { useAppSelector } from '../../hooks/redux';
import { GameCard } from '../GameCard/GameCard';
import { SidePanel } from '../SidePanel/SidePanel';
import { SlickCard } from '../SlickCard/SlickCard';
import './Main.scss';

export function Main() {
  const { games } = useAppSelector((state) => state.games);

  const { sliders } = useAppSelector((state) => state.sliders);
  const { gameSelections } = useAppSelector((state) => state.gameSelections);

  // const filteredGames = filteredGamesWithTag.length ? filteredGamesWithTag : games;

  const filteredGames = games;

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
      <section>
        <section className="slick">
          {sliders.length >= 2 && (
            <Slider {...settings}>
              {sliders.map((item) => item.game.id && <SlickCard key={item.id} game={item.game} />)}
            </Slider>
          )}
        </section>
      </section>
      <div className={'main__container'}>
        <section className={'cards'}>
          {filteredGames?.map((game) => <GameCard game={game} key={game.id} />)}
        </section>
      </div>
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
