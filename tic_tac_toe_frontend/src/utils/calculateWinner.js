/**
 * Utility for determining game outcome.
 * Returns null if there is no winner yet, otherwise returns { winner, line } where
 * `line` is an array of the 3 winning square indices.
 */

// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  /**
   * Calculate the winner for a 3x3 Tic Tac Toe board.
   *
   * @param {Array<"X"|"O"|null>} squares - Length-9 array representing the board.
   * @returns {{winner: "X"|"O", line: number[]} | null} Winner data or null.
   */
  const lines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    const v = squares[a];
    if (v && v === squares[b] && v === squares[c]) {
      return { winner: v, line };
    }
  }

  return null;
}

export default calculateWinner;
