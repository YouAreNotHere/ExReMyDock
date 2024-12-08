import {ITodo} from '../../types/ITodosRequest';
import Button from '../../../../shared/button/Button';

interface Props{
  repos: ITodo[];
  isReposListOpen: boolean,
  setIsReposListOpen: (isOpen: boolean) => void,
}

const ReposList= ({repos, isReposListOpen, setIsReposListOpen}: Props) => {
  return (
    <div className={isReposListOpen ? "repos-list-wrapper" : "repos-list-wrapper-hidden"}>
      <Button
        id={"close-repos-list-button"}
        value={""}
        onClick={() => setIsReposListOpen(!isReposListOpen)}
        disabled={false}
        className={"close__button"}
      />
      <ul className={isReposListOpen ? "repos-list" : "repos-list-hidden"}>
        <p
          className="repos-list-header"
          onClick={() => setIsReposListOpen(!isReposListOpen)}>
          Ваши проекты
        </p>
        {repos.map((repo: any) => {
          return <li key={repo}>{repo}</li>;
        })}
      </ul>
    </div>
  )
};

export default ReposList;
