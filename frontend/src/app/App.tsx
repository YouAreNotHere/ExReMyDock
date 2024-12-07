import './App.scss';
import { Navigation } from './ui';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {changeCurrentTheme} from '../actions/index';
import { IRootState } from '@/features/todo/types/RootState';

const App = () => {


  return (
    <div className='App'>
      <Navigation />
    </div>
  );
};

export default App;
