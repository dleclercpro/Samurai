import { OpenDialog, CloseDialog, ToggleDialog, LoadBoard, LoadHand, SelectPlayerTile, LoadPlayer, SelectBoardTile, DeselectPlayerTile, DeselectBoardTile, LoadOpponents } from '../types/ActionTypes';

export type PlayerAction = LoadPlayer | LoadOpponents | LoadHand | SelectPlayerTile | DeselectPlayerTile;
export type BoardAction = LoadBoard | SelectBoardTile | DeselectBoardTile;
export type DialogAction = OpenDialog | CloseDialog | ToggleDialog;

// Root action
export type AppAction =
    PlayerAction |
    BoardAction |
    DialogAction;