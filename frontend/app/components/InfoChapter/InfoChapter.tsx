"use client";
import Link from "next/link";
import "./InfoCHapter.scss";

interface props {
  heading: string;
  text: string;
}

export default function InfoChapter({ heading, text }: props) {
  return (
    <main className="main">
      <Link className="link" href={"/"}>
        Вернуться на главную
      </Link>
      <section className="InfoChapter">
        <h2 className="InfoChapter__heading">{heading}</h2>
        {/* <p className="InfoChapter__paragraph" style={{ whiteSpace: 'pre-line' }}>
          {paragraph}
        </p> */}
        <p
          className="InfoChapter__paragraph"
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />
      </section>
    </main>
  );
}
