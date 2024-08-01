import Link from "next/link";
import React from "react";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="admin__sub-tabs">
        <Link className={"link admin__link"} href="/admin/games/add">
          Добавить
        </Link>
        <Link className={"link admin__link"} href="/admin/games/edit">
          Редактировать или удалить
        </Link>
        <Link className={"link admin__link"} href="/admin/games/digiload">
          Работа с Digiseller
        </Link>
      </div>
      {children}
    </>
  );
}
