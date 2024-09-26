import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAuthGuard = () => {
  const navigate = useNavigate();

  // TODO заменить за user из redux и проверять наличие пользователя
  const isAuthenticated = false;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);
};

export { useAuthGuard };
