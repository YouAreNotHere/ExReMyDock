import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '@/features/auth/api/auth.request';
import { IconButtonProps } from '@mui/material';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const authPageRef = useRef(null);

  useEffect(() => {
    if (!authPageRef.current) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        navigate('/auth');
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const onRegistationClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const url = 'http://localhost:8081/auth/signup';
      const response = await authRequest({ name, password }, url);

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.message);
      } else {
        navigate('/auth');
      }
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
    }
  };

  const Button = ({ value, onClick }: IconButtonProps) => {
    let isDisabled: boolean | undefined;
    if (value === 'Создать аккаунт') {
      isDisabled = !name || !password;
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
    <div ref={authPageRef}>
      <form>
        <div className='row'>
          <label htmlFor='name' className='label'>
            name
          </label>
          <input
            name='name'
            value={name}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setName((e.target as HTMLInputElement).value)
            }
            className='input'
          />
        </div>
        <div className='row'>
          <label className='label'>password</label>
          <input
            name='password'
            value={password}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword((e.target as HTMLInputElement).value)
            }
            className='input'
          />
        </div>
        <div className='centerStyle'>
          <Button value={'Создать аккаунт'} onClick={onRegistationClick} />
        </div>
        <div>
          <Button
            value={'Вернуться к авторизации'}
            onClick={() => navigate('/auth')}
          />
        </div>
      </form>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  );
};

export default RegistrationForm;
