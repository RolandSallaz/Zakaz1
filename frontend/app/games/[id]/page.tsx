import { Metadata } from "next";
import React from "react";
import { getGameById } from "../../lib/services/api";
import GamePage from "@/app/components/GamePage/GamePage";
interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: PageProps): Promise<Metadata> {
  try {
    const game = await fetchData(id);
    const title = game
      ? `Купить игру ${game?.name} недорого | ${process.env.NEXT_PUBLIC_SHOP_NAME}`
      : "Загрузка...";
    const description = game ? game.description : "";
    const images = game
      ? [
          `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.steamId}/capsule_616x353.jpg`,
        ]
      : [];
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/games/${id}`;
    return {
      title,
      openGraph: {
        title,
        description,
        images,
        url,
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Ошибка загрузки",
      openGraph: {
        title: "Ошибка загрузки",
        description: "",
        images: [],
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/games/${id}`,
      },
    };
  }
}

// Функция для получения данных
async function fetchData(id: string) {
  try {
    return await getGameById(Number(id));
  } catch (error) {
    console.error("Error fetching item:", error);
    return null;
  }
}

export default async function Page({ params: { id } }: PageProps) {
  const item = await fetchData(id);

  if (!item) {
    return <div>Ошибка загрузки данных.</div>;
  }

  return <GamePage game={item} />;
}
