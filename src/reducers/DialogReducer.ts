import { DialogState } from "../types/StateTypes";
import { DialogAction } from "../actions";
import { OPEN_DIALOG, CLOSE_DIALOG, TOGGLE_DIALOG } from "../types/ActionTypes";

const initState = {
    isOpen: false,
};

const DialogReducer = (state: DialogState = initState, action: DialogAction) => {
    switch (action.type) {
        case OPEN_DIALOG:
            return {
                ...state,
                isOpen: true,
            };
        case CLOSE_DIALOG:
            return {
                ...state,
                isOpen: false,
            };
        case TOGGLE_DIALOG:
            return {
                ...state,
                isOpen: !state.isOpen,
            };
        default:
            return state;
    }
};

export default DialogReducer;