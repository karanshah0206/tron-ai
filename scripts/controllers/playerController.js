/**
 * Check if a move made by a player is possible.
 *
 * @param {number[]} position
 * @param {HTMLTableCellElement[][]} arena
 * @returns {boolean} Move possible?
 */
function checkMove(position, arena) {
    if (position[0] < 0 || position[0] >= ARENA_ROW_COUNT || position[1] < 0 || position[1] >= ARENA_COL_COUNT)
        return false;
    return arena[position[0]][position[1]].classList.length == 1;
}

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
    if (checkMove(newPosition, arena)) possibleMoves.push([...newPosition]);
    newPosition[0] -= 2;
    if (checkMove(newPosition, arena)) possibleMoves.push([...newPosition]);
    newPosition[0]++; newPosition[1]--;
    if (checkMove(newPosition, arena)) possibleMoves.push([...newPosition]);
    newPosition[1] += 2;
    if (checkMove(newPosition, arena)) possibleMoves.push([...newPosition]);

    return possibleMoves;
}

/**
 * Move player one (human) based on chosen action.
 *
 * @param {number[]} position
 * @param {string} key
 * @param {HTMLTableCellElement[][]} arena
 * @returns {boolean} Move possible?
 */
function movePlayerOne(position, key, arena) {
    if (key == "w") position[0]--;
    else if (key == "s") position[0]++;
    else if (key == "a") position[1]--;
    else if (key == "d") position[1]++;
    return checkMove(position, arena);
}

/**
 * Generate move for player two (AI) based on user's mode selection.
 *
 * @param {number[]} playerTwoPosition
 * @param {number[]} playerOnePosition
 * @param {HTMLTableCellElement[][]} arena
 * @param {string} mode
 * @returns {boolean} Move possible?
 */
function movePlayerTwo(playerTwoPosition, playerOnePosition, arena, mode) {
    if (mode == "Random") return moveRandomAgent(playerTwoPosition, arena);
    else if (mode == "Depth-Limited Minimax") return moveMinimaxAgent(playerTwoPosition, playerOnePosition, arena);
    throw Error(`Unrecognized mode ${mode}.`);
}
