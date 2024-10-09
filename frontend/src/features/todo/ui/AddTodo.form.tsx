import { useRef, useState } from 'react';
import { useRequest } from '../../../shared/hooks/useRequest';
import { useDispatch } from 'react-redux';
import { loadTodos } from '../../../actions';

const AddTodo = () => {
  const dispatch = useDispatch();
  const ref: any = useRef();
  const [text, setText] = useState('');

  const { data, makeRequest: getTodos } = useRequest({
    method: 'GET',
    url: '/todos/getTodos',
  });

  const { makeRequest: addTodo } = useRequest({
    method: 'POST',
    body: { text, completed: false },
    url: '/todos/addTodo',
    //onSuccess: getTodos,
  });

  const onClickHandler = async (e: any) => {
    await addTodo();
    //if (data) dispatch(loadTodos(data));
    //getTodos();
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
