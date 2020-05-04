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
    id: number,
    version: number,
    step: GameStep,
    selection: {
        play: PlayState,
        move: MoveState,
        swap: SwapState,
    },
    colors: ColorMode,
    playedTilesSinceLastTurn: PlayedTileMap,
}

export interface PlayersState {
    self: Player,
    opponents: Player[],
}

export interface UserState {
    username: string,
    email: string,
    language: i18n,
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