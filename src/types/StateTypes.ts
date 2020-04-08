import { BoardTileMap, Player, CasteSwitch, PlayerTileMap, TileMove } from './GameTypes';
import { DialogType } from './DialogTypes';

export interface DataState {
    tiles: BoardTileMap,
    initHand: PlayerTileMap,
}

export interface GameState {
    casteSwitch: CasteSwitch,
    tileMove: TileMove,
    isSwitching: boolean,
    isMoving: boolean,
    selectedPlayerTile: number,
    selectedBoardTile: number,
}

export interface PlayerState {
    self: Player,
    opponents: Player[],
    hand: number[],
}

export interface DialogState {
    isOpen: boolean,
    type: DialogType,
}

// Root state
export interface AppState {
    game: GameState,
    player: PlayerState,
    dialog: DialogState,
    data: DataState,
};