import React from "react";
import Square from "./Square";

/**
 * 3x3 board renderer.
 */

// PUBLIC_INTERFACE
export default function Board({ squares, onPlay, disabled, winningLine }) {
  /**
   * @param {Object} props
   * @param {Array<"X"|"O"|null>} props.squares
   * @param {(index:number)=>void} props.onPlay
   * @param {boolean} props.disabled
   * @param {number[] | null} props.winningLine
   */
  const isWinningIndex = (idx) => Array.isArray(winningLine) && winningLine.includes(idx);

  return (
    <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          onClick={() => onPlay(idx)}
          disabled={disabled || value !== null}
          isWinning={isWinningIndex(idx)}
        />
      ))}
    </div>
  );
}
