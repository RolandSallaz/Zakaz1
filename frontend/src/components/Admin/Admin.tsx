import { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { checkAdminAuth } from '../../services/api';

import { Lk } from '../Lk/Lk';
import { SidePanel } from '../SidePanel/SidePanel';
import './Admin.scss';
import GameForm from '../GameForm/GameForm';

enum ADMIN_TABS {
  games,
  tags,
  statistic
}

enum ADMIN_SUBTABS {
  add,
  editOrDelete
}

export default function Admin() {
  const [adminSubTab, setAdminSubTab] = useState<ADMIN_SUBTABS>(ADMIN_SUBTABS.editOrDelete);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    checkAdminAuth(token!).catch(() => {
      // navigate('/');
    });
  }, []);

  return (
    <Lk additionalClass="admin">
      <SidePanel>
        <NavLink className={'link admin__link'} to="./games">
          Игры
        </NavLink>
        <NavLink className="link admin__link" to="./tags">
          Теги
        </NavLink>
      </SidePanel>
      <div className="admin__container">
        <Routes>
          <Route
            path="games/*"
            element={
              <div>
                <div className="admin__sub-tabs">
                  <NavLink className={'link admin__link'} to="./add">
                    Добавить
                  </NavLink>
                  <NavLink className={'link admin__link'} to="./edit">
                    Редактировать или удалить
                  </NavLink>
                </div>
                <Routes>
                  <Route path="add" element={<GameForm />}></Route>
                </Routes>
              </div>
            }
          />
          <Route path="tags" element={<p>2</p>} />
        </Routes>
      </div>
    </Lk>
  );
}
