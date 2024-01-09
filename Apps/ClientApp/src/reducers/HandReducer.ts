import { RESET_OWN_HAND, SET_FULL_HAND, SET_OWN_HAND } from '../types/ActionTypes';
import { parseFullHand } from '../parse';
import { HandState } from '../types/StateTypes';
import { HandAction } from '../actions';

const initState: HandState = {
    full: new Map(),
    own: [],
};

const HandReducer = (state: HandState = initState, action: HandAction) => {
    switch (action.type) {
        case SET_FULL_HAND:
            return {
                ...state,
                full: parseFullHand(action.data),
            };
        case SET_OWN_HAND:
            return {
                ...state,
                own: action.data,
            };
        case RESET_OWN_HAND:
            return {
                ...state,
                own: [],
            };
        default:
            return state;
    }
};

export default HandReducer;