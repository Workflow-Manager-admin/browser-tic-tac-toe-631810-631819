import React from 'react';
import Square from './Square';

// PUBLIC_INTERFACE
const Board = ({ squares, onClick, winningLine }) => {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={winningLine && winningLine.includes(i)}
      />
    );
  };

  return (
    <div className="board">
      {[...Array(9)].map((_, i) => renderSquare(i))}
    </div>
  );
};

export default Board;
