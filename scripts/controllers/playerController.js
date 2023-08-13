/**
 * Check if a move made by a player is possible.
 *
 * @param {number[]} position
 * @param {HTMLTableCellElement[][]} arena
 * @param {boolean} playerOne
 * @returns {boolean} Move possible?
 */
function checkMove(position, arena, playerOne) {
    if (position[0] < 0 || position[0] >= ARENA_ROW_COUNT || position[1] < 0 || position[1] >= ARENA_COL_COUNT)
        return false;
    return arena[position[0]][position[1]].classList.length == 1;
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
    return checkMove(position, arena, true);
}

/**
 * Generate move for player two (AI) based on user's mode selection.
 *
 * @param {number[]} position
 * @param {HTMLTableCellElement[][]} arena
 * @param {string} mode
 * @returns {boolean} Move possible?
 */
function movePlayerTwo(position, arena, mode) {
    if (mode == "Random") return moveRandomAgent(position, arena);
    throw Error(`Unrecognized mode ${mode}.`);
}
