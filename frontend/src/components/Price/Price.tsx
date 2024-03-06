import './Price.scss';

type Props = {
  price: number;
  steamPrice: number;
  type?: 'default' | 'slick' | 'order';
};

export function Price({ price, steamPrice, type = 'default' }: Props) {
  return (
    <div className={`price price_${type}`}>
      <p className={`price__cost`}>{price}</p>
      <p className={'price__cost price__cost_old'}>{steamPrice}</p>
    </div>
  );
}
