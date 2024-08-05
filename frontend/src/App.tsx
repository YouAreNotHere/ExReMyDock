import React, {useState} from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const createUserHandler = async (e: any) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8081/auth/create', {
        method: 'POST',
        body: JSON.stringify({name, password}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <div className="App">
      <form onSubmit={createUserHandler}>
        <div>
          <label htmlFor='name' className='label'>name</label>
          <input name='name' value={name} onInput={(e: any) => setName(e.target.value)} />
        </div>
        <div>
          <label className='label'>password</label>
          <input name='password' value={password} onInput={(e: any) => setPassword(e.target.value)}/>
        </div>
        <button type='submit'>send</button>
      </form>
    </div>
  );
}

export default App;
