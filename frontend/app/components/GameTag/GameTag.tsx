// @flow
import { ITag } from "@/app/lib/utils/types";
import "./GameTag.scss";

type Props = {
  tag: ITag;
  onClick?: (tag: ITag) => void;
};

export function GameTag({ tag, onClick }: Props) {
  function handleClick() {
    if (onClick) {
      onClick(tag);
    }
  }

  return (
    <p
      onClick={handleClick}
      className={"GameTag"}
      style={onClick && { cursor: "pointer" }}
    >
      {tag.name}
    </p>
  );
}
