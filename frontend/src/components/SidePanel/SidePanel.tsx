// @flow
import * as React from 'react';
import './SidePanel.scss';
import {Autocomplete, Slider, Switch, TextField} from "@mui/material";

type Props = {

};

export function SidePanel(props: Props) {
    const options = ['MOBA', 'Мультиплеер'];
    return (
        <aside className={'SidePanel'}> {/*боковая панель с фильтрами*/}
                <Autocomplete
                    disablePortal
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Жанр" />}
                />
                <label className={'SidePanel__discount-filter'}>Со скидкой <Switch slotProps={{ thumb: { className: 'my-thumb' } }} /></label>
            <label className={'SidePanel__price-filter'}>
                Цена: от 10 до 50 rub
                <Slider
                    defaultValue={[20, 37]}
                    min={0}
                    max={100}
                />
            </label>

        </aside>
    );
};