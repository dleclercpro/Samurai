import { UserState } from '../types/StateTypes';
import { UserAction } from '../actions';
import { SIGN_IN, SIGN_OUT } from '../types/ActionTypes';

const initState = {
    username: '',
    email: '',
    isSignedIn: false,
};

const UserReducer = (state: UserState = initState, action: UserAction) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                username: action.username,
                email: action.email,
                isSignedIn: true,
            };
        case SIGN_OUT:
            return { ...initState };
        default:
            return state;
    }
};

export default UserReducer;