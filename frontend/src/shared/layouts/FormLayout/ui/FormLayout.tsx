import './FormLayout.css';
import "../../../../app/App.css";

export const FormLayout = ({children}: any) => {
  return (
    <div className="form-layout">
      {children}
    </div>
  );
};

export const FilterLayout = ({children}: any) => {
  return (
      <div className="filterBar">
        {children}
      </div>
  );
};
