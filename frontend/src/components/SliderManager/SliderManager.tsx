import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './SliderManager.scss';
import { addSlider, deleteSlider, updateSlider } from '../../services/api';
import useErrorHandler from '../../hooks/useErrorHandler';
import { IUpdateSliderDto } from '../../utils/types';
import { loadSliders } from '../../services/slices/sliderSlice';
import { openSnackBar } from '../../services/slices/appSlice';

export default function SliderManager() {
  const { games } = useAppSelector((state) => state.games);
  const { sliders } = useAppSelector((state) => state.sliders);
  const [newSliderGameId, setNewSliderGameId] = useState<number>();
  const { handleError } = useErrorHandler();
  const dispatch = useAppDispatch();
  function handleChangeSelect(e: ChangeEvent<HTMLSelectElement>) {
    const value = Number(e.target.value);
    setNewSliderGameId(value);
  }

  function handleAddSliderSubmit(e: FormEvent) {
    e.preventDefault();
    if (newSliderGameId) {
      addSlider(newSliderGameId)
        .then((slider) => {
          dispatch(openSnackBar({ message: 'Слайдер сохранен' }));
          dispatch(loadSliders([...sliders, slider]));
        })
        .catch(handleError);
    }
  }

  function handleUpdateSlider(data: IUpdateSliderDto) {
    updateSlider(data)
      .then((slider) => {
        dispatch(openSnackBar({ message: 'Слайдер обновлен' }));
        dispatch(
          loadSliders(sliders.map((oldSlider) => (oldSlider.id == slider.id ? slider : oldSlider)))
        );
      })
      .catch(handleError);
  }

  function handleDeleteSlider(sliderId: number) {
    deleteSlider(sliderId)
      .then((deletedSlider) => {
        dispatch(openSnackBar({ message: 'Игра удалена из слайдера' }));
        dispatch(loadSliders(sliders.filter((slider) => slider.id !== deletedSlider.id)));
      })
      .catch(handleError);
  }

  return (
    <section className="SliderManager">
      <p className="SliderManager__warning">Игр в слайдере должно быть 2 или больше</p>
      <ul className="SliderManager__list">
        {sliders.map((slider) => (
          <li className="SliderManager__list-item" key={slider.id}>
            <select
              name="slider"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleUpdateSlider({ sliderId: slider.id, gameId: Number(e.target.value) })
              }
            >
              <option value={''}>{slider.game.name}</option>
              {games?.map((game) => (
                <option key={game.digiId} value={game.digiId}>
                  {game.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="SliderManager__button"
              onClick={() => handleDeleteSlider(slider.id)}
            >
              Удалить слайдер
            </button>
          </li>
        ))}
        <li className="SliderManager__list-item">
          <form className="SliderManager__form" onSubmit={handleAddSliderSubmit}>
            <select name="newSlider" onChange={handleChangeSelect} required value={newSliderGameId}>
              <option value="">Выберите игру</option>
              {games.map((game) => (
                <option key={game.digiId} value={game.digiId}>
                  {game.name}
                </option>
              ))}
            </select>
            <button className="SliderManager__button">Добавить слайдер</button>
          </form>
        </li>
      </ul>
    </section>
  );
}
