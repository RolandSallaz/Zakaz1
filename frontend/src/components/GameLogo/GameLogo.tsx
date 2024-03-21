import './GameLogo.scss';
interface props {
  src: string;
  additionClass?: string;
  orientation?: 'default' | 'portait' | 'gamePage';
}

export default function GameLogo({ src, additionClass, orientation = 'default' }: props) {
  return (
    <img
      className={`GameLogo ${additionClass} GameLogo_orientation_${orientation}`}
      src={src}
      alt="Обложка игры"
    />
  );
}
