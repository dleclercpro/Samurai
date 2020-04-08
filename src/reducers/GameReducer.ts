import { GameState } from '../types/StateTypes';
import { GameAction } from '../actions';
import { SELECT_PLAYER_TILE, DESELECT_PLAYER_TILE, SELECT_CASTE_SWITCH_FROM, SELECT_CASTE_SWITCH_TO, START_CASTE_SWITCH, END_CASTE_SWITCH, START_TILE_MOVE, END_TILE_MOVE, SELECT_BOARD_TILE, DESELECT_BOARD_TILE, DESELECT_CASTE_SWITCH_FROM, DESELECT_CASTE_SWITCH_TO, SELECT_CASTE_SWITCH_TILE, SELECT_CASTE_FOR_SWITCH, DESELECT_CASTE_SWITCH_TILE, DESELECT_CASTE_FOR_SWITCH } from '../types/ActionTypes';
import { Caste } from '../types/GameTypes';

const initCasteSwitchFromToState = {
    tile: -1,
    caste: Caste.Unknown,
}

const initTileMoveState = {
    from: -1,
    to: -1,
};

const initCasteSwitchState = {
    from: { ...initCasteSwitchFromToState },
    to: { ...initCasteSwitchFromToState },
};

const initSelectedState = {
    boardTile: -1,
    boardTileForSwitch: -1,
    playerTile: -1,
    playerTileForMove: -1,
    caste: Caste.Unknown,
}

const initState = {
    isSwitching: false,
    isMoving: false,
    selected: { ...initSelectedState },
    casteSwitch: { ...initCasteSwitchState },
    tileMove: { ...initTileMoveState },
};

const GameReducer = (state: GameState = initState, action: GameAction) => {
    switch (action.type) {
        case SELECT_BOARD_TILE:
        case DESELECT_BOARD_TILE:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    boardTile: action.id,
                },
            };
        case SELECT_PLAYER_TILE:
        case DESELECT_PLAYER_TILE:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    playerTile: action.id,
                },
            };
        case START_TILE_MOVE:
            return {
                ...state,
                isMoving: true,
            };
        case END_TILE_MOVE:
            return {
                ...state,
                isMoving: false,
                tileMove: { ...initTileMoveState },
                selected: {
                    ...state.selected,
                    playerTileForMove: -1,
                },
            };
        case START_CASTE_SWITCH:
            return {
                ...state,
                isSwitching: true,
            };
        case END_CASTE_SWITCH:
            return {
                ...state,
                isSwitching: false,
                casteSwitch: { ...initCasteSwitchState },
                selected: {
                    ...state.selected,
                    boardTileForSwitch: -1,
                    caste: Caste.Unknown,
                },
            };
        case SELECT_CASTE_SWITCH_TILE:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    boardTileForSwitch: action.tile,
                },
            };
        case SELECT_CASTE_FOR_SWITCH:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    caste: action.caste,
                },
            };
        case DESELECT_CASTE_SWITCH_TILE:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    boardTileForSwitch: -1,
                },
            };
        case DESELECT_CASTE_FOR_SWITCH:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    caste: Caste.Unknown,
                },
            };
        case SELECT_CASTE_SWITCH_FROM:
            return {
                ...state,
                casteSwitch: {
                    ...state.casteSwitch,
                    from: {
                        tile: action.tile,
                        caste: action.caste,
                    },
                },
            };
        case SELECT_CASTE_SWITCH_TO:
            return {
                ...state,
                casteSwitch: {
                    ...state.casteSwitch,
                    to: {
                        tile: action.tile,
                        caste: action.caste,
                    },
                },
            };
        case DESELECT_CASTE_SWITCH_FROM:
            return {
                ...state,
                casteSwitch: {
                    ...state.casteSwitch,
                    from: { ...initCasteSwitchFromToState },
                },
            };
        case DESELECT_CASTE_SWITCH_TO:
            return {
                ...state,
                casteSwitch: {
                    ...state.casteSwitch,
                    to: { ...initCasteSwitchFromToState },
                },
            };
        default:
            return state;
    }
};

export default GameReducer;