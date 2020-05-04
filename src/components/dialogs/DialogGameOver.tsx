import React from 'react';
import './DialogGameOver.scss';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { Player } from '../../types/GameTypes';
import { getWinners } from '../../selectors';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';
import i18n from '../../translator';

interface StateProps {
    winners: Player[],
}

type Props = StateProps;

class DialogGameOver extends React.Component<Props, {}> {

    getMessage = () => {
        const { winners } = this.props;

        switch (winners.length) {
            case 0:
                return i18n.getText('NO_WINNER');
            case 1:
                return i18n.getText('WINNER_IS', {
                    winner: winners[0].username
                });
            default:
                return i18n.getText('WINNERS_ARE', {
                    winners: winners.map(winner => winner.username).join(', ')
                });
        }
    }

    render() {
        return (
            <DialogOK
                type={DialogType.GameOver}
                headline={i18n.getText('GAME_OVER')}
                message={this.getMessage()}
            >
            </DialogOK>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    winners: getWinners(state.players),
});

export default connect(mapStateToProps, () => ({}))(DialogGameOver);