import { SetBoard, SetFullHand, SelectBoardTile, SelectHandTile, DeselectBoardTile, DeselectHandTile, SelectTileFromForSwap, SelectCasteFromForSwap, SelectTileToForSwap, SelectCasteToForSwap, DeselectTileFromForSwap, DeselectTileToForSwap, DeselectCasteToForSwap, SetPlayer, SetOpponents, SetHand, OpenDialog, CloseDialog, EndTurn, StartCasteSwap, StartTileMove, SelectBoardTileToMoveFrom, SelectBoardTileToMoveTo, DeselectCasteFromForSwap, FinishCasteSwap, SwitchColorMode, SetGameId, SetUser, ResetUser, ResetGameId, SetPlayedTilesSinceLastTurn, SetGameVersion, ResetGameVersion, SetLanguage, SetDialogText, SetDialogAction } from '../types/ActionTypes';

export type DataAction =
    SetBoard |
    SetFullHand;

export type GameAction =
    ResetGameId |
    ResetGameVersion |
    SetGameId |
    SetGameVersion |
    EndTurn |
    SwitchColorMode |
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
    ResetUser |
    SetLanguage;

export type PlayersAction =
    SetPlayer |
    SetOpponents |
    SetHand;

export type DialogAction =
    OpenDialog |
    CloseDialog |
    SetDialogText |
    SetDialogAction;

// Root action
export type AppAction =
    DataAction |
    GameAction |
    UserAction |
    PlayersAction |
    DialogAction;