import React, { forwardRef } from 'react';

const Button = forwardRef(
  (
    props: {
      id: string;
      value: string;
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
      disabled: boolean;
      className? : string;
      children? : any;
    },
    ref:React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const { id, value, onClick, disabled, className, children} = props;
    return (
      <button
        id={id}
        ref={ref}
        className={className ? className : 'buttonStyle'}
        disabled={disabled}
        type='submit'
        onClick={onClick}
      >
        {value}
          {children}
      </button>
    );
  },
);

export default Button;
