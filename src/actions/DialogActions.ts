import { OPEN_DIALOG, CLOSE_DIALOG, OpenDialog, CloseDialog } from '../types/ActionTypes';
import { DialogType } from '../types/DialogTypes';

export const openDialog = (dialogType: DialogType): OpenDialog => ({
    type: OPEN_DIALOG,
    dialogType,
});

export const closeDialog: CloseDialog = {
    type: CLOSE_DIALOG,
};