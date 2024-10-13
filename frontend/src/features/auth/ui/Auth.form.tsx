import React, { useState, useRef } from 'react';
import '../../../app/App.css';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../../auth/api/auth.request';
import { useDispatch } from 'react-redux';
import { changeId } from '../../../actions';
import { useArrowNavigation } from '../../../shared/hooks/useArrowNavigation';
import Button from '../../../shared/button/Button';

const AuthForm = () => {
  const [name, setName] = useState('');
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
      const url = 'http://localhost:8081/auth/signin';
      const response = await authRequest({ name, password }, url);

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
        dispatch(changeId(user.id));

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
            name
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
          <label className='label'>password</label>
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
