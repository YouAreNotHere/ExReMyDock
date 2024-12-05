import './App.scss';
import { Navigation } from './ui';
import { useEffect, useState } from 'react';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  return (
    <div className='App'>
      <Navigation />
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        Dark mode
      </button>
    </div>
  );
};

export default App;
