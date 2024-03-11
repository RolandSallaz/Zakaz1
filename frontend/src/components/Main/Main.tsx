import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import Slider from 'react-slick';
import { useAppSelector } from '../../hooks/redux';
import { GameCard } from '../GameCard/GameCard';
import { SidePanel } from '../SidePanel/SidePanel';
import { SlickCard } from '../SlickCard/SlickCard';
import './Main.scss';

export function Main() {
  const [selectedTag, setSelectedTag] = useState<string | null>('');
  const { games } = useAppSelector((state) => state.games);
  const { tags } = useAppSelector((state) => state.tags);
  const { sliders } = useAppSelector((state) => state.sliders);
  const { gameSelections } = useAppSelector((state) => state.gameSelections);
  const usedTags = tags.filter((tag) =>
    games.some((game) => game.tags.some((gameTag) => gameTag.name === tag.name))
  );
  const options = usedTags.map((tag) => tag.name);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  const filteredGamesWithTag = games.filter((game) =>
    game.tags.some((tag) => tag.name == selectedTag)
  );
  const filteredGames = filteredGamesWithTag.length ? filteredGamesWithTag : games;

  return (
    <main className={'main'}>
      <section>
        <section className="slick">
          {sliders.length >= 2 && (
            <Slider {...settings}>
              {sliders.map((item) => item.game && <SlickCard key={item.id} game={item.game} />)}
            </Slider>
          )}
        </section>
      </section>
      <div className={'main__container'}>
        <section className={'cards'}>
          {filteredGames?.map((game) => <GameCard game={game} key={game.id} />)}
        </section>
        <SidePanel>
          <Autocomplete
            onChange={(_event: any, newValue: string | null) => {
              setSelectedTag(newValue);
            }}
            disablePortal
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Жанр" />}
          />
          {/* <label className={'SidePanel__price-filter'}>
            Цена: от 10 до 50 rub
            <Slider defaultValue={[20, 37]} min={0} max={100} />
          </label> */}
        </SidePanel>
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
