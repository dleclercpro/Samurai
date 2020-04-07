import { DialogState } from '../types/StateTypes';
import { DialogAction } from '../actions';
import { OPEN_DIALOG, CLOSE_DIALOG } from '../types/ActionTypes';
import { DialogType } from '../types/DialogTypes';

const initState = {
    type: DialogType.None,
    isOpen: false,
};

const DialogReducer = (state: DialogState = initState, action: DialogAction) => {
    switch (action.type) {
        case OPEN_DIALOG:
            return {
                ...state,
                isOpen: true,
                type: action.dialogType,
            };
        case CLOSE_DIALOG:
            return {
                ...state,
                isOpen: false,
                type: DialogType.None,
            };
        default:
            return state;
    }
};

export default DialogReducer;