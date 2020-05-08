import React from 'react';
import { connect } from 'react-redux';
import './Rules.scss';
import { AppState } from '../types/StateTypes';
import i18n from '../i18n';
import DashLanguage from '../components/buttons/DashLanguage';

interface StateProps {
    language: i18n,
}

type Props = StateProps;

const Rules: React.FC<Props> = (props) => {
    const { language } = props;

    return (
        <div id='rules' className='page'>
            <DashLanguage />

            <div className='wrapper'>
                <h1 className='title'>{language.getText('RULES')}</h1>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => {
    const { language } = state.settings;
    
    return {
        language,
    };
}

export default connect(mapStateToProps, () => ({}))(Rules);