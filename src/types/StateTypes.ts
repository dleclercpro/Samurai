import { TileMap, PlayerTile, Player } from './GameTypes';

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
}

// Root state
export interface AppState {
    game: GameState,
    board: BoardState,
    dialog: DialogState,
};