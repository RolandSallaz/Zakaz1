"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../Input/Input";
import "./TagManager.scss";
import { Autocomplete, TextField } from "@mui/material";
import { ITag } from "@/app/lib/utils/types";
import { loadTags } from "@/app/lib/services/slices/tagSlice";
import { openSnackBar } from "@/app/lib/services/slices/appSlice";
import { addTag, deleteTag, updateTag } from "@/app/lib/services/api";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks/redux";
import useErrorHandler from "@/app/lib/hooks/useErrorHandler";

export default function TagManager() {
  const [newTag, setNewTag] = useState<string>("");
  const [tagToRename, setTagToRename] = useState<ITag | null>(null);
  const [newTagName, setNewTagName] = useState<string>("");
  const [tagToDelete, setTagToDelete] = useState<ITag | null>(null);

  const { handleError } = useErrorHandler();
  const { tags } = useAppSelector((state) => state.tags);
  const dispatch = useAppDispatch();
  const tagList = tags.map((tag) => JSON.stringify(tag));
  function handleNewTagChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setNewTag(value);
  }

  function handleAddTagSubmit(e: FormEvent) {
    e.preventDefault();
    addTag({ name: newTag })
      .then((tag) => {
        dispatch(openSnackBar({ message: "Тег успешно добавлен" }));
        dispatch(loadTags([...tags, tag]));
      })
      .catch(handleError);
  }

  function handleChangeEditTag(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setNewTagName(value);
  }

  function handleRenameTagSubmit(e: FormEvent) {
    e.preventDefault();
    if (tagToRename) {
      updateTag(tagToRename.id!, newTagName)
        .then((tag) => {
          dispatch(
            openSnackBar({
              message: `Тег ${tagToRename.name} переименован в ${newTagName}`,
            })
          );
          dispatch(
            loadTags(tags.map((oldTag) => (oldTag.id == tag.id ? tag : oldTag)))
          );
        })
        .catch(handleError);
    }
  }

  function handleDeleteTagSubmit(e: FormEvent) {
    e.preventDefault();
    if (tagToDelete) {
      deleteTag(tagToDelete.id!)
        .then((deletedTag) => {
          dispatch(openSnackBar({ message: `Тег ${deletedTag.name} удален` }));
          dispatch(loadTags(tags.filter((tag) => tag.id != deletedTag.id)));
        })
        .catch(handleError);
    }
  }

  return (
    <section className="TagManager">
      <form className="TagManager__form" onSubmit={handleAddTagSubmit}>
        <Input
          name="newGame"
          value={newTag}
          onChange={handleNewTagChange}
          label="Название тега"
          additionalClass="TagManager__input"
          required
        />
        <button className="TagManager__button">Создать</button>
      </form>
      <form className="TagManager__form" onSubmit={handleRenameTagSubmit}>
        <Autocomplete
          onChange={(_event: any, newValue: string | null) => {
            if (newValue) {
              setTagToRename(JSON.parse(newValue) as ITag);
            } else {
              setTagToRename(null);
            }
          }}
          disablePortal
          options={tagList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Старый тег" required />
          )}
        />
        <Input
          name="newGame"
          value={newTagName}
          onChange={handleChangeEditTag}
          label="Новое название тега"
          additionalClass="TagManager__input"
          required
        />
        <button className="TagManager__button">Переименовать</button>
      </form>
      <form className="TagManager__form" onSubmit={handleDeleteTagSubmit}>
        <Autocomplete
          onChange={(_event: any, newValue: string | null) => {
            if (newValue) {
              setTagToDelete(JSON.parse(newValue) as ITag);
            } else {
              setTagToDelete(null);
            }
          }}
          disablePortal
          options={tagList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Удалить тег" required />
          )}
        />
        <button className="TagManager__button">Удалить</button>
      </form>
    </section>
  );
}
