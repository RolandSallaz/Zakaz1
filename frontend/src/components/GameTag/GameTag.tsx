// @flow
import * as React from 'react';
import './GameTag.scss';

type Props = {
    tag: string
};

export function GameTag({tag}: Props) {
    return (
        <p className={'GameTag'}>
            {tag}
        </p>
    );
};