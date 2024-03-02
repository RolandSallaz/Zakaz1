// @flow
import * as React from 'react';
import './GameTag.scss';
import { ITag } from '../../utils/types';

type Props = {
  tag: ITag;
  onClick?: (tag: ITag) => void;
};

export function GameTag({ tag, onClick }: Props) {
  function handleClick() {
    if (onClick) {
      onClick(tag);
    }
  }

  return (
    <p onClick={handleClick} className={'GameTag'} style={onClick && { cursor: 'pointer' }}>
      {tag.name}
    </p>
  );
}
