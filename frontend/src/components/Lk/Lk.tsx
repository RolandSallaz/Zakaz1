// @flow
import * as React from 'react';
import './Lk.scss';
import { Link } from 'react-router-dom';

type Props = {
  children?: React.ReactNode;
  additionalClass?: string;
};

export function Lk({ children, additionalClass }: Props) {
  return (
    <main className={`main Lk ${additionalClass}`}>
      <Link className="link Lk__link" to={'/'}>
        Вернуться на главную
      </Link>
      <div className="main__container">{children}</div>
    </main>
  );
}
