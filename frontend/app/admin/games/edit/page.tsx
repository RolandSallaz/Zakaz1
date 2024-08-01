"use client";
import GameCard from "@/app/components/GameCard/GameCard";
import SectionWithSearch from "@/app/components/SectionWithSearch/SectionWithSearch";
import { useAppSelector } from "@/app/lib/hooks/redux";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const { games } = useAppSelector((state) => state.games);
  const router = useRouter();
  function handleSelectEditGame(name: string) {
    const game = games.find((item) => item.name == name);
    router.push(`/admin/games/edit/${game?.id}`);
  }

  return (
    <SectionWithSearch
      onSelectSearch={handleSelectEditGame}
      options={games.map((item) => item.name)}
    >
      {games.map((item) => (
        <GameCard
          game={item}
          key={item.id}
          customLink={`/admin/games/edit/${item.digiId}`}
        />
      ))}
    </SectionWithSearch>
  );
}
