import {useAuthGuard} from "../shared/hooks";

const MainPage = () => {
  useAuthGuard();

  return (
    <div>
      <h1>Main page</h1>
    </div>
  )
};

export default MainPage;
