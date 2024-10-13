import React, { useEffect, useRef, useState } from 'react';
import { useRequest } from '../../../shared/hooks/useRequest';
import { useDispatch } from 'react-redux';
import { loadTodos } from '../../../actions';

const AddTodo = () => {
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
    console.log('Подтянулись тудушки в аддТуду = ' + todos);
    dispatch(loadTodos(todos));
    setText('');
  }, [todos]);

  const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await addTodo();
    await getTodos();
  };

  return (
    <>
      <input ref={ref} onChange={(e) => setText(e.target.value)} value={text} />
      <button onClick={onClickHandler}>Add Todo</button>
    </>
  );
};

export default AddTodo;
