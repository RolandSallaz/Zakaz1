import './Price.scss';

type Props = {
  price: number;
  discount: number;
  isSlick?: boolean;
};

export function Price({ price, discount, isSlick }: Props) {
  return (
    <div className={`price ${isSlick && 'price_slick'}`}>
      {discount > 0 && (
        <>
          <p className={'price__discount'}>{`-${discount}%`}</p>
          <p className={'price__cost price__cost_old'}>{discount > 0 && price}</p>
        </>
      )}
      <p className={`price__cost ${!discount && 'price__cost_no-discount'}`}>
        {discount > 0 ? price - price * (discount / 100) : price}
      </p>
    </div>
  );
}
