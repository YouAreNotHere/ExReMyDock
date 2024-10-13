import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../api/auth.request';
import Button from '../../../shared/button/Button';
import { useArrowNavigation } from '../../../shared/hooks/useArrowNavigation';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const authPageRef = useRef(null);

  const nameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const submitButtonRef = useRef(null);
  const toAuthButtonRef = useRef(null);

  useArrowNavigation([
    nameInputRef,
    passwordInputRef,
    submitButtonRef,
    toAuthButtonRef,
  ]);

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
            autoComplete='off'
            id={'name-input'}
            ref={nameInputRef}
          />
        </div>
        <div className='row'>
          <label className='label'>password</label>
          <input
            name='password'
            value={password}
            autoComplete='off'
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword((e.target as HTMLInputElement).value)
            }
            className='input'
            id={'password-input'}
            ref={passwordInputRef}
          />
        </div>
        <div className='centerStyle'>
          <Button
            id={'registration-submit-button'}
            value={'Создать аккаунт'}
            onClick={onRegistationClick}
            disabled={!name || !password}
            ref={submitButtonRef}
          />
        </div>
        <div>
          <Button
            id={'to-auth-submit-button'}
            value={'Вернуться к авторизации'}
            onClick={() => navigate('/auth')}
            disabled={false}
            ref={toAuthButtonRef}
          />
        </div>
      </form>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  );
};

export default RegistrationForm;
