import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignupPage from "../pages/auth/Signup.page";
import MainPage from "../pages/Main.page";
import NotFoundPage from "../pages/not-found.page";

const App = () => {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/' element={<MainPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
