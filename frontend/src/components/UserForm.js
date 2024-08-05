import React from "react";
import '../App.css';

const UserForm = ({createUserHandler, name, setName, password, setPassword}) => {
    return (
        <div className="App">
            <form >
                onSubmit={createUserHandler}
                <div>
                    <label
                        htmlFor='name'
                        className='label'>
                        {/*name*/}
                    </label>
                    <input
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className='label'>
                        {/*password*/}
                    </label>
                    <input
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit'>send</button>
            </form>
        </div>
    )
};

export default UserForm