import React from 'react';
import './DashHome.scss';
import LanguageButton from './LanguageButton';
import { Language } from '../../types/GameTypes';
import { AppState } from '../../types/StateTypes';
import { connect } from 'react-redux';
import i18n from '../../i18n';

interface StateProps {
    language: i18n,
}

type Props = StateProps;

class DashHome extends React.Component<Props, {}> {
    render() {
        const { language } = this.props;

        return (
            <div id='dash-home'>
                <LanguageButton language={Language.EN} isSelected={language.getLanguage() === Language.EN} />
                <LanguageButton language={Language.DE} isSelected={language.getLanguage() === Language.DE} />
                <LanguageButton language={Language.FR} isSelected={language.getLanguage() === Language.FR} />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { language } = state.user;

    return {
        language,
    };
}

export default connect(mapStateToProps, () => ({}))(DashHome);