import React, { forwardRef } from 'react';

const Button = forwardRef(
  (
    props: {
      id: string;
      value: string;
      onClick:
        | ((e: React.MouseEvent<HTMLButtonElement>) => Promise<void>)
        | (() => void);
      disabled: boolean;
    },
    ref: any,
  ) => {
    const { id, value, onClick, disabled } = props;
    console.log(ref);
    return (
      <button
        id={id}
        ref={ref}
        className='buttonStyle'
        disabled={disabled}
        type='submit'
        onClick={onClick}
      >
        {value}
      </button>
    );
  },
);

export default Button;
