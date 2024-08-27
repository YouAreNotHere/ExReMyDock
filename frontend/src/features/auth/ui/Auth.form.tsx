import React, {useState} from "react";
import "../../../app/App.css";
import { useNavigate } from "react-router-dom";
import {authRequest} from "../api/auth.request";


const AuthForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let user_id;

    const [errorMessage, setErrorMessage] = useState('');

    const onLoginClick = async (e: any) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8081/auth/signin';
            const response : any = await authRequest({name, password}, url)

            if (!response.ok) {
                const error = await response.json();
                setErrorMessage(error.message);
            }else{
                console.log("Авторизация успешна")
                // Думаю, сделаем так. На клиенте мы
                // будем проверять активность сессии через отдельный эндпоинт,
                // нужно будет сделать на бэке урл /session
                // На бэке эта сессия будет проверяться. Если сессия истекла, то
                // юзера перебросит на /auth.
                // А клиент будет отправлять этот запрос через setInterval
                // Я это к тому, что эта строчка здесь не нужна

                //user_id = await response.json();
                navigate("/todos");
            }

        } catch (error) {
            setErrorMessage(JSON.stringify(error));
        }
    };

    const onRegistationClick = async (e: any) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8081/auth/signup';
            const response = await authRequest({name, password}, url)

            if (!response.ok) {
                const error = await response.json();
                setErrorMessage(error.message);
            }

        } catch (error) {
            setErrorMessage(JSON.stringify(error));
        }
    };

    const Button = ({value, onClick}: any) =>{
        return(
            <button
                className = "buttonStyle"
                disabled={!name || !password}
                type='submit'
                onClick={onClick}
                >
                {value}
            </button>

        )
    }

    return (
        <>
            <form>
                <div className='row'>
                    <label htmlFor='name' className='label'>name</label>
                    <input name='name' value={name} onInput={(e: any) => setName(e.target.value)} className='input'/>
                </div>
                <div className='row'>
                    <label className='label'>password</label>
                    <input name='password' value={password} onInput={(e: any) => setPassword(e.target.value)} className='input'/>
                </div>
                <div className="centerStyle">
                    <Button value={"Login"} onClick={onLoginClick}/>
                    <Button value={"Registration"} onClick={onRegistationClick}/>
                </div>

            </form>
            {errorMessage && (
                <p className="error-message">{errorMessage}</p>
            )}
        </>
    );
}

export {AuthForm};
