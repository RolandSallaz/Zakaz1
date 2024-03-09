// @flow
import { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../utils/config';
import { IGame } from '../../utils/types';
import { Price } from '../Price/Price';
import './GameCard.scss';

type Props = {
  game: IGame;
  customLink?: string;
};

export function GameCard({ game, customLink }: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false); //Состояние карточки, наведен ли на неё курсор
  function handleHover(e: SyntheticEvent) {
    //Функция, которая срабатывает при наведении и убирание мышки с карточки
    e.type == 'mouseenter' ? setIsHovered(true) : setIsHovered(false);
  }

  return (
    <Link
      to={customLink || `/games/${game.id}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className={'gameCard'}
    >
      <div className={'gameCard__image-container'}>
        <img
          className={`gameCard__image ${isHovered && 'gameCard__image_hovered'}`}
          src={`${apiUrl}/${game.logo}`}
          alt={'Изображение игры'}
        />
        <Price price={game.price} steamPrice={game.steamPrice} />
      </div>
      <h3 className={'gameCard__name'}>{game.name}</h3>
    </Link>
  );
}
