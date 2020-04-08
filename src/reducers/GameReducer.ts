import { GameState } from '../types/StateTypes';
import { GameAction } from '../actions';
import { SELECT_HAND_TILE, LOAD_PLAYER, LOAD_HAND, DESELECT_HAND_TILE, LOAD_OPPONENTS, LOAD_INIT_HAND, SELECT_CASTE_SWITCH_FROM, SELECT_CASTE_SWITCH_TO, START_CASTE_SWITCH, END_CASTE_SWITCH } from '../types/ActionTypes';
import { parsePlayer, parseInitHand } from '../parse';
import { PlayerColor, Caste } from '../types/GameTypes';

const initPlayerState = {
    id: 0,
    color: PlayerColor.Unknown,
    username: '',
    isPlaying: false,
    playedTiles: new Map(),
    score: new Map(),
};

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
    player: { ...initPlayerState },
    opponents: [],
    hand: [],
    initHand: new Map(),
    isSwitching: false,
    isMoving: false,
    selectedPlayerTile: -1,
    casteSwitch: { ...initCasteSwitchState },
    tileMove: { ...initTileMoveState },
};

const GameReducer = (state: GameState = initState, action: GameAction) => {
    switch (action.type) {
        case LOAD_PLAYER:
            return {
                ...state,
                player: parsePlayer(action.data),
            };
        case LOAD_OPPONENTS:
            return {
                ...state,
                opponents: action.data.map(opponent => parsePlayer(opponent)),
            };
        case LOAD_INIT_HAND:
            return {
                ...state,
                initHand: parseInitHand(action.data),
            };
        case LOAD_HAND:
            return {
                ...state,
                hand: action.data,
            };
        case SELECT_HAND_TILE:
        case DESELECT_HAND_TILE:
            return {
                ...state,
                selectedTile: action.id,
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