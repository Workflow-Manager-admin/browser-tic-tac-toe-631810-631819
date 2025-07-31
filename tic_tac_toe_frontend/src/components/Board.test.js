import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from './Board';

describe('Board Component', () => {
  const mockSquares = Array(9).fill(null);
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  test('renders 9 squares', () => {
    const { getAllByRole } = render(
      <Board squares={mockSquares} onClick={mockOnClick} />
    );
    const squares = getAllByRole('button');
    expect(squares).toHaveLength(9);
  });

  test('clicking square calls onClick with correct index', () => {
    const { getAllByRole } = render(
      <Board squares={mockSquares} onClick={mockOnClick} />
    );
    const squares = getAllByRole('button');
    fireEvent.click(squares[0]);
    expect(mockOnClick).toHaveBeenCalledWith(0);
  });

  test('highlights winning squares', () => {
    const winningLine = [0, 1, 2];
    const { getAllByRole } = render(
      <Board squares={mockSquares} onClick={mockOnClick} winningLine={winningLine} />
    );
    const squares = getAllByRole('button');
    
    winningLine.forEach(index => {
      expect(squares[index]).toHaveClass('winning');
    });
  });
});
