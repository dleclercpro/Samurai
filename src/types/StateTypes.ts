export interface DialogState {
    isOpen: boolean,
}

// Root state
export interface AppState {
    dialog: DialogState,
};