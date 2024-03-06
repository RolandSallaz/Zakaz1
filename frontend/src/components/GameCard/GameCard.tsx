// @flow
import { SyntheticEvent, useState } from 'react';
import { IGame } from '../../utils/types';
import { Price } from '../Price/Price';
import './GameCard.scss';
import { apiUrl } from '../../utils/config';
import { useNavigate } from 'react-router-dom';

type Props = {
  game: IGame;
  onCardClick?: (id: number) => void;
};

export function GameCard({ game, onCardClick }: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false); //Состояние карточки, наведен ли на неё курсор
  const navigate = useNavigate();
  function handleHover(e: SyntheticEvent) {
    //Функция, которая срабатывает при наведении и убирание мышки с карточки
    e.type == 'mouseenter' ? setIsHovered(true) : setIsHovered(false);
  }
  function handleClick() {
    if (onCardClick) {
      onCardClick(game.id);
    } else {
      navigate(`/games/${game.id}`);
    }
  }
  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className={'gameCard'}
      onClick={handleClick}>
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
