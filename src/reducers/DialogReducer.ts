import { DialogState } from '../types/StateTypes';
import { DialogAction } from '../actions';
import { OPEN_DIALOG, CLOSE_DIALOG } from '../types/ActionTypes';
import { DialogType } from '../types/DialogTypes';

const initState = {
    isOpen: {
        [DialogType.GameOver]: false,
        [DialogType.TileChoice]: false,
        [DialogType.CasteChoice]: false,
        [DialogType.CasteSwitchPrompt]: false,
        [DialogType.CasteSwitchConfirm]: false,
    },
};

const DialogReducer = (state: DialogState = initState, action: DialogAction) => {
    switch (action.type) {
        case OPEN_DIALOG:
            return {
                ...state,
                isOpen: {
                    ...state.isOpen,
                    [action.dialogType]: true,
                },
            };
        case CLOSE_DIALOG:
            return {
                ...state,
                isOpen: {
                    ...state.isOpen,
                    [action.dialogType]: false,
                },
            };
        default:
            return state;
    }
};

export default DialogReducer;