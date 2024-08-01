"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import "./SupportForm.scss";
import useFormValidator from "@/app/lib/hooks/useFormValidator";
import { ISupportTickedDto } from "@/app/lib/utils/types";
import useErrorHandler from "@/app/lib/hooks/useErrorHandler";
import { useAppDispatch } from "@/app/lib/hooks/redux";
import { postImage, sendSupportTicked } from "@/app/lib/services/api";
import { openSnackBar } from "@/app/lib/services/slices/appSlice";
import Link from "next/link";
import Input from "../Input/Input";

export default function SupportForm() {
  const { values, handleChange, mutateValue } =
    useFormValidator<ISupportTickedDto>({
      shortDescription: "",
      email: "",
      imageLink: "",
      trouble: "",
    });
  const { handleError } = useErrorHandler();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("file", e.target.files![0]);
    postImage(formData)
      .then((image) => {
        mutateValue({ valueName: "imageLink", value: image.path });
      })
      .catch(handleError);
  };

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    sendSupportTicked(values)
      .then(({ message }) => {
        setIsLoading(false);
        dispatch(openSnackBar({ message }));
      })
      .catch((err) => {
        handleError(err);
        setIsLoading(false);
      });
  }

  return (
    <main className="main">
      <Link className="link " href={"/"}>
        Вернуться на главную
      </Link>
      <form className="SupportForm" onSubmit={handleFormSubmit}>
        <h2 className="SupportForm__heading">Форма обратной связи</h2>
        <Input
          name={"shortDescription"}
          value={values.shortDescription}
          onChange={handleChange}
          label="Краткое описание проблемы"
          required
          additionalClass="SupportForm__input"
          width="100%"
        />
        <div className="SupportForm__container">
          <Input
            name={"email"}
            value={values.email}
            onChange={handleChange}
            label="Контактный email"
            required
            additionalClass="SupportForm__input"
            type="email"
            width="100%"
          />
          <label className="SupportForm__image-file">
            <input
              name="gameLogo"
              type="file"
              accept="image/*"
              className="SupportForm__file"
              onChange={handleFileInputChange}
            />
            {values.imageLink
              ? "Изображение загружено"
              : "Загрузить изображение"}
          </label>
        </div>
        <Input
          name={"trouble"}
          value={values.trouble}
          onChange={handleChange}
          label="Опишите проблему"
          required
          additionalClass="SupportForm__input SupportForm__input_textarea"
          isTextArea
          width="100%"
        />
        <button className="SupportForm__button" disabled={isLoading}>
          Отправить
        </button>
      </form>
    </main>
  );
}
