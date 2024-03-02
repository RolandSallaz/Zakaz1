import React, { SyntheticEvent } from 'react';
import './Tab.scss';

interface props {
  text: string;
  onClick: (tab: number) => void;
  tab: number;
  currentTab: number;
}

export default function Tab({ text, onClick, tab, currentTab }: props) {
  function handleClick() {
    onClick(tab);
  }
  return (
    <button className={`button tab ${currentTab == tab && 'tab_active'}`} onClick={handleClick}>
      {text}
    </button>
  );
}
