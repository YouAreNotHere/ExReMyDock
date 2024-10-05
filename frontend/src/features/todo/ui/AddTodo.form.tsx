import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useGetTodos from './useGetTodos';
import {useRequest} from "../../../shared/hooks/useRequest";

const AddTodo = () => {
  const ref: any = useRef();
  const [text, setText] = useState('');
  const userId = useSelector((state: any) => state.userId);
  const getTodos: any = useGetTodos();

  const {
    data,
    isLoading,
    errorMessage,
    makeRequest: addTodo,
  } = useRequest({
    method: 'POST',
    body: {text, completed: false},
    url: '/todos/addTodo',
    onSuccess: getTodos,
  });

  const onClickHandler = async (e: any) => {
    await addTodo();
    setText('');
  };

  return (
    <>
      <input ref={ref} onChange={(e) => setText(e.target.value)} value={text} />
      <button onClick={onClickHandler}>Add Todo</button>
    </>
  );
};

export default AddTodo;
