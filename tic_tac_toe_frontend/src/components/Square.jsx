import React from "react";

/**
 * Single cell on the board.
 */

// PUBLIC_INTERFACE
export default function Square({ value, onClick, disabled, isWinning }) {
  /** Presentational button for a board cell. */
  return (
    <button
      type="button"
      className={`ttt-square ${isWinning ? "ttt-square--winning" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Square: ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
}
