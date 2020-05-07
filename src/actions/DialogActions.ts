import { OPEN_DIALOG, CLOSE_DIALOG, OpenDialog, CloseDialog, SetDialogText, SET_DIALOG_TEXT, SetDialogAction, SET_DIALOG_ACTION } from '../types/ActionTypes';
import { DialogType } from '../types/DialogTypes';

export const openDialog = (dialogType: DialogType): OpenDialog => ({
    type: OPEN_DIALOG,
    dialogType,
});

export const closeDialog = (dialogType: DialogType): CloseDialog => ({
    type: CLOSE_DIALOG,
    dialogType,
});

export const setDialogText = (dialogType: DialogType, message: string, explanation: string = ''): SetDialogText => ({
    type: SET_DIALOG_TEXT,
    dialogType,
    message,
    explanation,
});

export const setDialogAction = (dialogType: DialogType, action: () => Promise<void>): SetDialogAction => ({
    type: SET_DIALOG_ACTION,
    dialogType,
    action,
});