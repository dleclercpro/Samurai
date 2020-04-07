import { OpenDialog, CloseDialog, LoadBoard, LoadHand, SelectHandTile, LoadPlayer, SelectTile, DeselectHandTile, DeselectBoardTile, LoadOpponents, LoadInitHand } from '../types/ActionTypes';

export type GameAction = LoadPlayer | LoadOpponents | LoadInitHand | LoadHand | SelectHandTile | DeselectHandTile;
export type BoardAction = LoadBoard | SelectTile | DeselectBoardTile;
export type DialogAction = OpenDialog | CloseDialog;

// Root action
export type AppAction =
    GameAction |
    BoardAction |
    DialogAction;