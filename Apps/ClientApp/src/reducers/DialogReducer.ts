import { DialogState } from '../types/StateTypes';
import { DialogAction } from '../actions';
import { OPEN_DIALOG, CLOSE_DIALOG, SET_DIALOG_TEXT, SET_DIALOG_ACTION } from '../types/ActionTypes';
import { DialogType } from '../types/DialogTypes';

const initDialogState = {
    isOpen: false,
};

const initOKDialogState = {
    ...initDialogState,
    message: '',
    explanation: '',
    action: () => Promise.resolve(),
};

const initState: DialogState = {
    [DialogType.SignIn]: { ...initDialogState },
    [DialogType.SignUp]: { ...initDialogState },
    [DialogType.PlayGame]: { ...initDialogState },
    [DialogType.CreateGame]: { ...initDialogState },
    [DialogType.GameOver]: { ...initDialogState },
    [DialogType.NewTurn]: { ...initDialogState },
    [DialogType.TileChoice]: { ...initDialogState },
    [DialogType.CasteChoice]: { ...initDialogState },
    [DialogType.TileMoveStart]: { ...initDialogState },
    [DialogType.TileMoveEnd]: { ...initDialogState },
    [DialogType.CasteSwapStart]: { ...initDialogState },
    [DialogType.CasteSwapEnd]: { ...initDialogState },

    [DialogType.Success]: { ...initOKDialogState },
    [DialogType.Error]: { ...initOKDialogState },
};

const DialogReducer = (state: DialogState = initState, action: DialogAction) => {
    switch (action.type) {
        case OPEN_DIALOG:
            return {
                ...state,
                [action.dialogType]: {
                    ...state[action.dialogType],
                    isOpen: true,
                },
            };
        case CLOSE_DIALOG:
            return {
                ...state,
                [action.dialogType]: {
                    ...state[action.dialogType],
                    isOpen: false,
                },
            };
        case SET_DIALOG_TEXT:
            return {
                ...state,
                [action.dialogType]: {
                    ...state[action.dialogType],
                    message: action.message,
                    explanation: action.explanation,
                },
            };
        case SET_DIALOG_ACTION:
            return {
                ...state,
                [action.dialogType]: {
                    ...state[action.dialogType],
                    action: action.action,
                },
            };
        default:
            return state;
    }
};

export default DialogReducer;