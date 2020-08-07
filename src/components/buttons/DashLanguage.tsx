import React from 'react';
import './DashLanguage.scss';
import LanguageButton from './LanguageButton';
import { Language } from '../../types/GameTypes';
import { AppState } from '../../types/StateTypes';
import { connect } from 'react-redux';
import i18n from '../../i18n';

interface StateProps {
    language: i18n,
}

type Props = StateProps;

const DashLanguage: React.FC<Props> = (props) => {
    const { language } = props;

    return (
        <div id='dash-language'>
            <LanguageButton language={Language.EN} isSelected={language.getLanguage() === Language.EN} />
            <LanguageButton language={Language.DE} isSelected={language.getLanguage() === Language.DE} />
            <LanguageButton language={Language.FR} isSelected={language.getLanguage() === Language.FR} />
        </div>
    );
}

const mapStateToProps = (state: AppState) => {
    const { language } = state.settings;

    return {
        language,
    };
}

export default connect(mapStateToProps)(DashLanguage);