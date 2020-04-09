import { DialogState } from '../types/StateTypes';
import { DialogAction } from '../actions';
import { OPEN_DIALOG, CLOSE_DIALOG } from '../types/ActionTypes';
import { DialogType } from '../types/DialogTypes';

const initDialogState = {
    isOpen: false,
};

const initState = {
    [DialogType.GameOver]: { ...initDialogState },
    [DialogType.TileChoice]: { ...initDialogState },
    [DialogType.CasteChoice]: { ...initDialogState },
    [DialogType.CasteSwitchStart]: { ...initDialogState },
    [DialogType.CasteSwitchConfirm]: { ...initDialogState },
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
        default:
            return state;
    }
};

export default DialogReducer;