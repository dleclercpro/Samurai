import { GameState } from '../types/StateTypes';
import { GameAction } from '../actions';
import { SELECT_BOARD_TILE, DESELECT_BOARD_TILE, SELECT_HAND_TILE, DESELECT_HAND_TILE, SELECT_TILE_FROM_FOR_SWAP, DESELECT_TILE_FROM_FOR_SWAP, SELECT_CASTE_FROM_FOR_SWAP, SELECT_TILE_TO_FOR_SWAP, DESELECT_TILE_TO_FOR_SWAP, SELECT_CASTE_TO_FOR_SWAP, DESELECT_CASTE_TO_FOR_SWAP, END_TURN, START_CASTE_SWAP, START_TILE_MOVE, SELECT_BOARD_TILE_TO_MOVE_FROM, SELECT_BOARD_TILE_TO_MOVE_TO, DESELECT_CASTE_FROM_FOR_SWAP, FINISH_CASTE_SWAP, SET_GAME_ID, SET_GAME_VERSION, SET_PLAYED_TILES_SINCE_LAST_TURN, RESET_GAME, SET_GAME_NAME } from '../types/ActionTypes';
import { Caste, TilePlayStep, CasteSwapStep, GameStep, TileMoveStep } from '../types/GameTypes';
import { parsePlayedTiles } from '../parse';

const initPlayState = {
    boardTile: -1,
    handTile: -1,
};

const initMoveState = {
    from: -1,
    to: -1,
};

const initSwapInnerState = {
    tile: -1,
    caste: Caste.Unknown,
}

const initSwapState = {
    from: { ...initSwapInnerState },
    to: { ...initSwapInnerState },
};

const initSelectionState = {
    play: { ...initPlayState },
    move: { ...initMoveState },
    swap: { ...initSwapState },
}

const initState: GameState = {
    id: '-1',
    name: '',
    version: -1,
    step: TilePlayStep.ChooseBoardTile,
    selection: { ...initSelectionState },
    playedTilesSinceLastTurn: new Map(),
};

const getNextGameStep = (step: GameStep, action: string): GameStep => {
    
    switch (step) {

        // Tile play
        case TilePlayStep.ChooseBoardTile:
            switch (action) {
                case SELECT_BOARD_TILE:
                    return TilePlayStep.ChooseHandTile;
                case START_CASTE_SWAP:
                    return CasteSwapStep.ChooseTileFrom;
                case START_TILE_MOVE:
                    return TileMoveStep.ChooseHandTile;
            }
            break;
        case TilePlayStep.ChooseHandTile:
            switch (action) {
                case DESELECT_BOARD_TILE:
                    return TilePlayStep.ChooseBoardTile;
                case SELECT_HAND_TILE:
                    return TilePlayStep.Done;
            }
            break;
        case TilePlayStep.Done:
            switch (action) {
                case DESELECT_HAND_TILE:
                    return TilePlayStep.ChooseHandTile;
                case SELECT_HAND_TILE:
                    return step;
            }
            break;

        // Caste piece swap
        case CasteSwapStep.ChooseTileFrom:
            switch (action) {
                case SELECT_TILE_FROM_FOR_SWAP:
                    return CasteSwapStep.ChooseCasteFrom;
            }
            break;
        case CasteSwapStep.ChooseCasteFrom:
            switch (action) {
                case DESELECT_TILE_FROM_FOR_SWAP:
                    return CasteSwapStep.ChooseTileFrom;
                case SELECT_CASTE_FROM_FOR_SWAP:
                    return CasteSwapStep.ChooseFromDone;
            }
            break;
        case CasteSwapStep.ChooseFromDone:
            switch (action) {
                case FINISH_CASTE_SWAP:
                    return CasteSwapStep.ChooseTileTo;
                case DESELECT_CASTE_FROM_FOR_SWAP:
                    return CasteSwapStep.ChooseCasteFrom;
                case SELECT_CASTE_FROM_FOR_SWAP:
                    return step;
            }
            break;
        case CasteSwapStep.ChooseTileTo:
            switch (action) {
                case SELECT_TILE_TO_FOR_SWAP:
                    return CasteSwapStep.ChooseCasteTo;
            }
            break;
        case CasteSwapStep.ChooseCasteTo:
            switch (action) {
                case DESELECT_TILE_TO_FOR_SWAP:
                    return CasteSwapStep.ChooseTileTo;
                case SELECT_CASTE_TO_FOR_SWAP:
                    return CasteSwapStep.ChooseToDone;
            }
            break;
        case CasteSwapStep.ChooseToDone:
            switch (action) {
                case DESELECT_CASTE_TO_FOR_SWAP:
                    return CasteSwapStep.ChooseCasteTo;
                case SELECT_CASTE_TO_FOR_SWAP:
                    return step;
            }
            break;

        // Tile move
        case TileMoveStep.ChooseHandTile:
            switch (action) {
                case SELECT_BOARD_TILE_TO_MOVE_FROM:
                    return TileMoveStep.ChooseBoardTile;
            }
            break;
        case TileMoveStep.ChooseBoardTile:
            switch (action) {
                case SELECT_BOARD_TILE_TO_MOVE_TO:
                    return TileMoveStep.Done;
            }
            break;
        case TileMoveStep.Done:
            return TilePlayStep.ChooseBoardTile;
    }

    // Idle state
    return TilePlayStep.ChooseBoardTile;
}

