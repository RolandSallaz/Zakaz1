import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useErrorHandler from '../../hooks/useErrorHandler';
import {
  addGameSelection,
  deleteGame,
  deleteGameSelection,
  loadGamesFromDigi,
  postGame,
  updateAllGames,
  updateGame,
  updateGameSelection
} from '../../services/api';
import { openSnackBar } from '../../services/slices/appSlice';
import { loadGameSelections } from '../../services/slices/gameSelectionSlice';
import { loadGames } from '../../services/slices/gameSlice';
import { INFOCHAPTER } from '../../utils/config';
import {
  IGameCreateDto,
  IGameSelectionDto,
  IGameSelectionUpdateDto,
  IGameUpdateDto
} from '../../utils/types';
import FooterChapterForm from '../FooterChapterForm/FooterChapterForm';
import { GameCard } from '../GameCard/GameCard';
import GameForm from '../GameForm/GameForm';
import GameSelectionForm from '../GameSelectionForm/GameSelectionForm';
import { Lk } from '../Lk/Lk';
import RobotsForm from '../RobotsForm/RobotsForm';
import SectionWithSearch from '../SectionWithSearch/SectionWithSearch';
import { SidePanel } from '../SidePanel/SidePanel';
import SliderManager from '../SliderManager/SliderManager';
import StatsPage from '../StatsPage/StatsPage';
import SystemInfo from '../SystemInfo/SystemInfo';
import TagManager from '../TagManager/TagManager';
import './Admin.scss';

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

  function handleLoadGamesFromDigi() {
    loadGamesFromDigi()
      .then((res) => {
        dispatch(openSnackBar({ message: `Добавлено ${res.length} новых игр` }));
        dispatch(loadGames([...games, ...res]));
      })
      .catch(handleError);
  }

  function handleUpdateAllGames() {
    const startTime = performance.now();
    updateAllGames()
      .then((res) => {
        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000;
        dispatch(
          openSnackBar({
            message: `Прошло времени ${duration.toFixed(2)} секунд. Игр успешно обновлено ${res.games.length}. ${res.errorUpdates.length ? 'Игр обновлено с ошибкой ' + res.errorUpdates.map((game) => game.name).join(', ') : ''}`
          })
        );
        dispatch(loadGames([...res.games, ...res.errorUpdates]));
      })
      .catch(handleError);
  }

  function handleDeleteGame(digiId: number) {
    deleteGame(digiId)
      .then(() => {
        dispatch(openSnackBar({ message: `Игра успешно удалена` }));
        dispatch(loadGames(games.filter((item) => item.digiId !== digiId)));
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
        <NavLink className="link admin__link" to="./info-chapter">
          Разделы с информацией
        </NavLink>
        <NavLink className="link admin__link" to="./system-info">
          Состояние сервера
        </NavLink>
        <NavLink className="link admin__link" to="./robots">
          robots.txt
        </NavLink>
        <NavLink className="link admin__link" to="./stats">
          Статистика
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
                  <NavLink className={'link admin__link'} to="./digiload">
                    Работа с Digiseller
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
                    }
                  />
                  <Route
                    path="edit/:id"
                    element={
                      <GameForm onSubmit={handleChangeGame} isEditing onDelete={handleDeleteGame} />
                    }
                  />
                  <Route
                    path="digiload"
                    element={
                      <div className="digiload">
                        <h2 className="digiload__heading">
                          Подгрузить все игры, у которых в описании присутствует ссылка на steam
                        </h2>
                        <div className="digiload__container">
                          <button onClick={handleLoadGamesFromDigi} className="digiload__button">
                            Подгрузить новые игры
                          </button>
                          <button onClick={handleUpdateAllGames} className="digiload__button">
                            Обновить все игры
                          </button>
                        </div>
                      </div>
                    }
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
                              onClick={() => handleDeleteGameSelection(item.id)}
                            >
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
          <Route
            path="info-chapter/*"
            element={
              <Routes>
                <Route
                  path="/"
                  element={INFOCHAPTER.map((item, index) => (
                    <Link className="link" key={index} to={`edit/${item.link}`}>
                      {item.name}
                    </Link>
                  ))}
                />
                <Route path="edit/:link" element={<FooterChapterForm />} />
              </Routes>
            }
          />
          <Route path="system-info" element={<SystemInfo />} />
          <Route path="robots" element={<RobotsForm />} />
          <Route path="stats" element={<StatsPage />} />
        </Routes>
      </div>
    </Lk>
  );
}
