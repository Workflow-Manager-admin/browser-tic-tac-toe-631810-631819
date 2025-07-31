import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Game from './Game';

describe('Game Component', () => {
  test('renders game board with initial state', () => {
    const { getByText, getAllByRole } = render(<Game />);
    expect(getByText('Next player: X')).toBeInTheDocument();
    const squares = getAllByRole('button');
    expect(squares.length).toBe(11); // 9 game squares + 2 control buttons
  });

  test('allows players to make moves', () => {
    const { getAllByRole, getByText } = render(<Game />);
    const squares = getAllByRole('button');
    
    // X's turn
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    expect(getByText('Next player: O')).toBeInTheDocument();
    
    // O's turn
    fireEvent.click(squares[1]);
    expect(squares[1]).toHaveTextContent('O');
    expect(getByText('Next player: X')).toBeInTheDocument();
  });

  test('declares winner when game is won', () => {
    const { getAllByRole, getByText } = render(<Game />);
    const squares = getAllByRole('button');
    
    // X wins with top row
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X
    
    expect(getByText('Winner: X')).toBeInTheDocument();
  });

  test('resets game when New Game button is clicked', () => {
    const { getByText, getAllByRole } = render(<Game />);
    const squares = getAllByRole('button');
    
    // Make some moves
    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    
    // Reset game
    const newGameButton = getByText('New Game');
    fireEvent.click(newGameButton);
    
    // Check if board is cleared
    const updatedSquares = getAllByRole('button');
    updatedSquares.slice(0, 9).forEach(square => {
      expect(square).toHaveTextContent('');
    });
    expect(getByText('Next player: X')).toBeInTheDocument();
  });

  test('resets scores when Reset Scores button is clicked', () => {
    const { getByText, getAllByRole } = render(<Game />);
    const squares = getAllByRole('button');
    
    // Complete a game to increment score
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X wins
    
    // Reset scores
    const resetScoresButton = getByText('Reset Scores');
    fireEvent.click(resetScoresButton);
    
    // Check if scores are reset
    expect(document.querySelector('.score-value').textContent).toBe('0');
  });
});
