import React from 'react';
import './LanguageButton.scss';
import { ReactComponent as GermanyIcon } from '../../icons/germany.svg';
import { ReactComponent as BritainIcon } from '../../icons/britain.svg';
import { ReactComponent as FranceIcon } from '../../icons/france.svg';
import i18n from '../../translator';

interface OwnProps {
    language: string,
}

type Props = OwnProps;

class LanguageButton extends React.Component<Props, {}> {

    handleClick = () => {
        const { language } = this.props;

        i18n.setLanguage(language);
    }

    getIcon = (language: string): React.ReactNode => {
        switch (language) {
            case 'de':
                return <GermanyIcon className='icon' />;
            case 'en':
                return <BritainIcon className='icon' />;
            case 'fr':
                return <FranceIcon className='icon' />;
            default:
                return null;
        }
    }

    render() {
        const { language } = this.props;
    
        return (
            <button
                id={`language-button--${language}`}
                className='language-button'
                onClick={this.handleClick}
            >
                {this.getIcon(language)}
            </button>
        );
    }
}

export default LanguageButton;