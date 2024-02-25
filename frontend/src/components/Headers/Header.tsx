// @flow
import * as React from 'react';

import './Header.scss';
import {Avatar, Button, IconButton, Menu, MenuItem} from "@mui/material";
import TestImage from '../../images/rmf.jpg';

type Props = {};

export function Header(props: Props) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl!);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <header className={'header'}>
            <input className={'search-input'} placeholder={'Найти среди 478 игр'}/>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar src={TestImage} sx={{width: '60px', height: '60px'}}></Avatar>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Покупки</MenuItem>
                <MenuItem onClick={handleClose}>Мой профиль</MenuItem>
                <MenuItem onClick={handleClose}>Выйти</MenuItem>
            </Menu>
        </header>
    );
};