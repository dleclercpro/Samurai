import { SetLanguage, SET_LANGUAGE, SwitchColorMode, SWITCH_COLOR_MODE } from '../types/ActionTypes';
import { Language } from '../types/GameTypes';

export const setLanguage = (language: Language): SetLanguage => ({
    type: SET_LANGUAGE,
    language,
});

export const switchColorMode: SwitchColorMode = {
    type: SWITCH_COLOR_MODE,
};