import { OverlayState } from '../types/StateTypes';
import { OPEN_LOADING_OVERLAY, CLOSE_LOADING_OVERLAY } from '../types/ActionTypes';
import { OverlayAction } from '../actions';

const initState = {
    loading: {
        isOpen: false,
    },
};

const OverlayReducer = (state: OverlayState = initState, action: OverlayAction) => {
    switch (action.type) {
        case OPEN_LOADING_OVERLAY:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    isOpen: true,
                },
            };
        case CLOSE_LOADING_OVERLAY:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    isOpen: false,
                },
            };
        default:
            return state;
    }
};

export default OverlayReducer;