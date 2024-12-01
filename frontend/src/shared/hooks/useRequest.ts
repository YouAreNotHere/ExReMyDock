import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IUseRequestProps {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  body?: any;
  params?: any;
  onSuccess?: (data: any) => void;
}

const useRequest = (props: IUseRequestProps) => {
  const { method, url, body, params, onSuccess } = props;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const makeRequest = async () => {
    setIsLoading(true);
    try {
      let response;
      if (method === 'POST') {
        response = await fetch(`https://exremydock-1.onrender.com${url}`, {
          method,
          body: JSON.stringify(body),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("post запрос отправлен")
      } else {
        response = await fetch(`https://exremydock-1.onrender.com${url}`, {
          method,
          ...params,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("get запрос отправлен")
      }

      if (response.ok) {
        const data = await response.json();
        setData(data);
        setErrorMessage(null);
        console.log("ответ получен", response)
        if (onSuccess) {
          onSuccess(data);
          console.log("вызывается onSuccess")
        }
      } else {
        const error = await response.json();
        console.log("Response в useRequest не ок")

        if (response.status === 401) {
          navigate('/auth');
        }
        setErrorMessage(error.message ?? 'Ошибка');
        setData(null);
      }
    } catch (e) {
      setErrorMessage(JSON.stringify(e));
      setData(null);
      console.log("Catch в useRequest")
    } finally {
      setIsLoading(false);
    }
  };
  return {
    data,
    isLoading,
    errorMessage,
    makeRequest,
  };
};

export { useRequest };
