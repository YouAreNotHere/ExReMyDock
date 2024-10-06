import React, { useState } from 'react';
import '../../../app/App.css';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../api/auth.request';
import { useDispatch } from 'react-redux';
import { changeId } from '../../../actions/index';

const AuthForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user_id;

  const [errorMessage, setErrorMessage] = useState('');

  const onLoginClick = async (e: any) => {
    e.preventDefault();
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
    try {
      const url = 'http://localhost:8081/auth/signup';
      const response = await authRequest({ name, password }, url);

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.message);
      }
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
    }
  };

  const Button = ({ value, onClick }: any) => {
    let disabled: any;
    if (value === "Войти"){
      disabled = (!name || !password) ? true : false
    } else {
      disabled = null;
    }
    return (
      <button
        className='buttonStyle'
        disabled= {disabled}
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
          />
        </div>
        <div className='row'>
          <label className='label'>password</label>
          <input
            name='password'
            value={password}
            onInput={(e: any) => setPassword(e.target.value)}
            className='input'
          />
        </div>
        <div className='centerStyle'>
          <Button value={'Войти'} onClick={onLoginClick} />
          <div>
            <p>
              В первый раз?
            </p>
            <Button value={'Создать аккаунт'} onClick={onRegistationClick} />
          </div>
        </div>
      </form>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </>
  );
};

export { AuthForm };
