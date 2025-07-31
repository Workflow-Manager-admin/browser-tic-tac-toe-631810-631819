import { render, screen } from '@testing-library/react';
import App from './App';

test('renders tic tac toe header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Tic Tac Toe/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders game board', () => {
  render(<App />);
  const squares = screen.getAllByRole('button');
  expect(squares.length).toBeGreaterThan(9); // At least 9 squares plus control buttons
});
