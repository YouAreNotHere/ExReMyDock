import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../api/auth.request';
import Button from '../../../shared/button/Button';
import { useArrowNavigation } from '../../../shared/hooks/useArrowNavigation';
import "../../../shared/layouts/FormLayout/ui/FormLayout.css"
import Spinner from '../../../shared/effects/spinner/Spinner';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(!isLoading)

    try {
      let url;

      if (process.env.NODE_ENV === 'production') {
        url = process.env.REACT_APP_API_URL_PROD;
      } else {
        url = process.env.REACT_APP_API_URL_DEV;
      }

      const response = await authRequest({ name, password }, `${url}/auth/signup`);

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.message);
        setIsLoading(!isLoading);
      } else {
        setIsLoading(!isLoading);
        navigate('/auth');
      }
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
      setIsLoading(!isLoading);
    }
  };

  return (
    <div ref={authPageRef}>
      <form className="login-form">
        <div className='row'>
          <label htmlFor='name' className='label'>
            Имя
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
            placeholder={"Username с github"}
          />
        </div>
        <div className='row'>
          <label className='label'>Пароль</label>
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
            placeholder={"******"}
          />
        </div>
        <div className='buttons-wrapper'>
          <Button
            id={'registration-submit-button'}
            value={'Создать аккаунт'}
            onClick={onRegistationClick}
            disabled={!name || !password}
            ref={submitButtonRef}
          />
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
      <Spinner isLoading={isLoading}/>
    </div>
  );
};

export default RegistrationForm;
