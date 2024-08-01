import { IGame } from "@/app/lib/utils/types";
import "./SlickCard.scss";
import Link from "next/link";
import GameLogo from "../GameLogo/GameLogo";
import { Price } from "../Price/Price";

type Props = {
  game: IGame;
};

export function SlickCard({ game }: Props) {
  // const [image, setImage] = useState<string>(game.logo);

  // function handleHover(e: SyntheticEvent<HTMLImageElement>) {
  //   const targetImage = e.target as HTMLImageElement;
  //   const src = targetImage.src;
  //   e.type == 'mouseenter' ? setImage(src) : setImage(game.logo);
  // }

  return (
    <div className={"SlickCard"}>
      <Link
        className={"SlickCard__image-container"}
        href={`/games/${game.digiId}`}
        target="_blank"
      >
        <GameLogo
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.steamId}/capsule_616x353.jpg`}
        />
        {/* <div className={'SlickCard__tag-container'}>
          {game.tags.map((tag) => (
            <GameTag tag={tag} key={tag.id} />
          ))}
        </div> */}
        <Price game={game} type="slick" />
      </Link>
      {/* <div className={'SlickCard__container'}> */}
      {/* <Link className={'SlickCard__name'} to={`/games/${game.digiId}`}>
          {game.name}
        </Link> */}
      {/* <div className={'SlickCard__screenshot-container'}>
          {game.screenshots.map((screenshot, index) => (
            <img
              key={index}
              className={'SlickCard__screenshot'}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
              src={screenshot}
            />
          ))}
        </div> */}
      {/* </div> */}
    </div>
  );
}
