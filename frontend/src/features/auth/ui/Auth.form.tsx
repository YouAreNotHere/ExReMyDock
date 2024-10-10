import React, { useState, useRef, useEffect } from 'react';
import '../../../app/App.css';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../api/auth.request';
import { useDispatch } from 'react-redux';
import { changeId } from '../../../actions/index';
//import useButtonFocus from '../../../shared/hooks/useButtonFocus';
import { useArrowNavigation } from '../../../shared/hooks/useArrowNavigation';

const AuthForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const useFocus: any = useButtonFocus();
  // const focusToNameInput = useFocus(
  //   nameInputRef.current,
  //   nameInputRef.current.focus,
  //   'ArrowDown',
  // );
  //focusToNameInput();
  let user_id;

  const [errorMessage, setErrorMessage] = useState('');

  const nameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const submitButtonRef = useRef(null);

  useArrowNavigation([nameInputRef, passwordInputRef, submitButtonRef]);

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

  // const Button = ({ value, onClick }: any) => {
  //   let isDisabled: boolean | undefined;
  //   if (value === 'Войти') {
  //     isDisabled = !name || !password ? true : false;
  //   } else {
  //     isDisabled = undefined;
  //   }
  //   return (
  //     <button
  //       className='buttonStyle'
  //       disabled={isDisabled}
  //       type='submit'
  //       onClick={onClick}
  //     >
  //       {value}
  //     </button>
  //   );
  // };

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
            onInput={(e: any) => setName(e.target.value)}
            className='input'
            autoComplete='off'
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
            id='auth-password-input'
            name='password'
            value={password}
            onInput={(e: any) => setPassword(e.target.value)}
            ref={passwordInputRef}
            // type={'password'}
            autoComplete='off'
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
          <button
            id='auth-submit-button'
            ref={submitButtonRef}
            className='buttonStyle'
            disabled={!name || !password}
            type='submit'
            onClick={onLoginClick}
          >
            Войти
          </button>
          <div>
            <p>В первый раз?</p>
            <button className='buttonStyle' onClick={onRegistationClick}>
              Создать аккаунт
            </button>
          </div>
        </div>
      </form>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  );
};

export { AuthForm };
