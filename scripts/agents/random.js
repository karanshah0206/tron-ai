/**
 * Generate a list of possible moves given the current position.
 *
 * @param {number[]} position
 * @param {HTMLTableCellElement[][]} arena
 * @returns {number[][]} Possible moves
 */
function generatePossibleMoves(position, arena) {
    const possibleMoves = [];

    const newPosition = [position[0] + 1, position[1]];
    if (checkMove(newPosition, arena, false)) possibleMoves.push([...newPosition]);
    newPosition[0] -= 2;
    if (checkMove(newPosition, arena, false)) possibleMoves.push([...newPosition]);
    newPosition[0]++; newPosition[1]--;
    if (checkMove(newPosition, arena, false)) possibleMoves.push([...newPosition]);
    newPosition[1] += 2;
    if (checkMove(newPosition, arena, false)) possibleMoves.push([...newPosition]);

    return possibleMoves;
}

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
