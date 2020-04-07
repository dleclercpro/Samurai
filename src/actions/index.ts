import { OpenDialog, CloseDialog, ToggleDialog, LoadBoard, LoadHand, SelectHandTile, LoadPlayer, SelectTile, DeselectHandTile, DeselectBoardTile, LoadOpponents, LoadInitHand } from '../types/ActionTypes';

export type GameAction = LoadPlayer | LoadOpponents | LoadInitHand | LoadHand | SelectHandTile | DeselectHandTile;
export type BoardAction = LoadBoard | SelectTile | DeselectBoardTile;
export type DialogAction = OpenDialog | CloseDialog | ToggleDialog;

// Root action
export type AppAction =
    GameAction |
    BoardAction |
    DialogAction;