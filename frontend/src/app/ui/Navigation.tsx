import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignupPage from "../../pages/auth/Signup.page";
import SigninPage from "../../pages/auth/Signin.page";
//import TodoPage from "../../pages/todo/Todo.page";
import MainPage from "../../pages/Main.page";
import NotFoundPage from "../../pages/not-found.page";

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/notfound' element={<NotFoundPage />} />
        {/*<Route path="/todo" element={<TodoPage/>} />*/}
      </Routes>
    </Router>
  )
};

export {Navigation};
