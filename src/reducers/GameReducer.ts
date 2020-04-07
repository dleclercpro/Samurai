import { GameState } from '../types/StateTypes';
import { GameAction } from '../actions';
import { SELECT_HAND_TILE, LOAD_PLAYER, LOAD_HAND, DESELECT_HAND_TILE, LOAD_OPPONENTS, LOAD_INIT_HAND } from '../types/ActionTypes';
import { parsePlayerTile, parsePlayer } from '../parse';
import { PlayerColor } from '../types/GameTypes';

const initState = {
    player: {
        id: 0,
        color: PlayerColor.Unknown,
        username: '',
        isPlaying: false,
        playedTiles: new Map(),
        score: new Map(),
    },
    opponents: [],
    hand: [],
    initHand: [],
    selectedTileID: -1,
};

const GameReducer = (state: GameState = initState, action: GameAction) => {
    switch (action.type) {
        case LOAD_PLAYER:
            return {
                ...state,
                player: parsePlayer(action.player),
            };
        case LOAD_OPPONENTS:
            return {
                ...state,
                opponents: action.opponents.map(opponent => parsePlayer(opponent)),
            };
        case LOAD_INIT_HAND:
            return {
                ...state,
                initHand: action.json.map(tile => parsePlayerTile(tile)),
            };
        case LOAD_HAND:
            return {
                ...state,
                hand: action.json.map(tile => parsePlayerTile(tile)),
            };
        case SELECT_HAND_TILE:
        case DESELECT_HAND_TILE:
            return {
                ...state,
                selectedTileID: action.id,
            };
        default:
            return state;
    }
};

export default GameReducer;