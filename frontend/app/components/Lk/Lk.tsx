// @flow
import * as React from "react";
import "./Lk.scss";
import Link from "next/link";

type Props = {
  children?: React.ReactNode;
  additionalClass?: string;
};

export function Lk({ children, additionalClass }: Props) {
  return (
    <main className={`main Lk`}>
      <Link className="link Lk__link" href={"/"}>
        Вернуться на главную
      </Link>
      <div className={`main__container ${additionalClass}`}>{children}</div>
    </main>
  );
}
