import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRequest } from '../../../shared/hooks/useRequest';

const AddTodo = () => {
  const ref: any = useRef();
  const [text, setText] = useState('');
  const userId = useSelector((state: any) => state.userId);

  const { makeRequest: getTodos } = useRequest({
    method: 'GET',
    url: '/todos/getTodos',
  });

  const { makeRequest: addTodo } = useRequest({
    method: 'POST',
    body: { text, completed: false },
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
