"use client";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import Input from "../Input/Input";
import "./GameForm.scss";
import { IGame, IRequestError, ITag } from "@/app/lib/utils/types";
import useFormValidator from "@/app/lib/hooks/useFormValidator";
import useErrorHandler from "@/app/lib/hooks/useErrorHandler";
import { useAppDispatch } from "@/app/lib/hooks/redux";
import { useParams } from "next/navigation";
import { addTag, getAllTags, getGameById } from "@/app/lib/services/api";
import { openSnackBar } from "@/app/lib/services/slices/appSlice";
import { GameTag } from "../GameTag/GameTag";
const filter = createFilterOptions<{ name: string }>();
const addTagText = "Добавить тег ";

enum TAG_ACTION {
  add,
  remove,
}

interface IProps {
  isEditing?: boolean;
  onSubmit: (arg: any) => void;
  onDelete?: (arg: number) => void;
}
interface formValues {
  steamId: number;
  digiId: number;
}

export default function GameForm({ isEditing, onSubmit, onDelete }: IProps) {
  const [tags, setTags] = useState<ITag[]>([]);
  const [optionTags, setOptionTags] = useState<ITag[]>([]);

  const { values, handleChange, mutateValue } = useFormValidator<formValues>({
    steamId: 0,
    digiId: 0,
  });
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
  const { handleError } = useErrorHandler();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  function handleTagAdd(_e: SyntheticEvent<Element, Event>, newValue: ITag) {
    if (newValue == null) {
      return;
    }
    const newTag = { name: newValue.name.replace(addTagText, "") };
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
    const cbTagWhereToRemove =
      action == TAG_ACTION.add ? setOptionTags : setTags;

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

  useEffect(() => {
    async function getData() {
      try {
        const game: IGame = await getGameById(Number(id));
        setTags(game.tags); // установим теги
        setIsGameActive(game.enabled);
        mutateValue({ valueName: "steamId", value: game.steamId });
        mutateValue({ valueName: "digiId", value: game.digiId });
      } catch (err) {
        handleError(err as IRequestError);
      }
    }
    if (isEditing) {
      getData();
    }
  }, []);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    const gameDto = {
      id,
      steamId: Number(values.steamId),
      digiId: Number(values.digiId),
      enabled: isGameActive,
      tags,
    };
    onSubmit(gameDto);
  }

  function handleDelete() {
    if (onDelete && window.confirm(`Подвердить удаление товара ${id}`)) {
      onDelete(Number(id));
    }
  }

  return (
    <form className="GameForm" onSubmit={handleFormSubmit}>
      <h2 className="GameForm__heading">Основное лого игры</h2>
      <section className="GameForm__info GameForm__info_main">
        <div className="GameForm__container">
          {/* <label className={'GameForm__switch'}>
            Доступно для продажи
            <Switch name="gameEnabled" defaultChecked={true} onChange={handleSwitchChange} />
          </label> */}

          <Input
            name="steamId"
            additionalClass="GameForm__input"
            onChange={handleChange}
            required
            value={values.steamId}
            label="steamId"
          />

          <Input
            name="digiId"
            additionalClass="GameForm__input"
            onChange={handleChange}
            required
            value={values.digiId}
            label="Id товара на digiseller"
            type="number"
          />
        </div>
      </section>

      <section className="GameForm__info GameForm__info_addition">
        <div className="GameForm__tags">
          <Autocomplete
            options={optionTags}
            onChange={(event, value) => handleTagAdd(event, value as ITag)}
            getOptionLabel={(option: ITag | string) => {
              if (typeof option === "string") {
                return option; // если это строка, вернуть ее же
              }
              return option.name; // если это объект типа ITag, вернуть его свойство name
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              if (params.inputValue !== "") {
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
            renderInput={(params) => (
              <TextField {...params} label="Добавить тег" />
            )}
          />
          <div className="GameForm__tags_container">
            {tags.map((item) => (
              <GameTag
                tag={item}
                key={item.id || item.name}
                onClick={handleRemoveTag}
              />
            ))}
          </div>
        </div>
      </section>
      <button className="GameForm__submit" type="submit">
        Отправить
      </button>
      {isEditing && (
        <button
          type="button"
          className="GameForm__submit GameForm__submit_delete"
          onClick={handleDelete}
        >
          Удалить игру
        </button>
      )}
    </form>
  );
}
