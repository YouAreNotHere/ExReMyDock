import React, {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {signinRequest} from "../api/signin.request";

const SigninForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let user_id;

    const [errorMessage, setErrorMessage] = useState('');

    const createUserHandler = async (e: any) => {
        e.preventDefault();
        try {
            const response : any = await signinRequest({name, password})

            if (!response.ok) {
                const error = await response.json();
                setErrorMessage(error.message);
            }
            // Два противоположных if-а, почему не else?
            if (response.ok){
                // Думаю, сделаем так. На клиенте мы
                // будем проверять активность сессии через отдельный эндпоинт,
                // нужно будет сделать на бэке урл /session
                // На бэке эта сессия будет проверяться. Если сессия истекла, то
                // юзера перебросит на /signin.
                // А клиент будет отправлять этот запрос через setInterval
                // Я это к тому, что эта строчка здесь не нужна
                user_id = await response.json();

                // Без "../.. не работет?"
                navigate("../../todo");

                // Зачем тебе тут возвращать компонент, ты сверху пользуешься хуком useNavigate
                // return <Navigate to="../../todo"/>
            }

        } catch (error) {
            setErrorMessage(JSON.stringify(error));
        }
    };

    return (
        <>
            <form onSubmit={createUserHandler}>
                <div className='row'>
                    <label htmlFor='name' className='label'>name</label>
                    <input name='name' value={name} onInput={(e: any) => setName(e.target.value)} className='input'/>
                </div>
                <div className='row'>
                    <label className='label'>password</label>
                    <input name='password' value={password} onInput={(e: any) => setPassword(e.target.value)} className='input'/>
                </div>
                <button type='submit'>Login</button>
            </form>
            {errorMessage && (
                <p className="error-message">{errorMessage}</p>
            )}
        </>
    );
}

export {SigninForm};
