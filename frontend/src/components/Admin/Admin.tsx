import { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { checkAdminAuth } from '../../services/api';

import { Lk } from '../Lk/Lk';
import { SidePanel } from '../SidePanel/SidePanel';
import './Admin.scss';
import GameForm from '../GameForm/GameForm';
import SectionWithSearch from '../SectionWithSearch/SectionWithSearch';
import { useAppSelector } from '../../hooks/redux';
import { GameCard } from '../GameCard/GameCard';

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
  const { games } = useAppSelector((state) => state.games);

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
                  <Route
                    path="edit"
                    element={
                      <SectionWithSearch
                        children={games.map((item) => (
                          <GameCard game={item} key={item.id} />
                        ))}
                        options={games.map((item) => item.name)}
                      />
                    }></Route>
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
