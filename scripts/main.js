const ARENA_ROW_COUNT = 30;
const ARENA_COL_COUNT = 30;
const ARENA_DOM_ID = "arena";
const ARENA_CELL_DOM_CLASS = "arena-cell";

const PLAYER_ONE_DOM_CLASS = "player-one-cell";
const PLAYER_TWO_DOM_CLASS = "player-two-cell";
const HIDDEN_DOM_CLASS = "hidden";

const WINNER_TEXT_DOM_ID = "winner";

const MODE_SELECTOR_DOM_ID = "mode-selector";
const MODE_WRAPPER_DOM_ID = "mode-selector-wrapper";
const MODE_INDICATOR_DOM_ID = "mode-indicator";

const KEYBOARD_ACTIONS = ["w", "s", "a", "d"]; // up, down, left, right

/**
 * Kicks-off the game and acts as the controller.
 *
 * Listens for keypress KeyboardEvent for user (player one) move input.
 */
function main() {
    const mode = initialiseMode();
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
                if (movePlayerTwo(playerTwoPos, playerOnePos, arena, mode))
                    updateArena(arena, playerOnePos, playerTwoPos);
                else winner = 1;
            }
            else winner = 2;

            if (winner) showWinner(winner);
        }
    });
}
