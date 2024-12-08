import './App.scss';
import { Navigation } from './ui';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector, Provider } from 'react-redux';
import {changeCurrentTheme} from '../actions/index';
import { IRootState } from '../features/todo/types/RootState';
import { persistor, store } from '../reducers/index';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <div className='App'>
      <Navigation />
    </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
