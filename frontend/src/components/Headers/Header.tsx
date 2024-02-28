// @flow
import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logOut, openSnackBar } from '../../services/slices/appSlice';
import { ROLES } from '../../utils/types';
type Props = {};

export function Header(props: Props) {
  const { loggedIn, user } = useAppSelector((state) => state.app);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl!);
  const dispatch = useAppDispatch();
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (loggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate('/lk');
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }
  function handleSignOut() {
    dispatch(openSnackBar({ message: 'Вы вышли из аккаунта' }));
    handleClose();
    localStorage.removeItem('jwt');
    navigate('/');
    dispatch(logOut());
  }
  return (
    <header className={'header'}>
      <input className={'search-input'} placeholder={'Найти среди 478 игр'} />
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ width: '60px', height: '60px' }}></Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {loggedIn && (
          <div>
            <MenuItem
              onClick={() => {
                navigate('/lk');
                handleClose();
              }}
            >
              Мои Покупки
            </MenuItem>
            {user.role == ROLES.ADMIN && (
              <MenuItem
                onClick={() => {
                  navigate('/admin');
                  handleClose();
                }}
              >
                Админка
              </MenuItem>
            )}
            <MenuItem onClick={handleSignOut}>Выйти</MenuItem>
          </div>
        )}
      </Menu>
    </header>
  );
}
