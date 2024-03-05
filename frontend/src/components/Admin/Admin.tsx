import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useErrorHandler from '../../hooks/useErrorHandler';
import { postGame, updateGame } from '../../services/api';
import { openSnackBar } from '../../services/slices/appSlice';
import { loadGames } from '../../services/slices/gameSlice';
import { IGame, IGameCreateDto, IGameUpdateDto } from '../../utils/types';
import { GameCard } from '../GameCard/GameCard';
import GameForm from '../GameForm/GameForm';
import { Lk } from '../Lk/Lk';
import SectionWithSearch from '../SectionWithSearch/SectionWithSearch';
import { SidePanel } from '../SidePanel/SidePanel';
import './Admin.scss';

export default function Admin() {
  const navigate = useNavigate();
  const { games } = useAppSelector((state) => state.games);
  const dispatch = useAppDispatch();
  const { handleError } = useErrorHandler();

  function handleAddGame(gameDto: IGameCreateDto) {
    postGame(gameDto)
      .then((game) => {
        addOrUpdateGame(game);
        dispatch(openSnackBar({ message: 'Игра успешно добавлена' }));
      })
      .catch(handleError);
  }

  function handleChangeGame(gameDto: IGameUpdateDto) {
    updateGame(gameDto)
      .then((game) => {
        addOrUpdateGame(game);
        dispatch(openSnackBar({ message: 'Игра успешно обновлена' }));
      })
      .catch(handleError);
  }

  function handleClickOnGame(id: number) {
    navigate(`games/edit/${id}`);
  }

  function addOrUpdateGame(game: IGame) {
    const updatedArray = games.map((oldGame) => (game.id == oldGame.id ? game : oldGame));
    dispatch(loadGames(updatedArray));
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
                        children={games.map((item) => (
                          <GameCard game={item} key={item.id} onCardClick={handleClickOnGame} />
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
          <Route path="tags" element={<p>2</p>} />
        </Routes>
      </div>
    </Lk>
  );
}
