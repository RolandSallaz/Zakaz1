// @flow
import * as React from 'react';
import './SidePanel.scss';

type Props = {
  children?: React.ReactNode;
};

export function SidePanel({ children }: Props) {
  return <aside className={'SidePanel'}>{children}</aside>;
}
