import { LoadBoard, LoadFullHand, SelectBoardTile, SelectPlayerTile, DeselectBoardTile, DeselectPlayerTile, SelectTileFromForSwitch, SelectCasteFromForSwitch, SelectTileToForSwitch, SelectCasteToForSwitch, DeselectTileFromForSwitch, DeselectTileToForSwitch, DeselectCasteToForSwitch, LoadPlayer, LoadOpponents, LoadHand, OpenDialog, CloseDialog, EndTurn, StartCasteSwitch, StartTileMove, SelectBoardTileToMoveFrom, SelectBoardTileToMoveTo, DeselectCasteFromForSwitch, FinishCasteSwitch, SwitchColors, SetErrorDialog, SetSuccessDialog, SetGameId, OpenSpinnerOverlay, CloseSpinnerOverlay, SetUser, ResetUser, ResetGameId } from '../types/ActionTypes';
import { resetUser } from './UserActions';

export type DataAction =
    LoadBoard |
    LoadFullHand;

export type GameAction =
    ResetGameId |
    SetGameId |
    EndTurn |
    SwitchColors |

    StartTileMove |
    StartCasteSwitch |
    FinishCasteSwitch |

    SelectBoardTile |
    DeselectBoardTile |
    SelectPlayerTile |
    DeselectPlayerTile |

    SelectBoardTileToMoveFrom |
    SelectBoardTileToMoveTo |

    SelectTileFromForSwitch |
    DeselectTileFromForSwitch |
    SelectCasteFromForSwitch |
    DeselectCasteFromForSwitch |
    SelectTileToForSwitch |
    DeselectTileToForSwitch |
    SelectCasteToForSwitch |
    DeselectCasteToForSwitch;

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

export type OverlayAction =
    OpenSpinnerOverlay |
    CloseSpinnerOverlay;

// Root action
export type AppAction =
    DataAction |
    GameAction |
    UserAction |
    PlayersAction |
    DialogAction |
    OverlayAction;