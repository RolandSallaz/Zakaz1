import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import useFormValidator from '../../hooks/useFormValidator';
import { IGameSelectionDto } from '../../utils/types';
import Input from '../Input/Input';
import './GameSelectionForm.scss';

interface formValues {
  name: string;
}

interface IGameSelectionState {
  index: number;
  gameId: number;
}

interface IGameSelectionInitState extends Omit<IGameSelectionState, 'gameId'> {
  gameId?: number;
}

interface props {
  onSubmitForm: (arg: any) => void;
  isEditing?: boolean;
}

export default function GameSelectionForm({ onSubmitForm, isEditing }: props) {
  const { values, handleChange, mutateValue } = useFormValidator<formValues>({
    name: ''
  });

  const [gamesInSelection, setGamesInSelection] = useState<IGameSelectionInitState[]>([]);
  const { games } = useAppSelector((state) => state.games);
  const { gameSelections } = useAppSelector((state) => state.gameSelections);
  const { id } = useParams();
  function handleAddNewGame() {
    setGamesInSelection((prev) => [...prev, { index: prev.length }]);
  }

  function handleDeleteGameFromArray(itemIndex: number) {
    setGamesInSelection((prev) => prev.filter((item) => item.index != itemIndex));
  }

  function handleChangeGameInArray(updatedItem: IGameSelectionState) {
    setGamesInSelection((prev) =>
      prev.map((item) => (item.index == updatedItem.index ? updatedItem : item))
    );
  }

  function handleSubmitForm(e: FormEvent) {
    e.preventDefault();
    if (gamesInSelection.length) {
      const dto = {
        id,
        name: values.name,
        games: gamesInSelection.map((item) => item.gameId)
      } as IGameSelectionDto;
      onSubmitForm(dto);
    }
  }

  useEffect(() => {
    if (isEditing) {
      const gameSelection = gameSelections.find((item) => item.id == Number(id));
      if (gameSelection) {
        mutateValue({ valueName: 'name', value: gameSelection.name });
        setGamesInSelection(
          gameSelection.games?.map((item, index) => ({ index, gameId: item.digiId }))
        );
      }
    }
  }, []);

  return (
    <form className="GameSelectionForm" onSubmit={handleSubmitForm}>
      <Input
        name="name"
        additionalClass="GameSelectionForm__input"
        onChange={handleChange}
        required
        value={values.name}
        label="Название"
      />

      {gamesInSelection?.map((item) => (
        <div key={item.index} className="select-container">
          <select
            value={item.gameId}
            name={String(item.index)}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleChangeGameInArray({ index: item.index, gameId: Number(e.target.value) })
            }
            required>
            <option value={''}>Выбрать игру</option>
            {games?.map((game) => (
              <option key={game.id} value={game.digiId}>
                {game.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="button GameSelectionForm__button"
            onClick={() => handleDeleteGameFromArray(item.index)}>
            Удалить
          </button>
        </div>
      ))}
      <button type="button" className="button GameSelectionForm__button" onClick={handleAddNewGame}>
        +
      </button>
      <button type="submit" className="button GameSelectionForm__button">
        Отправить
      </button>
    </form>
  );
}
