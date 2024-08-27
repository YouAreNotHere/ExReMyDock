import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AuthPage from "../../pages/auth/Auth.page";
import TodosPage from "../../pages/todo/Todos.page";
import MainPage from "../../pages/Main.page";
import NotFoundPage from "../../pages/not-found.page";

const Navigation = () => {
  return (
    <Router>
      <Routes>
        {/*<Route path='/signup' element={<SignupPage />} />*/}
        {/*<Route path='/auth' element={<AuthPage />} />*/}
        <Route path='/' element={<AuthPage />} />
        <Route path='/notfound' element={<NotFoundPage />} />
        <Route path="/todos" element={<TodosPage/>} />
      </Routes>
    </Router>
  )
};

export {Navigation};
