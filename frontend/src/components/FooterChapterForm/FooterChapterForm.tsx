import './FooterChapterForm.scss';
import Input from '../Input/Input';
import useFormValidator from '../../hooks/useFormValidator';
import { useParams } from 'react-router-dom';
import { INFOCHAPTER } from '../../utils/config';
import { FormEvent, useEffect } from 'react';
import { getChapterInfo, updateChapterInfo } from '../../services/api';
import useErrorHandler from '../../hooks/useErrorHandler';
import { useAppDispatch } from '../../hooks/redux';
import { openSnackBar } from '../../services/slices/appSlice';

interface formValues {
  text: string;
}

export default function FooterChapterForm() {
  const { values, handleChange, mutateValue } = useFormValidator<formValues>({
    text: ''
  });
  const { handleError } = useErrorHandler();
  const { link } = useParams();
  const dispatch = useAppDispatch();
  const chapterName = INFOCHAPTER.find((item) => item.link == link)?.name;

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (link && chapterName && values.text) {
      return updateChapterInfo({ text: values.text, link, heading: chapterName })
        .then(() => {
          dispatch(openSnackBar({ message: `Раздел ${chapterName} обновлен` }));
        })
        .catch(handleError);
    }
  }

  useEffect(() => {
    if (link) {
      getChapterInfo(link)
        .then((res) => {
          mutateValue({ valueName: 'text', value: res.text });
        })
        .catch(console.log);
    }
  }, []);

  return (
    <form className="footerChapterForm" onSubmit={handleFormSubmit}>
      <h2 className="footerChapterForm__heading">{chapterName}</h2>
      <Input
        name="text"
        value={values.text}
        onChange={handleChange}
        isTextArea
        label="Текст"
        additionalClass="footerChapterForm__input footerChapterForm__input_textarea"
      />
      <button className="footerChapterForm__button" type="submit">
        Сохранить
      </button>
    </form>
  );
}
