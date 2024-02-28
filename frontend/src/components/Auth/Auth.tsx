import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import './Auth.scss';
import { Link, useNavigate } from 'react-router-dom';
import UseFormValidator from '../../hooks/useFormValidator';
import { authLogin, sendEmail } from '../../services/api';
import { IAuthFormDto } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login, openSnackBar } from '../../services/slices/appSlice';
import useErrorHandler from '../../hooks/useErrorHandler';

enum AuthStateEnum {
  sendEmail,
  checkCode
}

export default function Auth() {
  const { values, handleChange } = UseFormValidator<IAuthFormDto>({
    email: '',
    authCode: 0
  });
  const [isSendAgainButtonDisabled, setisSendAgainButtonDisabled] = useState(false);
  const [authState, setAuthState] = useState<AuthStateEnum>(AuthStateEnum.sendEmail);
  const { loggedIn } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (authState == AuthStateEnum.sendEmail) {
      sendCodeToEmail();
    }
  }
  function sendCodeToEmail() {
    sendEmail(values)
      .then(({ message }) => {
        dispatch(openSnackBar({ message }));
        setAuthState(AuthStateEnum.checkCode);
        disableButtonForOneMinute();
      })
      .catch(handleError);
  }
  function handleNumberChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (isNaN(Number(value))) {
      return;
    }
    handleChange(e);
  }

  function handleEditEmail() {
    setAuthState(AuthStateEnum.sendEmail);
  }

  // Функция для временного отключения кнопки на 1 минуту
  function disableButtonForOneMinute() {
    setisSendAgainButtonDisabled(true); // Устанавливаем состояние disabled в true
    setTimeout(() => {
      setisSendAgainButtonDisabled(false); // Восстанавливаем состояние disabled обратно на false через 1 минуту
    }, 60000); // 60000 миллисекунд = 1 минута
  }

  useEffect(() => {
    if (String(values.authCode).length == 6) {
      authLogin(values)
        .then((res) => {
          dispatch(login(res));
          navigate('/lk');
        })
        .catch(handleError);
    }
  }, [values.authCode]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/lk');
    }
  }, [loggedIn]);

  return (
    <main className="main auth">
      <form className="auth-form" onSubmit={handleFormSubmit}>
        <h2 className="auth-form__heading">Войдите в аккаунт</h2>

        {authState == AuthStateEnum.sendEmail ? (
          <>
            <label className="auth-form__input-label">
              Емейл
              <input
                name="email"
                value={values.email || ''}
                onChange={handleChange}
                className="auth-form__input"
                placeholder="Введите емейл"
                type="email"
              />
            </label>
            <button className="auth-form__button">Войти</button>
          </>
        ) : (
          <>
            <label className="auth-form__input-label">
              Введите код авторизации
              <input
                name="authCode"
                value={values.authCode || ''}
                onChange={handleNumberChange}
                className="auth-form__input"
                placeholder="Введите код"
                minLength={6}
                maxLength={6}
              />
            </label>
            <div className="auth-form__button-container">
              <button
                className="auth-form__button auth-form__button_small-text"
                onClick={handleEditEmail}
                type="button"
              >
                Изменить емейл
              </button>
              <button
                className="auth-form__button auth-form__button_small-text"
                disabled={isSendAgainButtonDisabled}
                onClick={() => sendCodeToEmail()}
                type="button"
              >
                Отправить код повторно
              </button>
            </div>
          </>
        )}
      </form>

      <Link className="link auth__link" to={'/'}>
        Вернуться на главную
      </Link>
    </main>
  );
}
