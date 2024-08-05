import '../App.css';
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import FilterBar from "./FilterBar";
import {Provider} from "react-redux";
import store from "../reducers/index";
import {useState} from "react";
import UserForm from "./UserForm";

function App() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const createUserHandler = async (e) => {
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
      <Provider store = {store}>
          <UserForm
              createUserHandler = {createUserHandler}
              name={name}
              setName={setName}
              password={password}
              setPassword = {setPassword}/>
          <AddTodo/>
          <TodoList/>
          <FilterBar/>
      </Provider>
  )
}

export default App;
