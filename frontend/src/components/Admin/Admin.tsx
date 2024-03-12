import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useErrorHandler from '../../hooks/useErrorHandler';
import {
  addGameSelection,
  deleteGameSelection,
  postGame,
  updateGame,
  updateGameSelection
} from '../../services/api';
import { openSnackBar } from '../../services/slices/appSlice';
import { loadGames } from '../../services/slices/gameSlice';
import {
  IGameCreateDto,
  IGameSelectionDto,
  IGameSelectionUpdateDto,
  IGameUpdateDto
} from '../../utils/types';
import { GameCard } from '../GameCard/GameCard';
import GameForm from '../GameForm/GameForm';
import GameSelectionForm from '../GameSelectionForm/GameSelectionForm';
import { Lk } from '../Lk/Lk';
import SectionWithSearch from '../SectionWithSearch/SectionWithSearch';
import { SidePanel } from '../SidePanel/SidePanel';
import SliderManager from '../SliderManager/SliderManager';
import TagManager from '../TagManager/TagManager';
import './Admin.scss';
import { loadGameSelections } from '../../services/slices/gameSelectionSlice';

export default function Admin() {
  const navigate = useNavigate();
  const { games } = useAppSelector((state) => state.games);
  const { gameSelections } = useAppSelector((state) => state.gameSelections);
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

  function handleDeleteGameSelection(id: number) {
    deleteGameSelection(id)
      .then(() => {
        dispatch(loadGameSelections(gameSelections.filter((item) => item.id !== id)));
        dispatch(openSnackBar({ message: 'Подборка успешно удалена' }));
      })
      .catch(handleError);
  }

  function handleAddGameSelection(dto: IGameSelectionDto) {
    addGameSelection(dto)
      .then((newItem) => {
        dispatch(loadGameSelections([...gameSelections, newItem]));
        dispatch(openSnackBar({ message: 'Подборка успешно добавлена' }));
      })
      .catch(handleError);
  }

  function handleUpdateGameSelection(dto: IGameSelectionUpdateDto) {
    updateGameSelection(dto)
      .then((updatedItem) => {
        dispatch(
          loadGameSelections(
            gameSelections.map((item) => (item.id == updatedItem.id ? updatedItem : item))
          )
        );
        dispatch(openSnackBar({ message: 'Подборка успешно обновлена' }));
      })
      .catch(handleError);
  }

  return (
    <Lk additionalClass="admin">
      <SidePanel>
        <NavLink className={'link admin__link'} to="./games/add">
          Игры
        </NavLink>
        <NavLink className="link admin__link" to="./tags">
          Теги
        </NavLink>
        <NavLink className="link admin__link" to="./slider">
          Слайдер
        </NavLink>
        <NavLink className="link admin__link" to="./game-selection/add">
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
                            customLink={`/admin/games/edit/${item.digiId}`}
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
          <Route path="tags/*" element={<TagManager />} />
          <Route path="slider/*" element={<SliderManager />} />
          <Route
            path="game-selection/*"
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
                  <Route
                    path="add/*"
                    element={<GameSelectionForm onSubmitForm={handleAddGameSelection} />}
                  />
                  <Route
                    path="edit"
                    element={
                      <div className="gameSelection">
                        {gameSelections?.map((item) => (
                          <div className="gameSelection__item" key={item.id}>
                            <Link to={`/admin/game-selection/edit/${item.id}`} className="link">
                              {item.name}
                            </Link>
                            <button
                              className="gameSelection__button"
                              onClick={() => handleDeleteGameSelection(item.id)}>
                              Удалить
                            </button>
                          </div>
                        ))}
                      </div>
                    }
                  />
                  <Route
                    path="edit/:id"
                    element={
                      <GameSelectionForm onSubmitForm={handleUpdateGameSelection} isEditing />
                    }
                  />
                </Routes>
              </div>
            }
          />
        </Routes>
      </div>
    </Lk>
  );
}
