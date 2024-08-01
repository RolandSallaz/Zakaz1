import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="admin__sub-tabs">
        <Link className={"link admin__link"} href="/admin/game-selection/add">
          Добавить
        </Link>
        <Link className={"link admin__link"} href="/admin/game-selection/edit">
          Редактировать или удалить
        </Link>
      </div>
      {children}
    </>
  );
}
