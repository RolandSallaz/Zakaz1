import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useErrorHandler from '../../hooks/useErrorHandler';
import { postGame, updateGame } from '../../services/api';
import { openSnackBar } from '../../services/slices/appSlice';
import { loadGames } from '../../services/slices/gameSlice';
import { IGameCreateDto, IGameUpdateDto } from '../../utils/types';
import { GameCard } from '../GameCard/GameCard';
import GameForm from '../GameForm/GameForm';
import { Lk } from '../Lk/Lk';
import SectionWithSearch from '../SectionWithSearch/SectionWithSearch';
import { SidePanel } from '../SidePanel/SidePanel';
import TagManager from '../TagManager/TagManager';
import './Admin.scss';
import SliderManager from '../SliderManager/SliderManager';

export default function Admin() {
  const navigate = useNavigate();
  const { games } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();
  const { handleError } = useErrorHandler();

  function handleAddGame(gameDto: IGameCreateDto) {
    postGame(gameDto)
      .then((game) => {
        dispatch(loadGames([...games, game]));
        dispatch(openSnackBar({ message: 'Игра успешно добавлена' }));
      })
      .catch(handleError);
  }

  function handleChangeGame(gameDto: IGameUpdateDto) {
    updateGame(gameDto)
      .then((game) => {
        const updatedArray = games.map((oldGame) => (game.id == oldGame.id ? game : oldGame));
        dispatch(loadGames(updatedArray));
        dispatch(openSnackBar({ message: 'Игра успешно обновлена' }));
      })
      .catch(handleError);
  }

  function handleSelectEditGame(name: string) {
    const game = games.find((item) => item.name == name);
    navigate(`games/edit/${game?.id}`);
  }

  return (
    <Lk additionalClass="admin">
      <SidePanel>
        <NavLink className={'link admin__link'} to="./games">
          Игры
        </NavLink>
        <NavLink className="link admin__link" to="./tags">
          Теги
        </NavLink>
        <NavLink className="link admin__link" to="./slider">
          Слайдер
        </NavLink>
        <NavLink className="link admin__link" to="./game-selection">
          Подборки игр
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
                  <Route path="add" element={<GameForm onSubmit={handleAddGame} />}></Route>
                  <Route
                    path="edit"
                    element={
                      <SectionWithSearch
                        onSelectSearch={handleSelectEditGame}
                        children={games.map((item) => (
                          <GameCard
                            game={item}
                            key={item.id}
                            customLink={`/admin/games/edit/${item.id}`}
                          />
                        ))}
                        options={games.map((item) => item.name)}
                      />
                    }></Route>
                  <Route
                    path="edit/:id"
                    element={<GameForm onSubmit={handleChangeGame} isEditing />}
                  />
                </Routes>
              </div>
            }
          />
          <Route path="tags" element={<TagManager />} />
          <Route path="slider" element={<SliderManager />} />
        </Routes>
      </div>
    </Lk>
  );
}
