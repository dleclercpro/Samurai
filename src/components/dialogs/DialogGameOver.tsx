import React from 'react';
import './DialogGameOver.scss';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { Player } from '../../types/GameTypes';
import { getWinners } from '../../selectors';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';
import i18n from '../../i18n';

interface StateProps {
    winners: Player[],
    language: i18n,
}

type Props = StateProps;

class DialogGameOver extends React.Component<Props, {}> {

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
    const { language } = state.user;

    return {
        winners: getWinners(state.players),
        language,
    };
}

export default connect(mapStateToProps, () => ({}))(DialogGameOver);