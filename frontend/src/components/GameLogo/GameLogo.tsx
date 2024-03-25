import './GameLogo.scss';
interface props {
  src: string;
  additionClass?: string;
  orientation?: 'default' | 'portait' | 'gamePage';
  alt?: string;
}

export default function GameLogo({
  src,
  additionClass,
  orientation = 'default',
  alt = 'Обложка игры'
}: props) {
  return (
    <img
      className={`GameLogo ${additionClass} GameLogo_orientation_${orientation}`}
      src={src}
      alt={alt}
    />
  );
}
