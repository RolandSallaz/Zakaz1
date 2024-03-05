import { ChangeEvent, ReactNode, useState } from 'react';
import Input from '../Input/Input';
import './CopySteamAppImage.scss';

interface props {
  appId: number;
  children: ReactNode;
}

export default function CopySteamAppImage({ appId, children }: props) {
  function onButtonClick() {
    window
      .open(`https://cdn.akamai.steamstatic.com/steam/apps/${appId}/capsule_616x353.jpg`, '_blank')
      ?.focus();
  }

  return (
    <div className="CopySteamAppImage">
      {children}
      <button
        type="button"
        className="CopySteamAppImage__button"
        onClick={onButtonClick}
        disabled={!appId}>
        Открыть изображение со стима в новой вкладке
      </button>
    </div>
  );
}
