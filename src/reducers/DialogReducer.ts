import { DialogState } from '../types/StateTypes';
import { DialogAction } from '../actions';
import { OPEN_DIALOG, CLOSE_DIALOG, SET_SUCCESS_DIALOG, SET_ERROR_DIALOG } from '../types/ActionTypes';
import { DialogType } from '../types/DialogTypes';

const initDialogState = {
    isOpen: false,
};

const initState = {
    [DialogType.SignIn]: { ...initDialogState },
    [DialogType.SignUp]: { ...initDialogState },
    [DialogType.PlayGame]: { ...initDialogState },
    [DialogType.CreateGame]: { ...initDialogState },
    [DialogType.GameOver]: { ...initDialogState },
    [DialogType.TileChoice]: { ...initDialogState },
    [DialogType.CasteChoice]: { ...initDialogState },
    [DialogType.TileMoveStart]: { ...initDialogState },
    [DialogType.TileMoveEnd]: { ...initDialogState },
    [DialogType.CasteSwitchStart]: { ...initDialogState },
    [DialogType.CasteSwitchEnd]: { ...initDialogState },

    [DialogType.Success]: {
        ...initDialogState,
        message: '',
    },
    [DialogType.Error]: {
        ...initDialogState,
        message: '',
    },
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
        case SET_SUCCESS_DIALOG:
            return {
                ...state,
                [DialogType.Success]: {
                    ...state[DialogType.Success],
                    message: action.message,
                    action: action.action,
                },
            };
        case SET_ERROR_DIALOG:
            return {
                ...state,
                [DialogType.Error]: {
                    ...state[DialogType.Error],
                    message: action.message,
                    explanation: action.explanation,
                    action: action.action,
                },
            };
        default:
            return state;
    }
};

export default DialogReducer;