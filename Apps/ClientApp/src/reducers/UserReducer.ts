import { UserState } from '../types/StateTypes';
import { UserAction } from '../actions';
import { SET_USER, RESET_USER } from '../types/ActionTypes';

const initState: UserState = {
    username: '',
    email: '',
    isAuthenticated: false,
    isAdmin: false,
};

const UserReducer = (state: UserState = initState, action: UserAction) => {
    switch (action.type) {
        case RESET_USER:
            return { ...initState };
        case SET_USER:
            return {
                ...state,
                username: action.username,
                email: action.email,
                isAuthenticated: true,
                isAdmin: action.isAdmin,
            };
        default:
            return state;
    }
};

export default UserReducer;