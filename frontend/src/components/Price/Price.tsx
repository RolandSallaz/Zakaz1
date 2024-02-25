// @flow
import * as React from 'react';
import './Price.scss'
import {IPrice} from "../../utils/types";

type Props = {
    price: IPrice,
    isSlick?: boolean
};

export function Price({price: {discount, cost},isSlick}: Props) {
    return (
        <div className={`price ${isSlick && 'price_slick'}`}>
            {discount > 0 && (
                <>
                    <p className={'price__discount'}>{`-${discount}%`}</p>
                    <p className={'price__cost price__cost_old'}>{discount > 0 && cost}</p>
                </>
            )}
            <p className={`price__cost ${!discount && 'price__cost_no-discount'}`}> {/*Цена*/}
                {discount > 0 ? (cost - (cost * (discount / 100))) : cost}
            </p>
        </div>
    );
};