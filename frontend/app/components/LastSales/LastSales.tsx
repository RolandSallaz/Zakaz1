import { useAppSelector } from "@/app/lib/hooks/redux";
import "./LastSales.scss";
import GameCard from "../GameCard/GameCard";

export default function LastSales() {
  const { saledGames } = useAppSelector((state) => state.games);

  return saledGames.length > 0 ? (
    <section className="LastSales">
      <h2 className="LastSales__heading">Последние продажи</h2>
      <div className="LastSales__container">
        {saledGames.map((item) => (
          <GameCard game={item} key={item.id} lastSales hoverDate={item.date} />
        ))}
      </div>
    </section>
  ) : (
    <></>
  );
}
