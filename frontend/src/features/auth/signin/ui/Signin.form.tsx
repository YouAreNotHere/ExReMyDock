import React, {useState} from "react";
import {signinRequest} from "../api/signin.request";

const SigninForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const createUserHandler = async (e: any) => {
        e.preventDefault();
        try {
            const response = await signinRequest({name, password})

            if (!response.ok) {
                const error = await response.json();
                setErrorMessage(error.message);
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