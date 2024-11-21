import React, { useEffect, useRef, useState } from 'react';
import { useRequest } from '../../../shared/hooks/useRequest';
import { useDispatch } from 'react-redux';
import { loadTodos } from '../../../actions';
import '../../../app/App.css'

const AddTodo = ({className}: {className: string}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [text, setText] = useState('');

  const { makeRequest: addTodo } = useRequest({
    method: 'POST',
    body: { text, completed: false },
    url: '/todos/addTodo',
  });

  const { data: todos, makeRequest: getTodos } = useRequest({
    method: 'GET',
    url: '/todos/getTodos',
  });

  useEffect(() => {
    dispatch(loadTodos(todos));
    setText('');
  }, [todos]);

  const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await addTodo();
    await getTodos();
  };

  return (
    <div className={className}>
      <input ref={ref} onChange={(e) => setText(e.target.value)} value={text} />
      <button onClick={onClickHandler}>Добавить задание</button>
    </div>
  );
};

export default AddTodo;
