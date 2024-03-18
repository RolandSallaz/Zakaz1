import { ChangeEvent, FormEvent, useState } from 'react';
import useFormValidator from '../../hooks/useFormValidator';
import Input from '../Input/Input';
import './SupportForm.scss';
import { postImage, sendSupportTicked } from '../../services/api';
import useErrorHandler from '../../hooks/useErrorHandler';
import { Link } from 'react-router-dom';
import { ISupportTickedDto } from '../../utils/types';
import { useAppDispatch } from '../../hooks/redux';
import { openSnackBar } from '../../services/slices/appSlice';

export default function SupportForm() {
  const { values, handleChange, mutateValue } = useFormValidator<ISupportTickedDto>({
    shortDescription: '',
    email: '',
    imageLink: '',
    trouble: ''
  });
  const { handleError } = useErrorHandler();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append('file', e.target.files![0]);
    postImage(formData)
      .then((image) => {
        mutateValue({ valueName: 'imageLink', value: image.path });
      })
      .catch(handleError);
  };

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(values);
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
      <Link className="link " to={'/'}>
        Вернуться на главную
      </Link>
      <form className="SupportForm" onSubmit={handleFormSubmit}>
        <h2 className="SupportForm__heading">Форма обратной связи</h2>
        <Input
          name={'shortDescription'}
          value={values.shortDescription}
          onChange={handleChange}
          label="Краткое описание проблемы"
          required
          additionalClass="SupportForm__input"
          width="100%"
        />
        <div className="SupportForm__container">
          <Input
            name={'email'}
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
              className="GameForm__file"
              onChange={handleFileInputChange}
            />
            {values.imageLink ? 'Изображение загружено' : 'Загрузить изображение'}
          </label>
        </div>
        <Input
          name={'trouble'}
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
