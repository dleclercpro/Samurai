import { UserState } from "../types/StateTypes";
import { UserAction } from "../types/ActionTypes";

const initState = {
    id: -1,
    name: '',
};

const userReducer = (state: UserState = initState, action: UserAction) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default userReducer;