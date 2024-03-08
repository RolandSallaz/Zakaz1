import { SyntheticEvent, useState } from 'react';
import { GameTag } from '../GameTag/GameTag';
import { Price } from '../Price/Price';
import './SlickCard.scss';
import GameLogo from '../GameLogo/GameLogo';
import { IGame } from '../../utils/types';
import { apiUrl } from '../../utils/config';
import { Link } from 'react-router-dom';

type Props = {
  game: IGame;
};

export function SlickCard({ game }: Props) {
  const [image, setImage] = useState<string>(convertImage(game.logo));

  function handleHover(e: SyntheticEvent<HTMLImageElement>) {
    const targetImage = e.target as HTMLImageElement;
    const src = targetImage.src;
    e.type == 'mouseenter' ? setImage(src) : setImage(convertImage(game.logo));
  }
  function convertImage(link: string) {
    return `${apiUrl}/${link}`;
  }
  return (
    <div className={'SlickCard'}>
      <Link className={'SlickCard__image-container'} to={`/games/${game.id}`}>
        <GameLogo src={image} />
        <div className={'SlickCard__tag-container'}>
          {game.tags.map((tag) => (
            <GameTag tag={tag} key={tag.id} />
          ))}
        </div>
      </Link>
      <div className={'SlickCard__container'}>
        <Link className={'SlickCard__name'} to={`/games/${game.id}`}>
          {game.name}
        </Link>
        <div className={'SlickCard__screenshot-container'}>
          {game.screenshots.map((screenshot, index) => (
            <img
              key={index}
              className={'SlickCard__screenshot'}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
              src={convertImage(screenshot)}
            />
          ))}
        </div>
        <Price price={game.price} steamPrice={game.steamPrice} />
      </div>
    </div>
  );
}
