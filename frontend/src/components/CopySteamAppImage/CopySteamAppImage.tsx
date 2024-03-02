import { ChangeEvent, useState } from 'react';
import './CopySteamAppImage.scss';
import Input from '../Input/Input';

export default function CopySteamAppImage() {
  const [appId, setAppId] = useState<number>('');

  function handleAppidChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (isNaN(Number(value))) {
      return;
    }
    setAppId(value);
  }

  function onButtonClick() {
    window
      .open(`https://cdn.akamai.steamstatic.com/steam/apps/${appId}/capsule_616x353.jpg`, '_blank')
      ?.focus();
  }

  return (
    <div className="CopySteamAppImage">
      <Input
        name="steamId"
        additionalClass="CopySteamAppImage__input"
        onChange={handleAppidChange}
        value={appId!}
        label="SteamAppId"
        type="number"
      />
      <button
        type="button"
        className="CopySteamAppImage__button"
        onClick={onButtonClick}
        disabled={!appId}>
        Получить ссылку на изображение со стима
      </button>
    </div>
  );
}
