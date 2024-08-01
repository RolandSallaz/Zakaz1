import Link from "next/link";
import "./AdminLink.scss";

export default function AdminLink() {
  return (
    <Link className="link AdminLink" href="/admin">
      Админка
    </Link>
  );
}
