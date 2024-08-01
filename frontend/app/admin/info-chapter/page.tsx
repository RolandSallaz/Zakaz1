import { INFOCHAPTER } from "@/app/lib/utils/config";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <>
      {Object.entries(INFOCHAPTER).map(([key, item], index) => (
        <li key={key}>
          <Link className="link" href={`/admin/info-chapter/edit/${item.link}`}>
            {item.name}
          </Link>
        </li>
      ))}
    </>
  );
}
