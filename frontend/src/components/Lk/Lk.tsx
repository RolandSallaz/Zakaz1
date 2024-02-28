// @flow
import * as React from 'react';
import './Lk.scss';
import { Link } from 'react-router-dom';

type Props = {
  children?: React.ReactNode;
};

export function Lk({ children }: Props) {
  return (
    <main className={'main Lk'}>
      <Link className="link" to={'/'}>
        Вернуться на главную
      </Link>
      {children}
    </main>
  );
}
