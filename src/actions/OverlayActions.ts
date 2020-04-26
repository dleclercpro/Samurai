import { OpenLoadingOverlay, OPEN_LOADING_OVERLAY, CloseLoadingOverlay, CLOSE_LOADING_OVERLAY } from "../types/ActionTypes";

export const openLoadingOverlay: OpenLoadingOverlay = {
    type: OPEN_LOADING_OVERLAY,
};

export const closeLoadingOverlay: CloseLoadingOverlay = {
    type: CLOSE_LOADING_OVERLAY,
};