import { BoardTileMap, Player, CasteSwitch, PlayerTileMap, TileMove } from './GameTypes';
import { DialogType } from './DialogTypes';

export interface GameState {
    player: Player,
    opponents: Player[],
    initHand: PlayerTileMap,
    hand: number[],
    casteSwitch: CasteSwitch,
    tileMove: TileMove,
    isSwitching: boolean,
    isMoving: boolean,
    selectedPlayerTile: number,
}

export interface BoardState {
    tiles: BoardTileMap,
    selectedTileForNextPlayerTile: number,
}

export interface DialogState {
    isOpen: boolean,
    type: DialogType,
}

// Root state
export interface AppState {
    game: GameState,
    board: BoardState,
    dialog: DialogState,
};