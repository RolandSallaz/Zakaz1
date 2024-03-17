import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getChapterInfo } from '../../services/api';
import './InfoCHapter.scss';

interface props {
  heading: string;
  link: string;
}

export default function InfoChapter({ heading, link }: props) {
  const [paragraph, setParagraph] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getChapterInfo(link)
      .then((res) => {
        setParagraph(res.text);
      })
      .catch(console.log);
  }, [navigate]);

  return (
    <main className="main">
      <Link className="link" to={'/'}>
        Вернуться на главную
      </Link>
      <section className="InfoChapter">
        <h2 className="InfoChapter__heading">{heading}</h2>
        <p className="InfoChapter__paragraph" style={{ whiteSpace: 'pre-line' }}>
          {paragraph}
        </p>
      </section>
    </main>
  );
}
