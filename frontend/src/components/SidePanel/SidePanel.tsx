// @flow
import * as React from 'react';
import './SidePanel.scss';
import { Autocomplete, Slider, Switch, TextField } from '@mui/material';

type Props = {
  children?: React.ReactNode;
};

export function SidePanel({ children }: Props) {
  return <aside className={'SidePanel'}>{children}</aside>;
}
