import { LoadBoard, LoadFullHand, SelectBoardTile, SelectHandTile, DeselectBoardTile, DeselectHandTile, SelectTileFromForSwap, SelectCasteFromForSwap, SelectTileToForSwap, SelectCasteToForSwap, DeselectTileFromForSwap, DeselectTileToForSwap, DeselectCasteToForSwap, LoadPlayer, LoadOpponents, LoadHand, OpenDialog, CloseDialog, EndTurn, StartCasteSwap, StartTileMove, SelectBoardTileToMoveFrom, SelectBoardTileToMoveTo, DeselectCasteFromForSwap, FinishCasteSwap, SwitchColorMode, SetErrorDialog, SetSuccessDialog, SetGameId, SetUser, ResetUser, ResetGameId } from '../types/ActionTypes';
import { resetUser } from './UserActions';

export type DataAction =
    LoadBoard |
    LoadFullHand;

export type GameAction =
    ResetGameId |
    SetGameId |
    EndTurn |
    SwitchColorMode |

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
    LoadPlayer |
    LoadOpponents |
    LoadHand;

export type DialogAction =
    OpenDialog |
    CloseDialog |
    SetSuccessDialog |
    SetErrorDialog;

// Root action
export type AppAction =
    DataAction |
    GameAction |
    UserAction |
    PlayersAction |
    DialogAction;