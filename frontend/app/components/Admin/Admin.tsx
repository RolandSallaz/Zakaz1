import Link from "next/link";

import { Lk } from "../Lk/Lk";
import { SidePanel } from "../SidePanel/SidePanel";
import "./Admin.scss";
import { ReactNode } from "react";

interface props {
  children: ReactNode;
}

export default function Admin({ children }: props) {
  return (
    <Lk additionalClass="admin">
      <SidePanel>
        <Link className={"link admin__link"} href="/admin/games/add">
          Игры
        </Link>
        <Link className="link admin__link" href="/admin/tags">
          Теги
        </Link>
        <Link className="link admin__link" href="/admin/slider">
          Слайдер
        </Link>
        <Link className="link admin__link" href="/admin/game-selection/add">
          Подборки игр
        </Link>
        <Link className="link admin__link" href="/admin/info-chapter">
          Разделы с информацией
        </Link>
        <Link className="link admin__link" href="/admin/system-info">
          Состояние сервера
        </Link>
      </SidePanel>
      <div className="admin__container">{children}</div>
    </Lk>
  );
}
