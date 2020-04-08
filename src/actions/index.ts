import { OpenDialog, CloseDialog, LoadBoard, LoadHand, SelectHandTile, LoadPlayer, SelectTile, DeselectHandTile, DeselectBoardTile, LoadOpponents, LoadInitHand, SelectCasteSwitchFrom, SelectCasteSwitchTo, StartCasteSwitch, EndCasteSwitch } from '../types/ActionTypes';

export type GameAction = LoadPlayer |
    LoadOpponents |
    LoadInitHand |
    LoadHand |
    SelectHandTile |
    DeselectHandTile |
    StartCasteSwitch |
    EndCasteSwitch |
    SelectCasteSwitchFrom |
    SelectCasteSwitchTo;
    
export type BoardAction = LoadBoard |
    SelectTile |
    DeselectBoardTile;

export type DialogAction = OpenDialog |
    CloseDialog;

// Root action
export type AppAction =
    GameAction |
    BoardAction |
    DialogAction;