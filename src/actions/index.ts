import { OpenDialog, CloseDialog, ToggleDialog, LoadBoard, LoadHand, SelectPlayerTile, SetPlayer, SetPlayerColor, SelectBoardTile, DeselectPlayerTile, DeselectBoardTile } from '../types/ActionTypes';

export type PlayerAction = SetPlayer | SetPlayerColor | LoadHand | SelectPlayerTile | DeselectPlayerTile;
export type BoardAction = LoadBoard | SelectBoardTile | DeselectBoardTile;
export type DialogAction = OpenDialog | CloseDialog | ToggleDialog;

// Root action
export type AppAction =
    PlayerAction |
    BoardAction |
    DialogAction;