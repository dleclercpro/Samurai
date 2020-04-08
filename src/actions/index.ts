import { OpenDialog, CloseDialog, LoadBoard, LoadHand, SelectPlayerTile, LoadPlayer, SelectBoardTile, DeselectPlayerTile, DeselectBoardTile, LoadOpponents, LoadInitHand, SelectCasteSwitchFrom, SelectCasteSwitchTo, StartCasteSwitch, EndCasteSwitch, StartTileMove, EndTileMove } from '../types/ActionTypes';

export type DataAction =
    LoadBoard |
    LoadInitHand;

export type GameAction =
    SelectBoardTile |
    DeselectBoardTile |
    SelectPlayerTile |
    DeselectPlayerTile |
    StartTileMove |
    EndTileMove |
    StartCasteSwitch |
    EndCasteSwitch |
    SelectCasteSwitchFrom |
    SelectCasteSwitchTo;

export type PlayerAction =
    LoadPlayer |
    LoadOpponents |
    LoadHand;

export type DialogAction =
    OpenDialog |
    CloseDialog;

// Root action
export type AppAction =
    DataAction |
    GameAction |
    PlayerAction |
    DialogAction;