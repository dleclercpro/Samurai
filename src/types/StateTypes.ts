import { BoardTileMap, Player, CasteSwitch, PlayerTileMap, TileMove, Caste } from './GameTypes';
import { DialogType } from './DialogTypes';

export interface DataState {
    tiles: BoardTileMap,
    initHand: PlayerTileMap,
}

export interface GameState {
    isSwitching: boolean,
    isMoving: boolean,
    casteSwitch: CasteSwitch,
    tileMove: TileMove,
    selected: {
        boardTile: number,
        boardTileForSwitch: number,
        playerTile: number,
        playerTileForMove: number,
        caste: Caste,
    }
}

export interface PlayerState {
    self: Player,
    opponents: Player[],
    hand: number[],
}

export interface DialogState {
    isOpen: {
        [type: string]: boolean,
    },
}

// Root state
export interface AppState {
    game: GameState,
    player: PlayerState,
    dialog: DialogState,
    data: DataState,
};