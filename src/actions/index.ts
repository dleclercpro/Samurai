import { OpenDialog, CloseDialog, LoadBoard, LoadHand, SelectPlayerTile, LoadPlayer, SelectBoardTile, DeselectPlayerTile, DeselectBoardTile, LoadOpponents, LoadInitHand, SelectCasteSwitchFrom, SelectCasteSwitchTo, StartCasteSwitch, EndCasteSwitch, StartTileMove, EndTileMove, DeselectCasteSwitchFrom, DeselectCasteSwitchTo, SelectCasteSwitchTile, SelectCasteForSwitch, DeselectCasteSwitchTile, DeselectCasteForSwitch } from '../types/ActionTypes';

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
    SelectCasteSwitchTile |
    SelectCasteForSwitch |
    DeselectCasteSwitchTile |
    DeselectCasteForSwitch |
    SelectCasteSwitchFrom |
    SelectCasteSwitchTo |
    DeselectCasteSwitchFrom |
    DeselectCasteSwitchTo;

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