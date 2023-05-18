import { SetBoard, SetFullHand, SelectBoardTile, SelectHandTile, DeselectBoardTile, DeselectHandTile, SelectTileFromForSwap, SelectCasteFromForSwap, SelectTileToForSwap, SelectCasteToForSwap, DeselectTileFromForSwap, DeselectTileToForSwap, DeselectCasteToForSwap, SetSelf, SetOpponents, SetOwnHand, OpenDialog, CloseDialog, EndTurn, StartCasteSwap, StartTileMove, SelectBoardTileToMoveFrom, SelectBoardTileToMoveTo, DeselectCasteFromForSwap, FinishCasteSwap, SwitchColorMode, SetGameId, SetUser, ResetUser, SetPlayedTilesSinceLastTurn, SetGameVersion, SetLanguage, SetDialogText, SetDialogAction, ResetPlayers, ResetGame, ResetBoard, SetGameName } from '../types/ActionTypes';

export type GameAction =
    ResetGame |
    SetGameId |
    SetGameName |
    SetGameVersion |
    EndTurn |
    SetPlayedTilesSinceLastTurn |

    StartTileMove |
    StartCasteSwap |
    FinishCasteSwap |

    SelectBoardTile |
    DeselectBoardTile |
    SelectHandTile |
    DeselectHandTile |

    SelectBoardTileToMoveFrom |
    SelectBoardTileToMoveTo |

    SelectTileFromForSwap |
    DeselectTileFromForSwap |
    SelectCasteFromForSwap |
    DeselectCasteFromForSwap |
    SelectTileToForSwap |
    DeselectTileToForSwap |
    SelectCasteToForSwap |
    DeselectCasteToForSwap;

export type UserAction =
    SetUser |
    ResetUser;

export type PlayersAction =
    ResetPlayers |
    SetSelf |
    SetOpponents;

export type HandAction =
    SetFullHand |
    SetOwnHand;

export type BoardAction =
    ResetBoard |
    SetBoard;

export type DialogAction =
    OpenDialog |
    CloseDialog |
    SetDialogText |
    SetDialogAction;

export type SettingsAction =
    SetLanguage |
    SwitchColorMode;

// Root action
export type AppAction =
    GameAction |
    UserAction |
    PlayersAction |
    HandAction |
    BoardAction |
    DialogAction |
    SettingsAction;