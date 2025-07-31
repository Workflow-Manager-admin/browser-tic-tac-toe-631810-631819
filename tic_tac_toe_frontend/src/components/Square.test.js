import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Square from './Square';

describe('Square Component', () => {
  test('renders with provided value', () => {
    const { getByRole } = render(<Square value="X" />);
    const button = getByRole('button');
    expect(button).toHaveTextContent('X');
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Square onClick={handleClick} />);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies winning class when isWinning is true', () => {
    const { getByRole } = render(<Square isWinning={true} />);
    const button = getByRole('button');
    expect(button).toHaveClass('winning');
  });
});
