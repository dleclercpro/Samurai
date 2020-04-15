import { LoadBoard, LoadFullHand, SelectBoardTile, SelectPlayerTile, DeselectBoardTile, DeselectPlayerTile, SelectTileFromForSwitch, SelectCasteFromForSwitch, SelectTileToForSwitch, SelectCasteToForSwitch, DeselectTileFromForSwitch, DeselectTileToForSwitch, DeselectCasteToForSwitch, LoadPlayer, LoadOpponents, LoadHand, OpenDialog, CloseDialog, EndTurn, StartCasteSwitch, StartTileMove, SelectPlayerTileForMove, SelectBoardTileForMove, DeselectCasteFromForSwitch, FinishCasteSwitch, SwitchColors, SetErrorDialog, SetSuccessDialog } from '../types/ActionTypes';

export type DataAction =
    LoadBoard |
    LoadFullHand;

export type GameAction =
    EndTurn |
    SwitchColors |

    StartTileMove |
    StartCasteSwitch |
    FinishCasteSwitch |

    SelectBoardTile |
    DeselectBoardTile |
    SelectPlayerTile |
    DeselectPlayerTile |

    SelectPlayerTileForMove |
    SelectBoardTileForMove |

    SelectTileFromForSwitch |
    DeselectTileFromForSwitch |
    SelectCasteFromForSwitch |
    DeselectCasteFromForSwitch |
    SelectTileToForSwitch |
    DeselectTileToForSwitch |
    SelectCasteToForSwitch |
    DeselectCasteToForSwitch;

export type PlayerAction =
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
    PlayerAction |
    DialogAction;