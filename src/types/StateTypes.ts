import { TileMap, PlayerTile, Player } from './GameTypes';
import { DialogType } from './DialogTypes';

export interface GameState {
    player: Player,
    opponents: Player[],
    hand: PlayerTile[],
    initHand: PlayerTile[],
    selectedTileID: number,
}

export interface BoardState {
    tiles: TileMap,
    selectedTileID: number,
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