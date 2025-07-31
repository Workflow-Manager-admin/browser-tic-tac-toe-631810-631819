import React, { useState } from 'react';
import Board from './Board';

// PUBLIC_INTERFACE
const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const xIsNext = currentStep % 2 === 0;
  const current = history[currentStep];

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const newHistory = history.slice(0, currentStep + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = [...current];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, squares]);
    setCurrentStep(newHistory.length);

    const result = calculateWinner(squares);
    if (result) {
      setScores(prev => ({
        ...prev,
        [result.winner]: prev[result.winner] + 1
      }));
    }
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  const winnerInfo = calculateWinner(current);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line;

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (current.every(square => square)) {
    status = 'Draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-container">
      <div className="scoreboard">
        <div className="score-item">
          <div className="score-label">Player X</div>
          <div className="score-value">{scores.X}</div>
        </div>
        <div className="score-item">
          <div className="score-label">Player O</div>
          <div className="score-value">{scores.O}</div>
        </div>
      </div>

      <div className="status">{status}</div>

      <Board
        squares={current}
        onClick={handleClick}
        winningLine={winningLine}
      />

      <div className="controls">
        <button className="btn" onClick={resetGame}>New Game</button>
        <button className="btn" onClick={resetScores} style={{ marginLeft: '10px' }}>Reset Scores</button>
      </div>
    </div>
  );
};

export default Game;
