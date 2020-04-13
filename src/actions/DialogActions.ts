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

export const setSuccessDialog = (message: string): SetSuccessDialog => ({
    type: SET_SUCCESS_DIALOG,
    message,
});

export const setErrorDialog = (message: string): SetErrorDialog => ({
    type: SET_ERROR_DIALOG,
    message,
});