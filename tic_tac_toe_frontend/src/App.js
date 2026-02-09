import React, { useMemo, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { calculateWinner } from "./utils/calculateWinner";

const EMPTY_BOARD = Array(9).fill(null);

// PUBLIC_INTERFACE
function App() {
  /** Main application layout + game state orchestration. */
  const [squares, setSquares] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [moveCount, setMoveCount] = useState(0);

  const winnerResult = useMemo(() => calculateWinner(squares), [squares]);
  const winner = winnerResult?.winner ?? null;
  const winningLine = winnerResult?.line ?? null;

  const isDraw = !winner && moveCount >= 9;
  const isGameOver = Boolean(winner) || isDraw;

  const status = useMemo(() => {
    if (winner) return `${winner} wins`;
    if (isDraw) return "Draw";
    return `Turn: ${xIsNext ? "X" : "O"}`;
  }, [winner, isDraw, xIsNext]);

  // PUBLIC_INTERFACE
  const handlePlay = (index) => {
    /**
     * Handle a player move.
     * - Prevent overwrites.
     * - Disable input when game is over.
     */
    if (isGameOver) return;
    if (squares[index] !== null) return;

    const next = squares.slice();
    next[index] = xIsNext ? "X" : "O";

    setSquares(next);
    setXIsNext((v) => !v);
    setMoveCount((c) => c + 1);
  };

  // PUBLIC_INTERFACE
  const handleReset = () => {
    /** Reset the game to initial state. */
    setSquares(EMPTY_BOARD);
    setXIsNext(true);
    setMoveCount(0);
  };

  return (
    <div className="ttt-app">
      <main className="ttt-container">
        <section
          className={`ttt-status ${
            winner ? "ttt-status--success" : isDraw ? "ttt-status--error" : ""
          }`}
          aria-live="polite"
        >
          <h1 className="ttt-title">Tic Tac Toe</h1>
          <div className="ttt-statusText">{status}</div>
        </section>

        <section className="ttt-surface" aria-label="Game">
          <Board
            squares={squares}
            onPlay={handlePlay}
            disabled={isGameOver}
            winningLine={winningLine}
          />
        </section>

        <div className="ttt-controls">
          <button type="button" className="ttt-resetBtn" onClick={handleReset}>
            {isGameOver ? "New Game" : "Reset"}
          </button>
          <div className="ttt-meta" aria-label="Move count">
            Moves: <strong>{moveCount}</strong>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
