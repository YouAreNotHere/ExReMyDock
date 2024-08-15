import {useAuthGuard} from "../shared/hooks";
import {Link} from "react-router-dom";

const MainPage = () => {
  //useAuthGuard();

  return (
    <div>
        <Link to={"../signup"}>
            <h1>Registration</h1>
        </Link>
        <Link to={"../signin"}>
            <h1>Login</h1>
        </Link>
    </div>
  )
};

export default MainPage;
