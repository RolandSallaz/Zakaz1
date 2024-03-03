// @flowimport { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logOut, openSnackBar } from '../../services/slices/appSlice';
import { ROLES } from '../../utils/types';
import './Header.scss';

export function Header() {
  const { loggedIn, user } = useAppSelector((state) => state.app);
  const { games } = useAppSelector((state) => state.games);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl!);
  const dispatch = useAppDispatch();
  function handleClick(event: MouseEvent<HTMLElement>) {
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
      <input className={'search-input'} placeholder={`Найти среди ${games.length} игр`} />
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <Avatar sx={{ width: '60px', height: '60px' }}></Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {loggedIn && (
          <div>
            <MenuItem
              onClick={() => {
                navigate('/');
                handleClose();
              }}>
              На главную
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/lk');
                handleClose();
              }}>
              Мои Покупки
            </MenuItem>

            {user.role == 'admin' && (
              <MenuItem
                onClick={() => {
                  navigate('/admin');
                  handleClose();
                }}>
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
