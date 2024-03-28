import { ChangeEvent, FormEvent, useState } from 'react';
import Input from '../Input/Input';
import './RobotsForm.scss';
import { sendRobots } from '../../services/api';
import useErrorHandler from '../../hooks/useErrorHandler';
import { useAppDispatch } from '../../hooks/redux';
import { openSnackBar } from '../../services/slices/appSlice';
export default function RobotsForm() {
  const [robots, setRobots] = useState<string>('');
  const { handleError } = useErrorHandler();
  const distpatch = useAppDispatch();
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setRobots(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendRobots(robots)
      .then(() => {
        distpatch(openSnackBar({ message: 'robots.txt обновлен' }));
      })
      .catch(handleError);
  }

  return (
    <form className="RobotsForm" onSubmit={handleSubmit}>
      <Input
        name={'robots'}
        value={robots}
        onChange={handleChange}
        label="robots.txt"
        required
        additionalClass="SupportForm__input SupportForm__input_textarea"
        isTextArea
        width="100%"
      />
      <button type="submit" className="RobotsForm__button">
        Отправить
      </button>
    </form>
  );
}