const GameReducer = (state: GameState = initState, action: GameAction) => {
    switch (action.type) {
        case RESET_GAME:
            return { ...initState };

        case SET_GAME_ID:
            return {
                ...state,
                id: action.id,
            };

        case SET_GAME_NAME:
            return {
                ...state,
                name: action.name,
            };

        case SET_GAME_VERSION:
            return {
                ...state,
                version: action.version,
            };

        case SET_PLAYED_TILES_SINCE_LAST_TURN:
            return {
                ...state,
                playedTilesSinceLastTurn: parsePlayedTiles(action.playedTiles),
            };

        case END_TURN:
            return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: { ...initSelectionState },
            };

        case START_TILE_MOVE:
        case START_CASTE_SWAP:
        case FINISH_CASTE_SWAP:
            return {
                ...state,
                step: getNextGameStep(state.step, action.type),
            }

        case SELECT_BOARD_TILE:
        case DESELECT_BOARD_TILE:
            return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: {
                    ...state.selection,
                    play: {
                        ...state.selection.play,
                        boardTile: action.id,
                    },
                },
            };
        case SELECT_HAND_TILE:
        case DESELECT_HAND_TILE:
                return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: {
                    ...state.selection,
                    play: {
                        ...state.selection.play,
                        handTile: action.id,
                    },
                },
            };

        // Move steps
        case SELECT_BOARD_TILE_TO_MOVE_FROM:
            return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: {
                    ...state.selection,
                    move: {
                        ...state.selection.move,
                        from: action.tile,
                    },
                },
            };
        case SELECT_BOARD_TILE_TO_MOVE_TO:
            return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: {
                    ...state.selection,
                    move: {
                        ...state.selection.move,
                        to: action.tile,
                    },
                },
            };

        // Swap steps
        case SELECT_TILE_FROM_FOR_SWAP:
        case DESELECT_TILE_FROM_FOR_SWAP:
                return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: {
                    ...state.selection,
                    swap: {
                        ...state.selection.swap,
                        from: {
                            ...state.selection.swap.from,
                            tile: action.tile,
                        },
                    },
                },
            };
        case SELECT_CASTE_FROM_FOR_SWAP:
        case DESELECT_CASTE_FROM_FOR_SWAP:
                return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: {
                    ...state.selection,
                    swap: {
                        ...state.selection.swap,
                        from: {
                            ...state.selection.swap.from,
                            caste: action.caste,
                        },
                    },
                },
            };
        case SELECT_TILE_TO_FOR_SWAP:
        case DESELECT_TILE_TO_FOR_SWAP:
            return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: {
                    ...state.selection,
                    swap: {
                        ...state.selection.swap,
                        to: {
                            ...state.selection.swap.to,
                            tile: action.tile,
                        },
                    },
                },
            };
        case SELECT_CASTE_TO_FOR_SWAP:
        case DESELECT_CASTE_TO_FOR_SWAP:
                return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: {
                    ...state.selection,
                    swap: {
                        ...state.selection.swap,
                        to: {
                            ...state.selection.swap.to,
                            caste: action.caste,
                        },
                    },
                },
            };
        default:
            return state;
    }
};

export default GameReducer;