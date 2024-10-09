import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAuthGuard = () => {
  const navigate = useNavigate();

  const isAuthenticated = false;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);
};

export { useAuthGuard };
