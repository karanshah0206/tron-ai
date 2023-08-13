/**
 * Fetches user's selection of opponent (agent) mode from DOM.
 *
 * Throws an Error if mode cannot be fetched from DOM.
 *
 * @returns {string} Mode
 */
function initialiseMode() {
    const mode = document.getElementById(MODE_SELECTOR_DOM_ID).value;
    if (!mode) throw Error("Could not fetch mode.");

    const modeIndicator = document.getElementById(MODE_INDICATOR_DOM_ID);
    modeIndicator.classList.remove(HIDDEN_DOM_CLASS);
    modeIndicator.innerText = `Playing against "${mode}" agent type.`;

    document.getElementById(MODE_WRAPPER_DOM_ID).classList.add(HIDDEN_DOM_CLASS);

    return mode;
}

/**
 * Creates and initialises the game arena on the DOM.
 *
 * Throws an Error if arena element not found on DOM.
 *
 * @returns {HTMLTableCellElement[][]} Arena as a 2D grid.
 */
function createArena() {
    const arenaOnDOM = document.getElementById(ARENA_DOM_ID);
    if (!arenaOnDOM) throw new Error("Arena not found on DOM.");

    const arena = [];

    for (let row = 0; row < ARENA_ROW_COUNT; row++) {
        const rowOnDOM = document.createElement("tr");
        const arenaRow = [];

        for (let col = 0; col < ARENA_COL_COUNT; col++) {
            const cellOnDOM = document.createElement("td");
            cellOnDOM.classList.add(ARENA_CELL_DOM_CLASS);

            arenaRow.push(cellOnDOM);
            rowOnDOM.appendChild(cellOnDOM);
        }

        arena.push(arenaRow);
        arenaOnDOM.appendChild(rowOnDOM);
    }

    arenaOnDOM.classList.remove(HIDDEN_DOM_CLASS);

    return arena;
}

/**
 * Updates new positions of players on arena.
 *
 * @param {HTMLTableCellElement[][]} arena
 * @param {number[]} playerOnePos
 * @param {number[]} playerTwoPos
 */
function updateArena(arena, playerOnePos, playerTwoPos) {
    arena[playerOnePos[0]][playerOnePos[1]].classList.add(PLAYER_ONE_DOM_CLASS);
    arena[playerTwoPos[0]][playerTwoPos[1]].classList.add(PLAYER_TWO_DOM_CLASS);
}

/**
 * Render the winner of the game on DOM.
 *
 * @param {number} winner
 */
function showWinner(winner) {
    document.getElementById(WINNER_TEXT_DOM_ID).innerText = `Player ${winner} wins!`;
}
