import { OPEN_DIALOG, CLOSE_DIALOG, TOGGLE_DIALOG, OpenDialog, CloseDialog, ToggleDialog } from '../types/ActionTypes';

export const openDialog: OpenDialog = {
    type: OPEN_DIALOG,
};

export const closeDialog: CloseDialog = {
    type: CLOSE_DIALOG,
};

export const toggleDialog: ToggleDialog = {
    type: TOGGLE_DIALOG,
};