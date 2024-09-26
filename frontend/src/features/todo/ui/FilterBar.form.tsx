import { useDispatch } from 'react-redux';
import { changeCurrentFilter } from '../../../actions';

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
    <>
      <ShowAllButton />
      <ShowActiveOnlyButton />
      <ShowCompleteOnlyButton />
    </>
  );
};

export default FilterBar;
