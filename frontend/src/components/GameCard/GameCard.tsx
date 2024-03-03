// @flow
import { SyntheticEvent, useState } from 'react';
import { IGame } from '../../utils/types';
import { Price } from '../Price/Price';
import './GameCard.scss';
import { apiUrl } from '../../utils/config';

type Props = {
  game: IGame;
};

export function GameCard({ game }: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false); //Состояние карточки, наведен ли на неё курсор

  function handleHover(e: SyntheticEvent) {
    //Функция, которая срабатывает при наведении и убирание мышки с карточки
    e.type == 'mouseenter' ? setIsHovered(true) : setIsHovered(false);
  }

  return (
    <div onMouseEnter={handleHover} onMouseLeave={handleHover} className={'gameCard'}>
      <div className={'gameCard__image-container'}>
        <img
          className={`gameCard__image ${isHovered && 'gameCard__image_hovered'}`}
          src={`${apiUrl}/${game.logo}`}
          alt={'Изображение игры'}
        />
        <Price price={game.price} discount={game.discount} />
      </div>
      <h3 className={'gameCard__name'}>{game.name}</h3>
    </div>
  );
}
