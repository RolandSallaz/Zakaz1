// @flow
import * as React from 'react';
import './Footer.scss';

type Props = {};

export function Footer(props: Props) {

    const year = new Date().getFullYear();
    return (
        <footer className={'footer'}>
            <p className={'footer__copy'}>&#169;{`${year} названиеМагазина`}</p>
        </footer>
    );
};