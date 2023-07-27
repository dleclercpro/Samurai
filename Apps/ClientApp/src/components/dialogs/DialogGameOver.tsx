import React from 'react';
import './DialogGameOver.scss';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { Player } from '../../types/GameTypes';
import { getWinners } from '../../selectors';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';
import i18n from '../../i18n';
import { FX_SOUND_GAME_OVER } from '../../config';

interface StateProps {
    isOpen: boolean,
    language: i18n,
    winners: Player[],
}

type Props = StateProps;

class DialogGameOver extends React.Component<Props, {}> {

    private sound: HTMLAudioElement;

    constructor(props: Props) {
        super(props);

        this.sound = new Audio(FX_SOUND_GAME_OVER);
    }

    componentDidUpdate(prevProps: Props) {
        const { isOpen } = this.props;

        if (!prevProps.isOpen && isOpen) {
            this.sound.play().catch(() => { });
        }
    }

    getMessage = () => {
        const { winners, language } = this.props;

        switch (winners.length) {
            case 0:
                return language.getText('NO_WINNER');
            case 1:
                return language.getText('WINNER_IS');
            default:
                return language.getText('WINNERS_ARE');
        }
    }

    getExplanation = () => {
        const { winners } = this.props;

        switch (winners.length) {
            case 0:
                return '';
            case 1:
                return winners[0].username;
            default:
                return winners.map(winner => winner.username).join(', ');
        }
    }

    render() {
        const { language } = this.props;

        return (
            <DialogOK
                type={DialogType.GameOver}
                headline={language.getText('GAME_OVER')}
                message={this.getMessage()}
                explanation={this.getExplanation()}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { isOpen } = state.dialog[DialogType.GameOver];
    const { language } = state.settings;

    return {
        isOpen,
        language,
        winners: getWinners(state.players),
    };
}

export default connect(mapStateToProps)(DialogGameOver);