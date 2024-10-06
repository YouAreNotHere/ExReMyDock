import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {authRequest} from "../api/auth.request";

const RegistrationForm = () =>{
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');


    const onRegistationClick = async (e: any) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8081/auth/signup';
            const response : any = await authRequest({name, password}, url)

            if (!response.ok) {
                const error = await response.json();
                setErrorMessage(error.message);
            }else{
                navigate('/auth');
            }
        } catch (error) {
            setErrorMessage(JSON.stringify(error));
        }
    };

    const Button = ({ value, onClick }: any) => {
        let disabled: any;
        if (value === "Создать аккаунт"){
            disabled = (!name || !password) ? true : false
        } else{
            disabled = null
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
                    <label className='label'>
                        password
                    </label>
                    <input
                        name='password'
                        value={password}
                        onInput={(e: any) => setPassword(e.target.value)}
                        className='input'
                    />
                </div>
                <div className='centerStyle'>
                    <Button value={'Создать аккаунт'} onClick={onRegistationClick} />
                </div>
                <div>
                    <Button value={'Вернуться к авторизации'} onClick={() => navigate('/auth')} />
                </div>
            </form>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </>
    );
}

export default RegistrationForm;