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

export interface PlayersState {
    self: Player,
    opponents: Player[],
}

export interface UserState {
    username: string,
    email: string,
    isSignedIn: boolean,
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

export interface OverlayState {
    loading: {
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
    user: UserState,
    players: PlayersState,
    dialog: DialogState,
    overlay: OverlayState,
    data: DataState,
};