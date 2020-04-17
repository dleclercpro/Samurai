import { GameState } from '../types/StateTypes';
import { GameAction } from '../actions';
import { SELECT_BOARD_TILE, DESELECT_BOARD_TILE, SELECT_PLAYER_TILE, DESELECT_PLAYER_TILE, SELECT_TILE_FROM_FOR_SWITCH, DESELECT_TILE_FROM_FOR_SWITCH, SELECT_CASTE_FROM_FOR_SWITCH, SELECT_TILE_TO_FOR_SWITCH, DESELECT_TILE_TO_FOR_SWITCH, SELECT_CASTE_TO_FOR_SWITCH, DESELECT_CASTE_TO_FOR_SWITCH, END_TURN, START_CASTE_SWITCH, START_TILE_MOVE, SELECT_BOARD_TILE_TO_MOVE_FROM, SELECT_BOARD_TILE_TO_MOVE_TO, DESELECT_CASTE_FROM_FOR_SWITCH, FINISH_CASTE_SWITCH, SWITCH_COLORS, SET_GAME_ID } from '../types/ActionTypes';
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

const getNextStep = (step: GameStep, action: string): GameStep => {
    
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
                case END_TURN:
                    return TilePlayStep.ChooseBoardTile;
            }
            break;

        // Caste switch
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
                case END_TURN:
                    return TilePlayStep.ChooseBoardTile;
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

    return TilePlayStep.ChooseBoardTile;
}

const GameReducer = (state: GameState = initState, action: GameAction) => {
    const nextState = {
        ...state,
        step: getNextStep(state.step, action.type),
    };

    switch (action.type) {
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

        case END_TURN:
            return {
                ...nextState,
                selection: { ...initSelectionState },
            };

        case START_TILE_MOVE:
        case START_CASTE_SWITCH:
        case FINISH_CASTE_SWITCH:
            return {
                ...nextState,
            }

        case SELECT_BOARD_TILE:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    play: {
                        ...nextState.selection.play,
                        boardTile: action.id,
                    },
                },
            };
        case DESELECT_BOARD_TILE:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    play: {
                        ...nextState.selection.play,
                        boardTile: -1,
                    },
                },
            };
        case SELECT_PLAYER_TILE:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    play: {
                        ...nextState.selection.play,
                        playerTile: action.id,
                    },
                },
            };
        case DESELECT_PLAYER_TILE:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    play: {
                        ...nextState.selection.play,
                        playerTile: -1,
                    },
                },
            };

        // Move steps
        case SELECT_BOARD_TILE_TO_MOVE_FROM:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    move: {
                        ...nextState.selection.move,
                        from: action.tile,
                    },
                },
            };
        case SELECT_BOARD_TILE_TO_MOVE_TO:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    move: {
                        ...nextState.selection.move,
                        to: action.tile,
                    },
                },
            };

        // Switch steps
        case SELECT_TILE_FROM_FOR_SWITCH:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    switch: {
                        ...nextState.selection.switch,
                        from: {
                            ...nextState.selection.switch.from,
                            tile: action.tile,
                        },
                    },
                },
            };
        case DESELECT_TILE_FROM_FOR_SWITCH:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    switch: {
                        ...nextState.selection.switch,
                        from: {
                            ...nextState.selection.switch.from,
                            tile: -1,
                        },
                    },
                },
            };
        case SELECT_CASTE_FROM_FOR_SWITCH:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    switch: {
                        ...nextState.selection.switch,
                        from: {
                            ...nextState.selection.switch.from,
                            caste: action.caste,
                        },
                    },
                },
            };
        case DESELECT_CASTE_FROM_FOR_SWITCH:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    switch: {
                        ...nextState.selection.switch,
                        from: {
                            ...nextState.selection.switch.from,
                            caste: Caste.Unknown,
                        },
                    },
                },
            };
        case SELECT_TILE_TO_FOR_SWITCH:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    switch: {
                        ...nextState.selection.switch,
                        to: {
                            ...nextState.selection.switch.to,
                            tile: action.tile,
                        },
                    },
                },
            };
        case DESELECT_TILE_TO_FOR_SWITCH:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    switch: {
                        ...nextState.selection.switch,
                        to: {
                            ...nextState.selection.switch.to,
                            tile: -1,
                        },
                    },
                },
            };
        case SELECT_CASTE_TO_FOR_SWITCH:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    switch: {
                        ...nextState.selection.switch,
                        to: {
                            ...nextState.selection.switch.to,
                            caste: action.caste,
                        },
                    },
                },
            };
        case DESELECT_CASTE_TO_FOR_SWITCH:
            return {
                ...nextState,
                selection: {
                    ...nextState.selection,
                    switch: {
                        ...nextState.selection.switch,
                        to: {
                            ...nextState.selection.switch.to,
                            caste: Caste.Unknown,
                        },
                    },
                },
            };
        default:
            return state;
    }
};

export default GameReducer;