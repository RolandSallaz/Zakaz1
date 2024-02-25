// @flow
import * as React from 'react';
import './GameCard.scss';
import {SyntheticEvent, useState} from "react";
import {Price} from "../Price/Price";
import {IPrice} from "../../utils/types";

type Props = {
    image: string,
    name: string,
    price: IPrice
};

export function GameCard({image, name, price,}: Props) {
    const [isHovered, setIsHovered] = useState<boolean>(false); //Состояние карточки, наведен ли на неё курсор

    function handleHover(e: SyntheticEvent) { //Функция, которая срабатывает при наведении и убирание мышки с карточки
        e.type == 'mouseenter' ? setIsHovered(true) : setIsHovered(false);
    }

    return (
        <div onMouseEnter={handleHover} onMouseLeave={handleHover} className={'gameCard'}>
            <div className={'gameCard__image-container'}>
                <img className={`gameCard__image ${isHovered && 'gameCard__image_hovered'}`}
                     src={'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1707435904'}
                     alt={'Изображение игры'}/>
                <Price price={price}/>
            </div>
            <h3 className={'gameCard__name'}>Dota 2</h3>
        </div>
    );
};