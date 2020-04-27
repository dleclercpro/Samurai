import { GameState } from '../types/StateTypes';
import { GameAction } from '../actions';
import { SELECT_BOARD_TILE, DESELECT_BOARD_TILE, SELECT_PLAYER_TILE, DESELECT_PLAYER_TILE, SELECT_TILE_FROM_FOR_SWITCH, DESELECT_TILE_FROM_FOR_SWITCH, SELECT_CASTE_FROM_FOR_SWITCH, SELECT_TILE_TO_FOR_SWITCH, DESELECT_TILE_TO_FOR_SWITCH, SELECT_CASTE_TO_FOR_SWITCH, DESELECT_CASTE_TO_FOR_SWITCH, END_TURN, START_CASTE_SWITCH, START_TILE_MOVE, SELECT_BOARD_TILE_TO_MOVE_FROM, SELECT_BOARD_TILE_TO_MOVE_TO, DESELECT_CASTE_FROM_FOR_SWITCH, FINISH_CASTE_SWITCH, SWITCH_COLORS, SET_GAME_ID, RESET_GAME_ID } from '../types/ActionTypes';
import { Caste, TilePlayStep, CasteSwitchStep, GameStep, TileMoveStep, ColorMode } from '../types/GameTypes';

const initPlayState = {
    boardTile: -1,
    playerTile: -1,
};

const initMoveState = {
    from: -1,
    to: -1,
};

const initSwitchInnerState = {
    tile: -1,
    caste: Caste.Unknown,
}

const initSwitchState = {
    from: { ...initSwitchInnerState },
    to: { ...initSwitchInnerState },
};

const initSelectionState = {
    play: { ...initPlayState },
    move: { ...initMoveState },
    switch: { ...initSwitchState },
}

const initState = {
    id: -1,
    step: TilePlayStep.ChooseBoardTile,
    selection: { ...initSelectionState },
    colors: ColorMode.Normal,
};

const getNextGameStep = (step: GameStep, action: string): GameStep => {
    
    switch (step) {

        // Tile play
        case TilePlayStep.ChooseBoardTile:
            switch (action) {
                case SELECT_BOARD_TILE:
                    return TilePlayStep.ChoosePlayerTile;
                case START_CASTE_SWITCH:
                    return CasteSwitchStep.ChooseTileFrom;
                case START_TILE_MOVE:
                    return TileMoveStep.ChoosePlayerTile;
            }
            break;
        case TilePlayStep.ChoosePlayerTile:
            switch (action) {
                case DESELECT_BOARD_TILE:
                    return TilePlayStep.ChooseBoardTile;
                case SELECT_PLAYER_TILE:
                    return TilePlayStep.Done;
            }
            break;
        case TilePlayStep.Done:
            switch (action) {
                case DESELECT_PLAYER_TILE:
                    return TilePlayStep.ChoosePlayerTile;
                case SELECT_PLAYER_TILE:
                    return step;
            }
            break;

        // Caste piece switch
        case CasteSwitchStep.ChooseTileFrom:
            switch (action) {
                case SELECT_TILE_FROM_FOR_SWITCH:
                    return CasteSwitchStep.ChooseCasteFrom;
            }
            break;
        case CasteSwitchStep.ChooseCasteFrom:
            switch (action) {
                case DESELECT_TILE_FROM_FOR_SWITCH:
                    return CasteSwitchStep.ChooseTileFrom;
                case SELECT_CASTE_FROM_FOR_SWITCH:
                    return CasteSwitchStep.ChooseFromDone;
            }
            break;
        case CasteSwitchStep.ChooseFromDone:
            switch (action) {
                case FINISH_CASTE_SWITCH:
                    return CasteSwitchStep.ChooseTileTo;
                case DESELECT_CASTE_FROM_FOR_SWITCH:
                    return CasteSwitchStep.ChooseCasteFrom;
                case SELECT_CASTE_FROM_FOR_SWITCH:
                    return step;
            }
            break;
        case CasteSwitchStep.ChooseTileTo:
            switch (action) {
                case SELECT_TILE_TO_FOR_SWITCH:
                    return CasteSwitchStep.ChooseCasteTo;
            }
            break;
        case CasteSwitchStep.ChooseCasteTo:
            switch (action) {
                case DESELECT_TILE_TO_FOR_SWITCH:
                    return CasteSwitchStep.ChooseTileTo;
                case SELECT_CASTE_TO_FOR_SWITCH:
                    return CasteSwitchStep.ChooseToDone;
            }
            break;
        case CasteSwitchStep.ChooseToDone:
            switch (action) {
                case DESELECT_CASTE_TO_FOR_SWITCH:
                    return CasteSwitchStep.ChooseCasteTo;
                case SELECT_CASTE_TO_FOR_SWITCH:
                    return step;
            }
            break;

        // Tile move
        case TileMoveStep.ChoosePlayerTile:
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
        case RESET_GAME_ID:
            return {
                ...state,
                id: -1,
            }
        case SET_GAME_ID:
            return {
                ...state,
                id: action.id,
            }

        case SWITCH_COLORS:
            return {
                ...state,
                colors: state.colors === ColorMode.Normal ? ColorMode.Blind : ColorMode.Normal,
            };

        case START_TILE_MOVE:
        case START_CASTE_SWITCH:
        case FINISH_CASTE_SWITCH:
            return {
                ...state,
                step: getNextGameStep(state.step, action.type),
            }

        case END_TURN:
            return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: { ...initSelectionState },
            };

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
        case SELECT_PLAYER_TILE:
        case DESELECT_PLAYER_TILE:
                return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: {
                    ...state.selection,
                    play: {
                        ...state.selection.play,
                        playerTile: action.id,
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

        // Switch steps
        case SELECT_TILE_FROM_FOR_SWITCH:
        case DESELECT_TILE_FROM_FOR_SWITCH:
                return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: {
                    ...state.selection,
                    switch: {
                        ...state.selection.switch,
                        from: {
                            ...state.selection.switch.from,
                            tile: action.tile,
                        },
                    },
                },
            };
        case SELECT_CASTE_FROM_FOR_SWITCH:
        case DESELECT_CASTE_FROM_FOR_SWITCH:
                return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: {
                    ...state.selection,
                    switch: {
                        ...state.selection.switch,
                        from: {
                            ...state.selection.switch.from,
                            caste: action.caste,
                        },
                    },
                },
            };
        case SELECT_TILE_TO_FOR_SWITCH:
        case DESELECT_TILE_TO_FOR_SWITCH:
            return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: {
                    ...state.selection,
                    switch: {
                        ...state.selection.switch,
                        to: {
                            ...state.selection.switch.to,
                            tile: action.tile,
                        },
                    },
                },
            };
        case SELECT_CASTE_TO_FOR_SWITCH:
        case DESELECT_CASTE_TO_FOR_SWITCH:
                return {
                ...state,
                step: getNextGameStep(state.step, action.type),
                selection: {
                    ...state.selection,
                    switch: {
                        ...state.selection.switch,
                        to: {
                            ...state.selection.switch.to,
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