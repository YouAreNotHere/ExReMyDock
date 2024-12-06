import React, { useState, useRef } from 'react';
import '../../../app/App.scss';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../../auth/api/auth.request';
import {useDispatch, useSelector} from 'react-redux';
import { changeCurrentUsername } from '../../../actions';
import { useArrowNavigation } from '../../../shared/hooks/useArrowNavigation';
import Button from '../../../shared/button/Button';
import {IRootState} from "../../todo/types/RootState";

const AuthForm = () => {
  const username: string | undefined = useSelector((state: IRootState) => state.currentUsername);
  const [name, setName] = useState(username);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const nameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const submitButtonRef = useRef(null);
  const toRegistrationButtonRef = useRef(null);

  useArrowNavigation([
    nameInputRef,
    passwordInputRef,
    submitButtonRef,
    toRegistrationButtonRef,
  ]);

  const onLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      let url;

      if (process.env.NODE_ENV === 'production') {
        url = process.env.REACT_APP_API_URL_PROD;
      } else {
        url = process.env.REACT_APP_API_URL_DEV;
      }

      if (!name || !password) return;
        const response = await authRequest({ name, password }, `${url}/auth/signin`);
        if (!response.ok) {
          const error = await response.json();
          setErrorMessage(error.message);
        } else {
          const user = await response.json();
          if (user === false) {
            console.log('Некорректный пароль');
            return;
          }
          console.log('Авторизация успешна');
          dispatch(changeCurrentUsername(name));
          console.log("current username" + name)
          navigate('/');
        }
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
    }
  };

  const onRegistationClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/registration');
  };

  return (
    <div>
      <form>
        <div className='row'>
          <label htmlFor='name' className='label'>
            Имя
          </label>
          <input
            id='auth-input-name'
            name='name'
            value={name}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setName((e.target as HTMLInputElement).value)
            }
            className='input'
            autoComplete='off'
            ref={nameInputRef}
          />
        </div>
        <div className='row'>
          <label className='label'>Пароль</label>
          <input
            id='auth-password-input'
            name='password'
            value={password}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword((e.target as HTMLInputElement).value)
            }
            ref={passwordInputRef}
            type={'password'}
            autoComplete='off'
            className='input'
          />
        </div>
        <div className='centerStyle'>
          <Button
            id='auth-submit-button'
            value={'Войти'}
            onClick={onLoginClick}
            disabled={!name || !password}
            ref={submitButtonRef}
          />
          <div>
            <p>В первый раз?</p>
            <Button
              id={'registration-page-submit-button'}
              value={'Создать аккаунт'}
              onClick={onRegistationClick}
              disabled={false}
              ref={toRegistrationButtonRef}
            />
          </div>
        </div>
      </form>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  );
};

export { AuthForm };
