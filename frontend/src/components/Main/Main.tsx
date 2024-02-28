// @flow
import * as React from 'react';
import './Main.scss';
import { GameCard } from '../GameCard/GameCard';
import Slider from 'react-slick';
import { SlickCard } from '../SlickCard/SlickCard';
import { SidePanel } from '../SidePanel/SidePanel';
import { Autocomplete, Switch, TextField } from '@mui/material';

export function Main() {
  const options = ['MOBA', 'Мультиплеер'];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000
  };
  return (
    <main className={'main'}>
      <h1 className={'main__heading'}>Купить ключи STEAM, EPIC GAMES, SOCIAL CLUB и др.</h1>
      <section>
        <section className="slick">
          <Slider {...settings}>
            <SlickCard price={{ cost: 10, discount: 30 }} />
            <SlickCard price={{ cost: 10, discount: 0 }} />
          </Slider>
        </section>
      </section>
      <div className={'main__container'}>
        <section className={'cards'}>
          <GameCard price={{ cost: 10, discount: 30 }} />
          <GameCard price={{ cost: 10, discount: 0 }} />
        </section>
        <SidePanel>
          <Autocomplete
            disablePortal
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Жанр" />}
          />
          <label className={'SidePanel__discount-filter'}>
            Со скидкой <Switch />
          </label>
          <label className={'SidePanel__price-filter'}>
            Цена: от 10 до 50 rub
            <Slider defaultValue={[20, 37]} min={0} max={100} />
          </label>
        </SidePanel>
      </div>
    </main>
  );
}
