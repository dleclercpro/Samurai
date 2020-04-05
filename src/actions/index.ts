import { OpenDialog, CloseDialog, ToggleDialog, LoadBoard, LoadHand, SelectTile, SetPlayer, SetPlayerColor } from "../types/ActionTypes";

export type PlayerAction = SetPlayer | SetPlayerColor | LoadHand | SelectTile;
export type BoardAction = LoadBoard;
export type DialogAction = OpenDialog | CloseDialog | ToggleDialog;

// Root action
export type AppAction =
    PlayerAction |
    BoardAction |
    DialogAction;