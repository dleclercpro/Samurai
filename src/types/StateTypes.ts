import { BoardTileMap, Player, HandTileMap, Caste, GameStep, ColorMode } from './GameTypes';

interface PlayState {
    boardTile: number,
    handTile: number,
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

export interface PlayersState {
    self: Player,
    opponents: Player[],
}

export interface UserState {
    username: string,
    email: string,
    isAuthenticated: boolean,
}

export interface DialogState {
    [type: string]: {
        isOpen: boolean,
        headline?: string,
        message?: string,
        explanation?: string,
        action?: () => Promise<void>,
    },
}

export interface DataState {
    tiles: BoardTileMap,
    fullHand: HandTileMap,
}

// Root state
export interface AppState {
    game: GameState,
    user: UserState,
    players: PlayersState,
    dialog: DialogState,
    data: DataState,
};