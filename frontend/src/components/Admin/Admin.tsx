import { useEffect, useState } from 'react';
import './Admin.scss';
import { checkAdminAuth } from '../../services/api';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Lk } from '../Lk/Lk';
import { SidePanel } from '../SidePanel/SidePanel';

enum ADMIN_TABS {
  addGame,
  editGame,
  statistic
}

export default function Admin() {
  const [adminTab, setAdminTab] = useState<ADMIN_TABS>(ADMIN_TABS.statistic);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    checkAdminAuth(token!).catch(() => {
      navigate('/');
    });
  }, []);
  return (
    <Lk>
      <section className="admin">
        <SidePanel>
          <Link to={'./add_game'} className="link">
            Добавить игру
          </Link>
          <Link className="link">Редактировать игру</Link>
          <Link className="link">Коды</Link>
          <Link className="link">test</Link>
        </SidePanel>
        {adminTab == ADMIN_TABS.addGame && <p>2</p>}
      </section>
    </Lk>
  );
}
