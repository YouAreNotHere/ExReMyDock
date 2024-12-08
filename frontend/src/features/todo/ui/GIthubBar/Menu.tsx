import { useEffect, useState } from 'react';
import Button from '../../../../shared/button/Button';
import { ITodo } from '../../types/ITodosRequest';
import { useRequest } from '../../../../shared/hooks/useRequest';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { IRootState } from '../../../todo/types/RootState';
import {changeCurrentTheme} from '../../../../actions/index';

interface Props{
  isMenuOpen: boolean,
  closeMenu: () => void,
  repos: ITodo[],
  isReposListOpen: boolean,
  setIsReposListOpen: (isOpen: boolean) => void,
}

const Menu = ({isMenuOpen, closeMenu, repos, isReposListOpen, setIsReposListOpen}: Props) =>{
  const isDarkMode = useSelector((state: IRootState) => state.isDarkMode);
  console.log(isDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.body.classList.add('dark-theme');
  //   } else {
  //     document.body.classList.remove('dark-theme');
  //   }
  // }, [isDarkMode]);

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
          onClick={() => {
            dispatch(changeCurrentTheme(!isDarkMode))
            closeMenu()
          }
          }
          disabled={false} />
        {repos.length > 1 ?
          <Button
            id={"show-repList-button"}
            value={"Список ваших проектов"}
            onClick={() => {
              setIsReposListOpen(!isReposListOpen)
              closeMenu();
            }}
            disabled={false} />
          : null}
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