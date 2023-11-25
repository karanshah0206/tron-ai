/**
 * Generate next move for player two randomly.
 *
 * @param {number[]} position
 * @param {HTMLTableCellElement[][]} arena
 * @returns {boolean} Move possible?
 */
function moveRandomAgent(position, arena) {
    const possibleMoves = generatePossibleMoves(position, arena);
    if (possibleMoves.length == 0) return false;

    const newPosition = possibleMoves[(Math.floor(Math.random() * possibleMoves.length))];
    position[0] = newPosition[0];
    position[1] = newPosition[1];
    return true;
}
