import { BoardTileMap, Player, HandTileMap, Caste, GameStep, ColorMode, PlayedTileMap } from './GameTypes';

interface PlayState {
    boardTile: number,
    handTile: number,
}

interface MoveState {
    from: number,
    to: number,
}

interface SwapState {
    from: SwapPartialState,
    to: SwapPartialState,
}

export interface SwapPartialState {
    tile: number,
    caste: Caste,
}

export interface GameState {
    id: number,
    step: GameStep,
    selection: {
        play: PlayState,
        move: MoveState,
        swap: SwapState,
    },
    colors: ColorMode,
}

export interface PlayersState {
    self: Player,
    opponents: Player[],
    lastPlayedTiles: PlayedTileMap,
    playedTiles: PlayedTileMap,
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