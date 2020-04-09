import { BoardTileMap, Player, PlayerTileMap, Caste, GameStep } from './GameTypes';

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

interface SwitchPartialState {
    tile: number,
    caste: Caste,
}

export interface GameState {
    step: GameStep,
    selection: {
        play: PlayState,
        move: MoveState,
        switch: SwitchState,
    }
}

export interface PlayerState {
    self: Player,
    opponents: Player[],
    hand: number[],
}

export interface DialogState {
    [type: string]: {
        isOpen: boolean,
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