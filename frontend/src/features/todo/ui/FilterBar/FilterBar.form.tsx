import { useDispatch } from 'react-redux';
import { changeCurrentFilter } from '../../../../actions';
import "./FilterBar.css"

const FilterBar = () => {
  const dispatch = useDispatch();

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
    <div className="filter-bar">
      <ShowAllButton />
      <ShowActiveOnlyButton />
      <ShowCompleteOnlyButton />
    </div>
  );
};

export default FilterBar;
