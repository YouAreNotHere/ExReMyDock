import { useEffect, useState } from 'react';
import Button from '../../../../shared/button/Button';
import { ITodo } from '../../types/ITodosRequest';
import { useRequest } from '../../../../shared/hooks/useRequest';
import { useNavigate } from 'react-router-dom';

interface Props{
  isMenuOpen: boolean,
  closeMenu: () => void,
  repos: ITodo[]
}

const Menu = ({isMenuOpen, closeMenu, repos}: Props) =>{
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRepListOpen, setIsRepListOpen] = useState(false);
  const navigate = useNavigate();
  console.log(isDarkMode);

  const onLogoutSuccess = () => {
    navigate('/auth');
  };

  const {
    isLoading,
    errorMessage,
    makeRequest: logoutRequest,
  } = useRequest({
    method: 'POST',
    url: '/auth/logout',
    onSuccess: onLogoutSuccess,
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const repList = isRepListOpen ? (
      <div>
    <ul className="repos-list">
      <p
        className="repos-list-header"
        onClick={()=> setIsRepListOpen(!isRepListOpen)}>
        Ваши проекты
      </p>
      {repos.map((repo: any) => {
        return <li key={repo}>{repo}</li>;
      })}
    </ul>
  </div>
  ) : null;

  return (
    <div className={isMenuOpen ? "menu-wrapper" : "menu-wrapper-hidden"}>
      <div className= "menu">
        <Button
          id={"close-modal-button"}
          value={""}
          onClick={()=> closeMenu()}
          disabled={false}
          className={"close__button"}
        />
        <Button
          id={"change-theme-button"}
          value={isDarkMode ? "Светлая тема" : "Темная тема"}
          onClick={() => setIsDarkMode(!isDarkMode)}
          disabled={false} />
        {repos.length > 1 ?
          <Button
            id={"show-repList-button"}
            value={"Список ваших проектов"}
            onClick={() => setIsRepListOpen(!isRepListOpen)}
            disabled={false} />
          : null}
        {repList}
        <Button
          id={"logout-button"}
          value={"Выйти"}
          onClick={() => logoutRequest()}
          disabled={false}
          className="logout__button"
        />
      </div>
    </div>

  )
}

export default Menu;