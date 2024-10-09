import React, { useState, useRef, useEffect } from 'react';
import '../../../app/App.css';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../api/auth.request';
import { useDispatch } from 'react-redux';
import { changeId } from '../../../actions/index';
//import useButtonFocus from '../../../shared/hooks/useButtonFocus';
import { IconButtonProps } from '@mui/material';

const AuthForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameInputRef: any = useRef(null);
  const passwordInputRef: any = useRef(null);
  //const useFocus: any = useButtonFocus();
  // const focusToNameInput = useFocus(
  //   nameInputRef.current,
  //   nameInputRef.current.focus,
  //   'ArrowDown',
  // );
  //focusToNameInput();
  let user_id;

  const [errorMessage, setErrorMessage] = useState('');

  const onLoginClick = async (e: any) => {
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

  const onRegistationClick = async (e: any) => {
    e.preventDefault();
    navigate('/registration');
  };

  const Button = ({ value, onClick }: IconButtonProps) => {
    let isDisabled: boolean | undefined;
    if (value === 'Войти') {
      isDisabled = !name || !password ? true : false;
    } else {
      isDisabled = undefined;
    }
    return (
      <button
        className='buttonStyle'
        disabled={isDisabled}
        type='submit'
        onClick={onClick}
      >
        {value}
      </button>
    );
  };

  return (
    <div>
      <form>
        <div className='row'>
          <label htmlFor='name' className='label'>
            name
          </label>
          <input
            name='name'
            value={name}
            onInput={(e: any) => setName(e.target.value)}
            className='input'
            ref={nameInputRef}
            // onKeyDown={(event) => {
            //   if (event.key === 'ArrowDown') {
            //     if (passwordInputRef.current) {
            //       passwordInputRef.current.focus();
            //     }
            //   }
            //   //useFocus(event, 'ArrowDown', passwordInputRef);
            // }}
          />
        </div>
        <div className='row'>
          <label className='label'>password</label>
          <input
            name='password'
            value={password}
            onInput={(e: any) => setPassword(e.target.value)}
            ref={passwordInputRef}
            // onKeyDown={(event) => {
            //   if (event.key === 'ArrowUp') {
            //     if (nameInputRef.current) {
            //       nameInputRef.current.focus();
            //     }
            //   }
            // }}
            className='input'
          />
        </div>
        <div className='centerStyle'>
          <Button value={'Войти'} onClick={onLoginClick} />
          <div>
            <p>В первый раз?</p>
            <Button value={'Создать аккаунт'} onClick={onRegistationClick} />
          </div>
        </div>
      </form>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  );
};

export { AuthForm };
