import { OpenDialog, CloseDialog, ToggleDialog, LoadBoard, LoadHand, SelectNextTile, SetPlayer, SetPlayerColor } from '../types/ActionTypes';

export type PlayerAction = SetPlayer | SetPlayerColor | LoadHand | SelectNextTile;
export type BoardAction = LoadBoard;
export type DialogAction = OpenDialog | CloseDialog | ToggleDialog;

// Root action
export type AppAction =
    PlayerAction |
    BoardAction |
    DialogAction;