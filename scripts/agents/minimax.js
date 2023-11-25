/**
 * A node used to represent a cell on the 2D grid for enabling search.
 *
 * @typedef {Object} CellNode
 * @property {number} shortestDistanceForPlayerOne
 * @property {number} shortestDistanceForPlayerTwo
 * @property {boolean} exploredForPlayerOne
 * @property {boolean} exploredForPlayerTwo
 */

/**
 * Pops shortest unexplored node from frontier and returns.
 *
 * @param {CellNode[][]} nodesMatrix
 * @param {number[][]} frontier
 * @param {boolean} playerOne
 * @returns {number[]} Next node for Dijkstra search
 */
function pickNext(nodesMatrix, frontier, playerOne) {
    let indexToRemove = -1, shortest = Infinity;

    frontier.forEach((position, index) => {
        const node = nodesMatrix[position[0]][position[1]];
        const dist = playerOne ? node.shortestDistanceForPlayerOne : node.shortestDistanceForPlayerTwo;
        if (dist < shortest) {
            shortest = dist;
            indexToRemove = index;
        }
    });

    const result = [...frontier[indexToRemove]];
    frontier.splice(indexToRemove, 1);
    return result;
}

/**
 * Find shortest path to all reachable nodes in a matrix using Dijkstra's algorithm.
 *
 * @param {CellNode[][]} nodesMatrix
 * @param {number[]} position
 * @param {boolean} playerOne
 * @param {HTMLTableCellElement[][]} arena
 */
function dijkstra(nodesMatrix, position, playerOne, arena) {
    // Initialise distances for players' current positions
    if (playerOne) {
        nodesMatrix[position[0]][position[1]].shortestDistanceForPlayerOne = 0;
        nodesMatrix[position[0]][position[1]].exploredForPlayerOne = false;
    } else {
        nodesMatrix[position[0]][position[1]].shortestDistanceForPlayerTwo = 0;
        nodesMatrix[position[0]][position[1]].exploredForPlayerTwo = false;
    }

    const frontier = [[...position]];

    while (frontier.length > 0) {
        const current = pickNext(nodesMatrix, frontier, playerOne);
        const node = nodesMatrix[current[0]][current[1]];

        if ((playerOne && node.exploredForPlayerOne) || (!playerOne && node.exploredForPlayerTwo)) continue;

        const dist = (playerOne) ? node.shortestDistanceForPlayerOne : node.shortestDistanceForPlayerTwo;
        (playerOne) ? node.exploredForPlayerOne = true : node.exploredForPlayerTwo = true;

        const moves = generatePossibleMoves(current, arena);
        moves.forEach(move => {
            const newNode = nodesMatrix[move[0]][move[1]];
            if (playerOne && !newNode.exploredForPlayerOne) {
                if (dist + 1 < newNode.shortestDistanceForPlayerOne) {
                    newNode.shortestDistanceForPlayerOne = dist + 1;
                    frontier.push([...move]);
                }
            }
            else if (!playerOne && !newNode.exploredForPlayerTwo) {
                if (dist + 1 < newNode.shortestDistanceForPlayerTwo) {
                    newNode.shortestDistanceForPlayerTwo = dist + 1;
                    frontier.push([...move]);
                }
            }
        });
    }
}

/**
 * Determine which agent is closer to more number of unoccupied cells
 * using Voronoi partition to use as a heuristic for the AI agent.
 *
 * @param {HTMLTableCellElement[][]} arena
 * @returns {number} Ratio of free cells closer to player two against those closer to player one.
 */
function voronoi(arena, playerTwoPosition, playerOnePosition) {
    // Initialise search nodes in a matrix
    const nodesMatrix = Array(ARENA_ROW_COUNT).fill().map(_ => Array(ARENA_COL_COUNT).fill().map(_ => {
        return {
            shortestDistanceForPlayerOne: Infinity,
            shortestDistanceForPlayerTwo: Infinity,
            exploredForPlayerOne: false,
            exploredForPlayerTwo: false,
        }
    }));

    // Mark unavailable nodes
    arena.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell.classList.length > 1) {
                nodesMatrix[rowIndex][colIndex].exploredForPlayerOne = true;
                nodesMatrix[rowIndex][colIndex].exploredForPlayerTwo = true;
            }
        });
    });

    // Find shortest distance to all reachable nodes for both agents
    dijkstra(nodesMatrix, playerOnePosition, true, arena);
    dijkstra(nodesMatrix, playerTwoPosition, false, arena);

    // Calculate ratio of free cells closer to player two against those closer to player one
    const result = [0, 0];
    nodesMatrix.forEach(row => {
        row.forEach(col => {
            if (col.shortestDistanceForPlayerTwo < col.shortestDistanceForPlayerOne) result[0]++;
            else if (col.shortestDistanceForPlayerTwo > col.shortestDistanceForPlayerOne) result[1]++;
            else if (col.shortestDistanceForPlayerTwo != Infinity) result[0]++;
        })
    });
    result[0]--; result[1]--; // Decrementing count of agents' current positions
    return (result[0] == 0) ? 0 : result[0]/result[1];
}

/**
 * Generate next move for player two using depth-limited Minimax.
 *
 * @param {number[]} maximiserPosition
 * @param {number[]} minimiserPosition
 * @param {HTMLTableCellElement[][]} arena
 * @returns {boolean} Move possible?
 */
function moveMinimaxAgent(maximiserPosition, minimiserPosition, arena) {
    // debugging only
    console.log(voronoi(arena, maximiserPosition, minimiserPosition));

    // TODO
    return true;
}
