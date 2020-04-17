import { BoardTileMap, Player, PlayerTileMap, Caste, GameStep, ColorMode } from './GameTypes';

interface PlayState {
    boardTile: number,
    playerTile: number,
}

interface MoveState {
    from: number,
    to: number,
}

interface SwitchState {
    from: SwitchPartialState,
    to: SwitchPartialState,
}

export interface SwitchPartialState {
    tile: number,
    caste: Caste,
}

export interface GameState {
    id: number,
    step: GameStep,
    selection: {
        play: PlayState,
        move: MoveState,
        switch: SwitchState,
    },
    colors: ColorMode,
}

export interface PlayerState {
    self: Player,
    opponents: Player[],
    hand: number[],
}

export interface DialogState {
    [type: string]: {
        isOpen: boolean,
        headline?: string,
        message?: string,
        explanation?: string,
    },
}

export interface DataState {
    tiles: BoardTileMap,
    initHand: PlayerTileMap,
}

// Root state
export interface AppState {
    game: GameState,
    player: PlayerState,
    dialog: DialogState,
    data: DataState,
};