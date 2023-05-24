import { BoardTileMap, Player, HandTileMap, Caste, GameStep, ColorMode, PlayedTileMap } from './GameTypes';
import i18n from '../i18n';

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
    id: string,
    name: string,
    version: number,
    step: GameStep,
    selection: {
        play: PlayState,
        move: MoveState,
        swap: SwapState,
    },
    playedTilesSinceLastTurn: PlayedTileMap,
}

export interface HandState {
    full: HandTileMap,
    own: number[],
}

export interface BoardState {
    tiles: BoardTileMap,
}

export interface PlayersState {
    self: Player,
    opponents: Player[],
}

export interface UserState {
    username: string,
    email: string,
    isAuthenticated: boolean,
    isAdmin: boolean,
}

export interface DialogState {
    [type: string]: {
        isOpen: boolean,
        message?: string,
        explanation?: string,
        action?: () => Promise<void>,
    },
}

export interface SettingsState {
    language: i18n,
    colors: ColorMode,
}

// Root state
export interface AppState {
    game: GameState,
    user: UserState,
    players: PlayersState,
    hand: HandState,
    board: BoardState,
    dialog: DialogState,
    settings: SettingsState,
};