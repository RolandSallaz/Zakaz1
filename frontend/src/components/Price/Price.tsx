import { IGame } from '../../utils/types';
import './Price.scss';

type Props = {
  type?: 'default' | 'slick' | 'order';
  game: IGame;
};

export function Price({ type = 'default', game }: Props) {
  return (
    <div className={`price price_${type}`}>
      <p className={`price__cost`}>{game.price}</p>
      <p className={`price__cost ${game.coming_soon ? 'price__cost_preorder' : 'price__cost_old'}`}>
        {game.steamPrice}
      </p>
    </div>
  );
}
