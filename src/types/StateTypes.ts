export interface UserState {
    id: number,
    name: string,
}

// Root state
export interface AppState {
    user: UserState,
};