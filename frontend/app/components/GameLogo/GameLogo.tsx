import "./GameLogo.scss";
import Image from "next/image";
interface props {
  src: string;
  additionClass?: string;
  orientation?: "default" | "portait" | "gamePage";
  alt?: string;
}

export default function GameLogo({
  src,
  additionClass,
  orientation = "default",
  alt = "Обложка игры",
}: props) {
  return (
    <Image
      className={`GameLogo ${additionClass} GameLogo_orientation_${orientation}`}
      src={src}
      alt={alt}
      loading="lazy"
      width={768}
      height={439}
      objectFit="contain"
      objectPosition="bottom"
      sizes="(max-width: 768px)"
    />
  );
}
