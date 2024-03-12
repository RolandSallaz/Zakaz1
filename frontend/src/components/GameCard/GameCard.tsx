// @flow
import { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { IGame } from '../../utils/types';
import { Price } from '../Price/Price';
import './GameCard.scss';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale/ru';

type Props = {
  game: IGame;
  customLink?: string;
  lastSales?: boolean;
  hoverDate?: Date;
};

export function GameCard({ game, customLink, lastSales, hoverDate }: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false); //Состояние карточки, наведен ли на неё курсор
  function handleHover(e: SyntheticEvent) {
    //Функция, которая срабатывает при наведении и убирание мышки с карточки
    e.type == 'mouseenter' ? setIsHovered(true) : setIsHovered(false);
  }
  return (
    <Link
      to={customLink || `/games/${game.digiId}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className={`gameCard`}
    >
      <div className={'gameCard__image-container'}>
        {hoverDate && isHovered && (
          <p className="gameCard__date">{formatDistanceToNow(hoverDate, { locale: ru })} назад</p>
        )}
        <img
          className={`gameCard__image ${isHovered && 'gameCard__image_hovered'}`}
          src={game.logo}
          alt={'Изображение игры'}
        />
        {!lastSales && <Price price={game.price} steamPrice={game.steamPrice} />}
      </div>
      <h3 className={'gameCard__name'}>{game.name}</h3>
    </Link>
  );
}
