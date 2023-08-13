const ARENA_ROW_COUNT = 30;
const ARENA_COL_COUNT = 30;
const ARENA_DOM_ID = "arena";
const ARENA_CELL_DOM_CLASS = "arena-cell";

const PLAYER_ONE_DOM_CLASS = "player-one-cell";
const PLAYER_TWO_DOM_CLASS = "player-two-cell";

const KEYBOARD_ACTIONS = ["w", "s", "a", "d"]; // up, down, left, right

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
    const opponentClass = (playerOne) ? PLAYER_TWO_DOM_CLASS : PLAYER_ONE_DOM_CLASS;
    return !arena[position[0]][position[1]].classList.contains(opponentClass);
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
 * Generate move for player two (AI).
 *
 * @param {number[]} position 
 * @param {HTMLTableCellElement[][]} arena
 * @returns {boolean} Move possible?
 */
function movePlayerTwo(position, arena) {
    // TODO
    return false;
}

/**
 * Render the winner of the game on DOM.
 *
 * @param {number} winner
 */
function showWinner(winner) {
    // TODO
}

/**
 * Kicks-off the game and acts as the controller.
 *
 * Listens for keypress KeyboardEvent for user (player one) move input.
 */
function main() {
    const playerOnePos = [0, 0];
    const playerTwoPos = [13, 4];
    const arena = createArena();

    let winner = 0; // 1 = Player One, 2 = Player 2

    updateArena(arena, playerOnePos, playerTwoPos);

    document.addEventListener("keypress", (keyboardEvent) => {
        const key = keyboardEvent.key;

        if (!winner && KEYBOARD_ACTIONS.includes(key)) {
            if (movePlayerOne(playerOnePos, key, arena)) {
                updateArena(arena, playerOnePos, playerTwoPos);
                if (movePlayerTwo(playerTwoPos, arena))
                    updateArena(arena, playerOnePos, playerTwoPos);
                else winner = 1;
            }
            else winner = 2;

            if (winner) showWinner(winner);
        }
    });
}

main();
