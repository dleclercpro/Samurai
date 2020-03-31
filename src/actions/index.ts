import { OpenDialog, CloseDialog, ToggleDialog } from "../types/ActionTypes";

export type DialogAction = OpenDialog | CloseDialog | ToggleDialog;

// Root action
export type AppAction = DialogAction;