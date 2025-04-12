import React from 'react';

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export const Button = ({ label, onClick }: ButtonProps) => (
  <button onClick={onClick} data-testid="custom-button">
    {label}
  </button>
);