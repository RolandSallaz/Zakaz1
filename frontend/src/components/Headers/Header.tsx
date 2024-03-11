// @flowimport { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import './Header.scss';

export function Header() {
  // const { loggedIn, user } = useAppSelector((state) => state.app);
  const { games } = useAppSelector((state) => state.games);
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
  return (
    <header className={'header'}>
      <div className="header__container">
        <Link className="link header__link header__link_logo" to="/">
          {import.meta.env.VITE_SHOP_NAME || 'названием магазина'}
        </Link>
        <input className={'search-input'} placeholder={`Найти среди ${games.length} игр`} />
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
      <h1 className={'header__heading'}>Купить ключи STEAM.</h1>
    </header>
  );
}
