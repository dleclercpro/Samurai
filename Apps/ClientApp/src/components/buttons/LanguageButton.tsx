import React, { Dispatch } from 'react';
import './LanguageButton.scss';
import { ReactComponent as GermanyIcon } from '../../icons/germany.svg';
import { ReactComponent as UKIcon } from '../../icons/uk.svg';
import { ReactComponent as FranceIcon } from '../../icons/france.svg';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { Language } from '../../types/GameTypes';
import { setLanguage } from '../../actions/SettingsActions';

interface OwnProps {
    language: Language,
    isSelected: boolean,
}

interface DispatchProps {
    setLanguage: (language: Language) => void,
}

type Props = OwnProps & DispatchProps;

class LanguageButton extends React.Component<Props, {}> {

    handleClick = () => {
        const { language, setLanguage } = this.props;

        setLanguage(language);
    }

    getIcon = (language: Language): React.ReactNode => {
        switch (language) {
            case Language.EN:
                return <UKIcon className='icon' />;
            case Language.DE:
                return <GermanyIcon className='icon' />;
            case Language.FR:
                return <FranceIcon className='icon' />;
            default:
                return null;
        }
    }

    render() {
        const { language, isSelected } = this.props;
    
        return (
            <button
                id={`language-button--${language}`}
                className={`
                    language-button
                    ${isSelected ? 'is-selected' : ''}
                `}
                onClick={this.handleClick}
            >
                {this.getIcon(language)}
            </button>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    setLanguage: (language: Language) => dispatch(setLanguage(language)),
});

export default connect(() => ({}), mapDispatchToProps)(LanguageButton);