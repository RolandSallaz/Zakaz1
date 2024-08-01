"use client";
import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { MouseEvent, memo, useCallback, useState } from "react";

import { IGame } from "@/app/lib/utils/types";
import Image from "next/image";
import Link from "next/link";
import "./GameCard.scss";
import { Price } from "../Price/Price";

type Props = {
  game: IGame;
  customLink?: string;
  lastSales?: boolean;
  hoverDate?: Date;
};

const GameCard = ({ game, customLink, lastSales, hoverDate }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    setIsHovered(e.type === "mouseenter");
  }, []);

  return (
    <Link
      href={customLink || `/games/${game.digiId}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className="gameCard"
    >
      <div className="gameCard__image-container">
        {hoverDate && isHovered && (
          <p className="gameCard__date">
            Последняя покупка{" "}
            {formatRelative(hoverDate, new Date(), { locale: ru })}
          </p>
        )}
        <Image
          className={`gameCard__image", {
          ${isHovered && "gameCard__image_hovered"}`}
          src={game.logo}
          alt="Изображение игры"
          loading="lazy"
          width={458}
          height={245}
          style={{
            width: "100%",
            height: "100%",
            transition: "scale 0.5s ease",
          }}
        />
        {!lastSales && <Price game={game} />}
      </div>
      <h3 className="gameCard__name">{game.name}</h3>
    </Link>
  );
};

GameCard.displayName = "GameCard";

export default memo(GameCard, (prevProps, nextProps) => {
  // Кастомная функция сравнения пропсов для избежания ненужных рендеров
  return (
    prevProps.game.digiId === nextProps.game.digiId &&
    prevProps.customLink === nextProps.customLink &&
    prevProps.lastSales === nextProps.lastSales &&
    prevProps.hoverDate === nextProps.hoverDate
  );
});
