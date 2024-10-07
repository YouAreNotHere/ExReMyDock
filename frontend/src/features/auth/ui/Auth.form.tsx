import React, { useState, useRef } from 'react';
import '../../../app/App.css';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../api/auth.request';
import { useDispatch } from 'react-redux';
import { changeId } from '../../../actions/index';
import Button from '@mui/material/Button';

const AuthForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginButtonRef: any = useRef();
  let user_id;

  loginButtonRef.current.addEventListener('keydown', (event: any) => {
    switch (event.key) {
      // case 'ArrowUp':
      //   textArea.current.focus();
      //   break;
      // case 'ArrowDown':
      //   rangeInput.current.focus();
      //   break;
      case 'Enter':
        console.log('Enter reg');
        break;
    }
  });

  const [errorMessage, setErrorMessage] = useState('');

  const onLoginClick = async () => {
    try {
      const url = 'http://localhost:8081/auth/signin';
      const response: any = await authRequest({ name, password }, url);

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
        console.log(user.id);
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

  const MyButton = ({ value, onClick }: any) => {
    let disabled: any;
    if (value === 'Войти') {
      disabled = !name || !password ? true : false;
    } else {
      disabled = null;
    }
    return (
      <button
        className='buttonStyle'
        disabled={disabled}
        type='submit'
        onClick={onClick}
      >
        {value}
      </button>
    );
  };

  return (
    <>
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
            onKeyDown={(event) => {
              if (event.key === 'Enter') onLoginClick();
            }}
          />
        </div>
        <div className='row'>
          <label className='label'>password</label>
          <input
            name='password'
            value={password}
            onInput={(e: any) => setPassword(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') onLoginClick();
            }}
            className='input'
          />
        </div>
        <div className='centerStyle'>
          <Button
            //ref={loginButtonRef}
            value={'Войти'}
            onClick={onLoginClick}
            variant='contained'
            color='success'
            size='large'
            onKeyDown={(event) => {
              if (event.key === 'Enter') console.log('Enter Pressed');
            }}
            autoFocus
          />
          <div>
            <p>В первый раз?</p>
            <MyButton
              value={'Создать аккаунт'}
              onClick={onRegistationClick}
              ref={loginButtonRef}
            />
          </div>
        </div>
      </form>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </>
  );
};

export { AuthForm };
