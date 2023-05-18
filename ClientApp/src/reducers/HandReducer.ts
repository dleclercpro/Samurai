import { SET_FULL_HAND, SET_OWN_HAND } from '../types/ActionTypes';
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
        default:
            return state;
    }
};

export default HandReducer;