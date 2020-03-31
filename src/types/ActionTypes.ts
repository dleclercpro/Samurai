export const OPEN_DIALOG = 'OPEN_DIALOG';
export interface OpenDialog {
    type: typeof OPEN_DIALOG,
}

export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export interface CloseDialog {
    type: typeof CLOSE_DIALOG,
}

export const TOGGLE_DIALOG = 'TOGGLE_DIALOG';
export interface ToggleDialog {
    type: typeof TOGGLE_DIALOG,
}