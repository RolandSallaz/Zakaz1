// @flow
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { SyntheticEvent, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IGame } from '../../utils/types';
import { Price } from '../Price/Price';
import './GameCard.scss';

type Props = {
  game: IGame;
  customLink?: string;
  lastSales?: boolean;
  hoverDate?: Date;
};

export const GameCard = memo(({ game, customLink, lastSales, hoverDate }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  function handleHover(e: SyntheticEvent) {
    e.type === 'mouseenter' ? setIsHovered(true) : setIsHovered(false);
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
          <p className="gameCard__date">
            Последняя покупка {formatRelative(hoverDate, new Date(), { locale: ru })}
          </p>
        )}
        <img
          className={`gameCard__image ${isHovered && 'gameCard__image_hovered'}`}
          src={game.logo}
          alt={'Изображение игры'}
          loading="lazy"
        />
        {!lastSales && <Price game={game} />}
      </div>
      <h3 className={'gameCard__name'}>{game.name}</h3>
    </Link>
  );
});
