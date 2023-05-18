import { SettingsState } from '../types/StateTypes';
import { SettingsAction } from '../actions';
import { getLocalStorage, setLocalStorage } from '../storage';
import { ColorMode, Language } from '../types/GameTypes';
import { SWITCH_COLOR_MODE, SET_LANGUAGE } from '../types/ActionTypes';
import i18n from '../i18n';

const language = getLocalStorage('language') as Language;

const initState: SettingsState = {
    language: new i18n(language ? language : Language.EN),
    colors: getLocalStorage('colors') as ColorMode || ColorMode.Normal,
};

const SettingsReducer = (state: SettingsState = initState, action: SettingsAction) => {
    switch (action.type) {
        case SET_LANGUAGE:
            setLocalStorage('language', action.language);

            return {
                ...state,
                language: new i18n(action.language),
            };
        case SWITCH_COLOR_MODE:
            const newColors = state.colors === ColorMode.Normal ? ColorMode.Blind : ColorMode.Normal;
            setLocalStorage('colors', newColors);

            return {
                ...state,
                colors: newColors,
            };
        default:
            return state;
    }
};

export default SettingsReducer;