import { OPEN_DIALOG, CLOSE_DIALOG, OpenDialog, CloseDialog, SetSuccessDialog, SET_SUCCESS_DIALOG, SetErrorDialog, SET_ERROR_DIALOG } from '../types/ActionTypes';
import { DialogType } from '../types/DialogTypes';

export const openDialog = (dialogType: DialogType): OpenDialog => ({
    type: OPEN_DIALOG,
    dialogType,
});

export const closeDialog = (dialogType: DialogType): CloseDialog => ({
    type: CLOSE_DIALOG,
    dialogType,
});

export const setSuccessDialog = (message: string, action?: () => Promise<void>): SetSuccessDialog => ({
    type: SET_SUCCESS_DIALOG,
    message,
    action,
});

export const setErrorDialog = (message: string, explanation: string, action?: () => Promise<void>): SetErrorDialog => ({
    type: SET_ERROR_DIALOG,
    message,
    explanation,
    action,
});