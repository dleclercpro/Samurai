import { OpenDialog, CloseDialog, ToggleDialog, LoadBoard, SelectTile, SetPlayer } from "../types/ActionTypes";

export type PlayerAction = SelectTile | SetPlayer;
export type BoardAction = LoadBoard;
export type DialogAction = OpenDialog | CloseDialog | ToggleDialog;

// Root action
export type AppAction =
    PlayerAction |
    BoardAction |
    DialogAction;