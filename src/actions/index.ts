import { OpenDialog, CloseDialog, ToggleDialog, LoadBoard, SelectTile, SetPlayer, SetHand } from "../types/ActionTypes";

export type PlayerAction = SelectTile | SetPlayer | SetHand;
export type BoardAction = LoadBoard;
export type DialogAction = OpenDialog | CloseDialog | ToggleDialog;

// Root action
export type AppAction =
    PlayerAction |
    BoardAction |
    DialogAction;