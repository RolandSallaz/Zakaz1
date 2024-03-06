import { SyntheticEvent, useState } from 'react';
import { GameTag } from '../GameTag/GameTag';
import { Price } from '../Price/Price';
import './SlickCard.scss';
import GameLogo from '../GameLogo/GameLogo';

type Props = {
  price: number;
  discount: number;
};

export function SlickCard({ price }: Props) {
  const mokmainImage: string =
    'https://cdn.akamai.steamstatic.com/steam/apps/570/capsule_616x353.jpg?t=1707435904';
  const [image, setImage] = useState<string>(mokmainImage);

  function handleHover(e: SyntheticEvent<HTMLImageElement>) {
    const targetImage = e.target as HTMLImageElement;
    const src = targetImage.src;
    e.type == 'mouseenter' ? setImage(src) : setImage(mokmainImage);
  }

  return (
    <div className={'SlickCard'}>
      <div className={'SlickCard__image-container'}>
        <GameLogo src={image} />
        <div className={'SlickCard__tag-container'}>
          <GameTag tag={{ name: 'Test' }} />
          <GameTag tag={{ name: 'Test' }} />
          <GameTag tag={{ name: 'Test' }} />
        </div>
      </div>
      <div className={'SlickCard__container'}>
        <h2 className={'SlickCard__name'}>Dota 2</h2>
        <div className={'SlickCard__screenshot-container'}>
          <img
            className={'SlickCard__screenshot'}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            src={
              'https://cdn.akamai.steamstatic.com/steam/apps/570/ss_ad8eee787704745ccdecdfde3a5cd2733704898d.1920x1080.jpg?t=1707435904'
            }
          />
          <img
            className={'SlickCard__screenshot'}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            src={
              'https://cdn.akamai.steamstatic.com/steam/apps/570/ss_7ab506679d42bfc0c0e40639887176494e0466d9.600x338.jpg?t=1707435904'
            }
          />
          <img
            className={'SlickCard__screenshot'}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            src={
              'https://cdn.akamai.steamstatic.com/steam/apps/570/ss_c9118375a2400278590f29a3537769c986ef6e39.600x338.jpg?t=1707435904'
            }
          />
          <img
            className={'SlickCard__screenshot'}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            src={
              'https://cdn.akamai.steamstatic.com/steam/apps/570/ss_f9ebafedaf2d5cfb80ef1f74baa18eb08cad6494.600x338.jpg?t=1707435904'
            }
          />
          <img
            className={'SlickCard__screenshot'}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            src={
              'https://cdn.akamai.steamstatic.com/steam/apps/570/ss_f9ebafedaf2d5cfb80ef1f74baa18eb08cad6494.600x338.jpg?t=1707435904'
            }
          />
          <img
            className={'SlickCard__screenshot'}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            src={
              'https://cdn.akamai.steamstatic.com/steam/apps/570/ss_f9ebafedaf2d5cfb80ef1f74baa18eb08cad6494.600x338.jpg?t=1707435904'
            }
          />
          <img
            className={'SlickCard__screenshot'}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            src={
              'https://cdn.akamai.steamstatic.com/steam/apps/570/ss_f9ebafedaf2d5cfb80ef1f74baa18eb08cad6494.600x338.jpg?t=1707435904'
            }
          />
          <img
            className={'SlickCard__screenshot'}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            src={
              'https://cdn.akamai.steamstatic.com/steam/apps/570/ss_f9ebafedaf2d5cfb80ef1f74baa18eb08cad6494.600x338.jpg?t=1707435904'
            }
          />
          <img
            className={'SlickCard__screenshot'}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            src={
              'https://cdn.akamai.steamstatic.com/steam/apps/570/ss_f9ebafedaf2d5cfb80ef1f74baa18eb08cad6494.600x338.jpg?t=1707435904'
            }
          />
        </div>
        {/* <Price price={price} /> */}
      </div>
    </div>
  );
}
