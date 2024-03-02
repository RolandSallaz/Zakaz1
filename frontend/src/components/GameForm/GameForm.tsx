import { Autocomplete, Switch, TextField, createFilterOptions } from '@mui/material';
import './GameForm.scss';
import { GameTag } from '../GameTag/GameTag';
import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { GameFormDto, ITag } from '../../utils/types';
import { addTag, getAllTags, postGame, postImage } from '../../services/api';
import useErrorHandler from '../../hooks/useErrorHandler';
import { useAppDispatch } from '../../hooks/redux';
import { openSnackBar } from '../../services/slices/appSlice';
import useFormValidator from '../../hooks/useFormValidator';
import { apiUrl } from '../../utils/config';
import CopySteamAppImage from '../CopySteamAppImage/CopySteamAppImage';
import Input from '../Input/Input';
const filter = createFilterOptions<{ name: string }>();
const addTagText = 'Добавить тег ';

enum TAG_ACTION {
  add,
  remove
}

interface formValues {
  name: string;
  description: string;
  price: number;
  discount: number;
  keys: string;
}

interface ImagesDto {
  gameLogo: string;
  screenshot1: string;
  screenshot2: string;
  screenshot3: string;
  screenshot4: string;
}

export default function GameForm() {
  const [tags, setTags] = useState<ITag[]>([]);
  const [optionTags, setOptionTags] = useState<ITag[]>([]);
  const [gameImages, setGameImages] = useState<ImagesDto>({
    gameLogo: '',
    screenshot1: '',
    screenshot2: '',
    screenshot3: '',
    screenshot4: ''
  });
  const { values, handleChange } = useFormValidator<formValues>({
    name: '',
    description: '',
    price: 0,
    discount: 0,
    keys: ''
  });
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
  const { handleError } = useErrorHandler();
  const dispatch = useAppDispatch();
  function handleTagAdd(event: SyntheticEvent<Element, Event>, newValue: ITag) {
    const formatedValue = newValue.name.replace(addTagText, '');
    const newTag = { name: formatedValue };
    tagManager(newTag, TAG_ACTION.add);
    if (!optionTags.some((item) => item.name == newTag.name)) {
      addTag(newTag)
        .then((newTag) => {
          dispatch(openSnackBar({ message: `${newTag.name} добавлен` }));
        })
        .catch((err) => {
          tagManager(newTag, TAG_ACTION.remove);
          handleError(err);
        });
    }
  }

  function tagManager(tag: ITag, action: TAG_ACTION) {
    const cbTagWhereToAdd = action == TAG_ACTION.add ? setTags : setOptionTags;
    const cbTagWhereToRemove = action == TAG_ACTION.add ? setOptionTags : setTags;

    cbTagWhereToAdd((prev) => [...prev, tag]);
    cbTagWhereToRemove((prev) => prev.filter((item) => item.name != tag.name));
  }

  useEffect(() => {
    getAllTags()
      .then((tags) => {
        // Создать множество уникальных тегов
        const uniqueTags = new Set([...optionTags, ...tags]);
        // Преобразовать множество обратно в массив
        setOptionTags(Array.from(uniqueTags));
      })
      .catch(handleError);
  }, []);

  function handleRemoveTag(tag: ITag) {
    tagManager(tag, TAG_ACTION.remove);
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    formData.append('file', e.target.files![0]);
    postImage(formData)
      .then((image) => {
        setGameImages({ ...gameImages, [e.target.name]: image.path });
      })
      .catch(handleError);
  };

  function handleSwitchChange(e: ChangeEvent<HTMLInputElement>) {
    setIsGameActive(e.target.checked);
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    const gameDto = {
      name: values.name,
      description: values.description,
      price: Number(values.price),
      logo: gameImages.gameLogo,
      screenshots: [
        gameImages.screenshot1,
        gameImages.screenshot2,
        gameImages.screenshot3,
        gameImages.screenshot4
      ],
      discount: values.discount,
      enabled: isGameActive,
      keys: values.keys.split('\n'),
      tags
    };

    postGame(gameDto)
      .then(() => {
        dispatch(openSnackBar({ message: 'Игра успешно добавлена' }));
      })
      .catch(handleError);
  }

  return (
    <form className="GameForm" onSubmit={handleFormSubmit}>
      <h2 className="GameForm__heading">Основное лого игры</h2>
      <section className="GameForm__info GameForm__info_main">
        <label className="GameForm__image-file GameForm__image-file_logo">
          <input
            name="gameLogo"
            type="file"
            accept="image/*"
            className="GameForm__file"
            onChange={handleFileInputChange}
            required
          />
          {gameImages.gameLogo && (
            <img className="GameForm__img" src={`${apiUrl}/${gameImages.gameLogo}`} />
          )}
        </label>
        <CopySteamAppImage />
        <div className="GameForm__container">
          <Input
            name="name"
            additionalClass="GameForm__input GameForm__input_name"
            onChange={handleChange}
            required
            value={values.name}
            label="Имя"
          />
          <h2 className="GameForm__heading">Скриншоты</h2>
          <div className="GameForm__screenshots-container">
            {[1, 2, 3, 4].map((index) => (
              <label key={index} className="GameForm__image-file">
                <input
                  name={`screenshot${index}`}
                  type="file"
                  accept="image/*"
                  className="GameForm__file"
                  onChange={handleFileInputChange}
                  required
                />
                {gameImages[`screenshot${index}`] && (
                  <img
                    className="GameForm__img"
                    src={`${apiUrl}/${gameImages[`screenshot${index}`]}`}
                    alt={`Screenshot ${index}`}
                  />
                )}
              </label>
            ))}
          </div>
        </div>
      </section>
      <section className="GameForm__info GameForm__info_addition">
        <div className="GameForm__tags">
          <Autocomplete
            options={optionTags}
            onChange={handleTagAdd}
            getOptionLabel={(option: ITag) => option.name as string} // Добавляем это свойство
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              if (params.inputValue !== '') {
                filtered.push({ name: `${addTagText}${params.inputValue}` });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => <TextField {...params} label="Добавить тег" />}
          />
          <div className="GameForm__tags_container">
            {tags.map((item) => (
              <GameTag tag={item} key={item.id || item.name} onClick={handleRemoveTag} />
            ))}
          </div>
        </div>
        <div>
          <Input
            name="description"
            additionalClass="GameForm__input"
            onChange={handleChange}
            required
            value={values.description}
            label="Описание"
            isTextArea
          />
          <Input
            name="price"
            additionalClass="GameForm__input"
            onChange={handleChange}
            required
            value={values.price}
            label="Цена"
            type="number"
          />
          <Input
            name="discount"
            additionalClass="GameForm__input"
            onChange={handleChange}
            required
            value={values.discount}
            label="Скидка %"
            type="number"
          />
          <label className={'GameForm__switch'}>
            Доступно для продажи
            <Switch name="gameEnabled" defaultChecked={true} onChange={handleSwitchChange} />
          </label>
          <Input
            name="keys"
            additionalClass="GameForm__input"
            onChange={handleChange}
            required
            value={values.keys}
            label="Ключи: 1 строка - 1 ключ"
            isTextArea
            countRow
          />
        </div>
      </section>
      <button className="GameForm__submit" type="submit">
        Отправить
      </button>
    </form>
  );
}
