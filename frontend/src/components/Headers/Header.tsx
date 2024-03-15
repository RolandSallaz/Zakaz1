// @flowimport { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { IGame } from '../../utils/types';
import LastSales from '../LastSales/LastSales';
import './Header.scss';

export function Header() {
  // const { loggedIn, user } = useAppSelector((state) => state.app);
  const { games } = useAppSelector((state) => state.games);
  const [search, setSearch] = useState<string>('');
  const [filteredGames, setFilteredGames] = useState<IGame[]>([]);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const navigate = useNavigate();
  // const open = Boolean(anchorEl!);
  // const dispatch = useAppDispatch();
  // function _handleClick(event: MouseEvent<HTMLElement>) {
  //   if (loggedIn) {
  //     setAnchorEl(event.currentTarget);
  //   } else {
  //     navigate('/lk');
  //   }
  // }

  // function handleClose() {
  //   setAnchorEl(null);
  // }
  // function handleSignOut() {
  //   dispatch(openSnackBar({ message: 'Вы вышли из аккаунта' }));
  //   handleClose();
  //   localStorage.removeItem('jwt');
  //   navigate('/');
  //   dispatch(logOut());
  // }
  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    function addEvent() {
      document.addEventListener('click', (e: MouseEvent) => {
        const isTrue: boolean = e.target == searchRef.current;
        setSearchFocused(isTrue);
        if (!isTrue) {
          setSearch('');
        }
      });
    }
    addEvent();
    return () => document.removeEventListener('click', addEvent);
  }, []);

  useEffect(() => {
    setFilteredGames(
      games.filter((game) => game.name.toLowerCase().startsWith(search.toLowerCase())).slice(0, 5)
    );
  }, [search, searchFocused]);

  return (
    <header className={'header'}>
      <h1 className="header__heading">
        магазин ключей Steam, купить ключи игр, дешевые ключи Steam, акционные предложения игр,
        онлайн магазин игровых ключей, купить игры по скидке
      </h1>
      <div className="header__container">
        <Link className="link header__link header__link_logo" to="/">
          {import.meta.env.VITE_SHOP_NAME || 'названием магазина'}
        </Link>
        <label className="search">
          <>
            <input
              onChange={handleChangeSearch}
              value={search}
              className={'search__input'}
              placeholder={`Найти среди ${games.length} игр`}
              ref={searchRef}
            />
            {filteredGames.length > 0 && searchFocused && (
              <div className="search__container">
                {filteredGames.map((game) => (
                  <Link key={game.digiId} className="search__link" to={`/games/${game.digiId}`}>
                    {game.name}
                  </Link>
                ))}
              </div>
            )}
          </>
        </label>
        {/* <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <Avatar sx={{ width: '60px', height: '60px' }}></Avatar>
      </IconButton> */}
        <a
          className="link header__link"
          href="https://digiseller.market/info/?lang=ru-RU"
          target="_blank">
          Мои покупки
        </a>
        {/* <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
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
        
      </Menu> */}
      </div>
      {/* <h1 className={'header__heading'}>Купить ключи STEAM.</h1> */}
      <LastSales />
    </header>
  );
}
