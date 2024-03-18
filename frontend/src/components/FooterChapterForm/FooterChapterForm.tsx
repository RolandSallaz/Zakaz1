import JoditEditor from 'jodit-react';
import { FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import useErrorHandler from '../../hooks/useErrorHandler';
import useFormValidator from '../../hooks/useFormValidator';
import { getChapterInfo, updateChapterInfo } from '../../services/api';
import { openSnackBar } from '../../services/slices/appSlice';
import { INFOCHAPTER } from '../../utils/config';
import './FooterChapterForm.scss';
interface formValues {
  text: string;
}

export default function FooterChapterForm() {
  const { values, mutateValue } = useFormValidator<formValues>({
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
      <div className="footerChapterForm__input">
        <JoditEditor
          value={values.text}
          onChange={(newContent) => {
            mutateValue({ valueName: 'text', value: newContent });
          }}
        />
      </div>

      <button className="footerChapterForm__button" type="submit">
        Сохранить
      </button>
    </form>
  );
}
