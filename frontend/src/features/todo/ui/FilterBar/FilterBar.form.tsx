import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentFilter } from '../../../../actions';
import "./FilterBar.css"
import { IRootState } from '../../types/RootState';

const FilterBar = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: IRootState) => state.todos);

  const ShowCompleteOnlyButton = () => {
    return (
      <button onClick={() => dispatch(changeCurrentFilter('SHOW_COMPLETED'))}>
        Show complete
      </button>
    );
  };

  const ShowActiveOnlyButton = () => {
    return (
      <button onClick={() => dispatch(changeCurrentFilter('SHOW_ACTIVE'))}>
        Show active
      </button>
    );
  };

  const ShowAllButton = () => {
    return (
      <button onClick={() => dispatch(changeCurrentFilter('SHOW_ALL'))}>
        Show all
      </button>
    );
  };

  return (
    <div className={todos?.length > 0 ? "filter-bar" : "filter-bar-hidden"}>
      <ShowAllButton />
      <ShowActiveOnlyButton />
      <ShowCompleteOnlyButton />
    </div>
  );
};

export default FilterBar;
