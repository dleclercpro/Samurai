import { GameState } from '../types/StateTypes';
import { GameAction } from '../actions';
import { SELECT_PLAYER_TILE, DESELECT_PLAYER_TILE, SELECT_CASTE_SWITCH_FROM, SELECT_CASTE_SWITCH_TO, START_CASTE_SWITCH, END_CASTE_SWITCH, START_TILE_MOVE, END_TILE_MOVE, SELECT_BOARD_TILE, DESELECT_BOARD_TILE } from '../types/ActionTypes';
import { Caste } from '../types/GameTypes';

const initCasteSwitchState = {
    from: {
        tile: -1,
        caste: Caste.Unknown,
    },
    to: {
        tile: -1,
        caste: Caste.Unknown,
    },
};

const initTileMoveState = {
    from: -1,
    to: -1,
};

const initState = {
    isSwitching: false,
    isMoving: false,
    selectedBoardTile: -1,
    selectedPlayerTile: -1,
    casteSwitch: { ...initCasteSwitchState },
    tileMove: { ...initTileMoveState },
};

const GameReducer = (state: GameState = initState, action: GameAction) => {
    switch (action.type) {
        case SELECT_BOARD_TILE:
        case DESELECT_BOARD_TILE:
            return {
                ...state,
                selectedBoardTile: action.id,
            };
        case SELECT_PLAYER_TILE:
        case DESELECT_PLAYER_TILE:
            return {
                ...state,
                selectedTile: action.id,
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
        default:
            return state;
    }
};

export default GameReducer;